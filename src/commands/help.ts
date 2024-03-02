import { Command } from "../handlers/commands";

export default <Command<[string | null]>>{
  aliases: ["help", "h"],
  description: "Displays a list of commands.",
  arguments: [
    {
      name: "command",
      type: "string",
      required: false,
    },
  ],
  execute: async (instance, _author, args) => {
    if (args[0]) {
      const command = instance.commands.find((command) =>
        command.aliases.includes(args[0]!.toLowerCase()),
      );

      if (!command) return "Unknown command.";

      const argumentsString = command.arguments
        .map((argument) => {
          const required = argument.required ? "" : "?";
          const suffix =
            argument.type === "string" &&
            (argument.stringOptions || []).length! > 0
              ? `: ${argument.stringOptions?.join("/")}`
              : argument.type === "number" &&
                  argument.numberMinimum &&
                  argument.numberMaximum
                ? `: ${argument.numberMinimum}..${argument.numberMaximum}`
                : "";

          return `<${argument.name}${required}${suffix}>`;
        })
        .join(" ");

      return `⁎ Usage: ${command.aliases[0]} ${argumentsString} ⁎ Description: ${command.description}`;
    }

    const commands = Array.from(instance.commands.values())
      .filter((command) => !command.hidden)
      .map((command) => `${command.aliases[0]}`)
      .join(" - ");

    return `⁎ Available commands: ${commands}. Use 'help <command>' to view a specific command's usage and description.`;
  },
};
