import { Player } from "../utils/api";
import { Command } from "../handlers/commands";
import { Gamemode, gamemodes, generateStatEntries } from "../utils/statEntries";

export async function getStatisticsString(player: Player, gamemode: Gamemode) {
  let message = `⁎ ${player.level} ${[...player.ranks, player.tier]
    .join(" ")
    .toUpperCase()} ${player.name}${` ${player.guildData?.tag}` ?? ""}`;

  // TODO: Cache these so it doesn't have to import every time.
  const statEntries = await generateStatEntries(player);
  const statEntry = statEntries[gamemode]!;

  for (const entry of statEntry) {
    const value = entry.value;

    message += ` ${entry.symbol} ${entry.name}: ${value}`;
  }

  return message;
}

export default <Command<[Gamemode, string | null]>>{
  aliases: ["player", "p"],
  description: "Displays statistics for a player.",
  arguments: [
    {
      name: "gamemode",
      type: "string",
      required: true,
      stringOptions: gamemodes,
    },
    {
      name: "player",
      type: "string",
      // Defaults to the author's username.
      required: false,
      stringInfinite: true,
    },
  ],
  execute: async (instance, author, args) => {
    const gamemode = args[0];
    const username = args[1] || author;

    const player = await instance.apiClient.players.retrieve(username, {
      include: ["guild", "online", "stats"],
    });

    if (!player) return "Unknown player.";

    const message = await getStatisticsString(player, gamemode);
    return message;
  },
};
