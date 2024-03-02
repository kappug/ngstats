import { Player } from "../api";
import {
  generateKdEntry,
  generateKillsEntry,
  generateNumericEntry,
  generateWinsEntry,
  generateWlEntry,
} from "../statEntries";

export default function (player: Player) {
  return [
    generateWinsEntry(player.extraNested?.tb.wins),
    generateWlEntry(player.extraNested?.tb.wins, player.extraNested?.tb.losses),
    generateKillsEntry(player.extraNested?.tb.kills),
    generateKdEntry(
      player.extraNested?.tb.kills,
      player.extraNested?.tb.deaths,
    ),
    generateNumericEntry(
      "⊞",
      "Goals scored",
      player.extraNested?.tb.goals || 0,
    ),
    generateNumericEntry(
      "▴",
      "Arrows shot",
      player.extraNested?.tb.arrows?.shot || 0,
    ),
  ];
}
