import { getXpToReachLevel } from "@nethergames/utils";
import { Player } from "../api";
import {
  StatEntry,
  generateEntry,
  generateKdEntry,
  generateKillsEntry,
  generateWinsEntry,
  generateWlEntry,
} from "../statEntries";
import { generateXpProgressString } from "../string";

export default function (player: Player): StatEntry[] {
  const minimumXp = getXpToReachLevel(player.level);
  const requiredXp = getXpToReachLevel(player.level + 1);
  const progress = generateXpProgressString(
    player.xpToNextLevel,
    requiredXp - minimumXp
  );

  return [
    generateEntry(
      player.online ? "●" : "○",
      "Status",
      `${
        player.online
          ? `Online (${player.lastServerParsed.pretty})`
          : `Offline (${player.lastSeen})`
      }`
    ),
    generateWinsEntry(player.wins),
    generateWlEntry(player.wins, player.losses),
    generateKillsEntry(player.kills),
    generateKdEntry(player.kills, player.deaths),
    generateEntry("⌗", "Discord", player.discordTag ?? "(none)"),
    generateEntry("↔", "Leveling progress", progress),
  ];
}
