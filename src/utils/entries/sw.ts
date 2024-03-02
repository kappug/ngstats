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
    generateWinsEntry(player.extraNested?.sw.wins),
    generateWlEntry(player.extraNested?.sw.wins, player.extraNested?.sw.losses),
    generateKillsEntry(player.extraNested?.sw.kills),
    generateKdEntry(
      player.extraNested?.sw.kills,
      player.extraNested?.sw.deaths,
    ),
    generateNumericEntry(
      "▩",
      "Blocks placed",
      player.extraNested?.sw.blocks?.placed || 0,
    ),
    generateNumericEntry(
      "▢",
      "Blocks broken",
      player.extraNested?.sw.blocks?.broken || 0,
    ),
    generateNumericEntry(
      "〄",
      "Eggs thrown",
      player.extraNested?.sw.eggs?.thrown || 0,
    ),
  ];
}
