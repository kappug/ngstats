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
    generateWinsEntry(player.extraNested?.duels.wins),
    generateWlEntry(
      player.extraNested?.duels.wins,
      player.extraNested?.duels.losses,
    ),
    generateKillsEntry(player.extraNested?.duels.kills),
    generateKdEntry(
      player.extraNested?.duels.kills,
      player.extraNested?.duels.deaths,
    ),
    generateNumericEntry(
      "⊞",
      "Melee hits",
      player.extraNested?.duels.melee?.hits || 0,
    ),
    generateNumericEntry(
      "▴",
      "Arrows shot",
      player.extraNested?.duels.arrows?.shot || 0,
    ),
  ];
}
