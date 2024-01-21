import { Command } from "../handlers/commands";

export default <Command>{
  aliases: ["location", "l"],
  description: "Displays the lobby that the bot is currently in.",
  arguments: [],
  execute: async (instance) => {
    const lobby = instance.session.lobby!;
    const player = await instance.apiClient.players.retrieve(
      process.env.BOT_GAMERTAG
    );

    return `⁎ The bot is currently in lobby #${lobby} (${player?.lastServerParsed.region}).`;
  },
};
