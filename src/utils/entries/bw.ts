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
		generateWinsEntry(player.extraNested?.bw.wins),
		generateWlEntry(
			player.extraNested?.bw.wins,
			player.extraNested?.bw.deaths,
			"W/D"
		),
		generateKillsEntry(player.extraNested?.bw.final?.kills, "Final kills"),
		generateKdEntry(
			player.extraNested?.bw.final?.kills,
			player.extraNested?.bw.deaths,
			"FK/D"
		),
		generateNumericEntry(
			"⌬",
			"Beds broken",
			player.extraNested?.bw.beds?.broken || 0
		),
		generateWlEntry(
			player.extraNested?.bw.beds?.broken,
			player.extraNested?.bw.deaths,
			"BB/D"
		),
	];
}
