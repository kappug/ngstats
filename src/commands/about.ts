import { Command } from "../handlers/commands";

export default <Command>{
  aliases: ["about"],
  description: "Displays information about the bot.",
  arguments: [],
  execute: async () => {
    return `ⓘ ngstats is a messageable bot that allows you to check your NetherGames statistics extensively, in-game. ¤ Version: ${process.env.npm_package_version} ☃ Created by: Kappug ⌗ Join the Discord: https://discord.gg/NpVZMpnrCT`;
  },
};
