import { Instance } from "../instance";
import { readdir } from "fs/promises";
import { whisper } from "../utils/chat";
import { EmbedBuilder } from "discord.js";

export type ArgumentType = "string" | "number";

export interface Argument {
  name: string;
  type: ArgumentType;
  required?: boolean;
  /** For string options only. */
  stringOptions?: string[];
  /** Whether or not the argument should be infinite (multiple spaces). For string options only. */
  stringInfinite?: boolean;
  /** For number options only. */
  numberMinimum?: number;
  /** For number options only. */
  numberMaximum?: number;
}

export interface Command<T = string[]> {
  aliases: string[];
  description: string;
  /** Whether or not to hide the command from the help menu. */
  hidden?: boolean;
  arguments: Argument[];
  execute: (
    instance: Instance,
    author: string,
    args: T,
  ) => Promise<string | void>;
}

export async function registerCommands(instance: Instance) {
  const path =
    process.env.NODE_ENV === "development"
      ? "./src/commands"
      : "./dist/commands";

  const files = await readdir(path);

  for (const file of files) {
    const { default: command }: { default: Command } = await import(
      `../commands/${file}`
    );

    instance.commands.push(command);
  }

  console.log(`Commands registered (${files.length})`);
}

export async function handleCommand(
  instance: Instance,
  author: string,
  message: string,
) {
  if (process.env.LOGS_WEBHOOK)
    instance.webhookClient.send({
      username: "Logs",
      embeds: [
        new EmbedBuilder()
          .setTitle(`Command`)
          .setDescription(`**${author}**\n${message}`),
      ],
    });

  const args = message.split(/ +/);
  const commandName = args.shift()!.toLowerCase();
  const command = instance.commands.find((command) =>
    command.aliases.includes(commandName),
  );

  if (!command)
    return whisper(
      instance,
      author,
      "✗ Unknown command. Use 'help' for a list of commands.",
    );

  const { valid, error } = validateArguments(command, args);

  if (!valid) return whisper(instance, author, `✗ ${error}`);

  for (const arg of command.arguments) {
    if (arg.type === "string" && arg.stringInfinite) {
      const index = command.arguments.indexOf(arg);
      const infiniteArg = args.slice(index);

      args.splice(index, args.length - index, infiniteArg.join(" "));
    }
  }

  const returnMessage = await command.execute(instance, author, args);
  if (!returnMessage) return;

  whisper(instance, author, returnMessage);
}

export function validateArguments(
  command: Command,
  args: string[],
): { valid: boolean; error?: string } {
  if (
    command.arguments[command.arguments.length - 1]?.stringInfinite &&
    args.length > command.arguments.length
  ) {
    const infiniteArg = args.slice(command.arguments.length - 1);

    args.splice(command.arguments.length - 1);
    args.push(infiniteArg.join(" "));
  }

  const requiredArgs = command.arguments.filter((arg) => arg.required);

  if (args.length > command.arguments.length) {
    return {
      valid: false,
      error: `Too many arguments. (Expected ${command.arguments.length}, given ${args.length})`,
    };
  }

  if (args.length < requiredArgs.length) {
    return {
      valid: false,
      error: `Not enough arguments. (Expected ${requiredArgs.length}, given ${args.length})`,
    };
  }

  for (let i = 0; i < args.length; i++) {
    const arg = command.arguments[i]!;
    const value = args[i]!;

    if (arg.type === "string") {
      if (arg.stringOptions) {
        if (!arg.stringOptions.includes(value)) {
          return {
            valid: false,
            error: `Invalid argument. (Expected one of ${arg.stringOptions.join(
              ", ",
            )}, given '${value}'w)`,
          };
        }
      } else {
        if (arg.stringInfinite) {
          continue;
        }

        if (value === "") {
          return {
            valid: false,
            error: `Invalid argument. (Expected a string, given ${value})`,
          };
        }
      }
    } else if (arg.type === "number") {
      const number = Number(value);

      if (isNaN(number)) {
        return {
          valid: false,
          error: `Invalid argument. (Expected a number, given ${value})`,
        };
      }

      if (arg.numberMinimum && number < arg.numberMinimum) {
        return {
          valid: false,
          error: `Invalid argument. (Expected a number greater than or equal to ${arg.numberMinimum}, given ${value})`,
        };
      }

      if (arg.numberMaximum && number > arg.numberMaximum) {
        return {
          valid: false,
          error: `Invalid argument. (Expected a number less than or equal to ${arg.numberMaximum}, given ${value})`,
        };
      }
    }
  }

  return { valid: true };
}
