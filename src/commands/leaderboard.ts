import { Command } from "../handlers/commands";
import { Gamemode, gamemodes } from "../utils/statEntries";

const symbols = ["❶", "❷", "❸", "❹", "❺", "❻", "❼", "❽", "❾", "❿"];

export default <Command<[Gamemode | null]>>{
  aliases: ["leaderboard", "lb"],
  description: "Displays the top 10 players for a certain leaderboard.",
  arguments: [
    {
      name: "gamemode",
      type: "string",
      stringOptions: gamemodes as readonly string[],
      required: true,
    },
  ],
  execute: async (instance, _author, args) => {
    const leaderboard = await instance.apiClient.leaderboard.list("game", {
      column: (args[0] === "all" ? "wins" : `${args[0]}_wins`) as "wins",
    });

    let message = "⁎ Leaderboard (top 10 wins):";

    for (let i = 0; i < 10; i++) {
      const entry = leaderboard[i]!;

      message += ` ${symbols[i]} ${
        entry.player
      }: ${entry.value.toLocaleString()}`;
    }

    return message;
  },
};
