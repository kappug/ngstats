import { Player } from "../api";
import {
  generateKdEntry,
  generateKillsEntry,
  generateNumericEntry,
  generateWinsEntry,
} from "../statEntries";

export default function (player: Player) {
  return [
    generateWinsEntry(player.extraNested?.cq.wins),
    generateKillsEntry(player.extraNested?.cq.kills),
    generateKdEntry(
      player.extraNested?.cq.kills,
      player.extraNested?.cq.deaths
    ),
    generateNumericEntry(
      "⚑",
      "Flags captured",
      player.extraNested?.cq.flags.captured || 0
    ),
  ];
}
