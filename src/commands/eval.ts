import { Command } from "../handlers/commands";

export default <Command<[string]>>{
  aliases: ["eval"],
  description: "Evaluate JavaScript code.",
  hidden: true,
  arguments: [
    {
      name: "code",
      type: "string",
      required: true,
      stringInfinite: true,
    },
  ],
  execute: async (_instance, author, args) => {
    const trustedGamertags =
      process.env.TRUSTED_GAMERTAGS?.toLowerCase().split(",") ?? [];

    if (trustedGamertags.includes(author.toLowerCase()))
      return eval(args.join(" "));
    else return "✗ You don't have permission to use this command.";
  },
};
