import { Player } from "./api";

export const gamemodes = ["all", "bw", "sw", "duels", "cq", "tb"] as const;
export type Gamemode = (typeof gamemodes)[number];

export interface StatEntry {
  symbol: string;
  name: string;
  value: string;
}

/** This makes generating entries less spaghetti-ish. */
export function generateEntry(symbol: string, name: string, value: string) {
  return {
    symbol,
    name,
    value,
  };
}

export function generateNumericEntry(
  symbol: string,
  name: string,
  value: number
) {
  return generateEntry(symbol, name, value.toLocaleString());
}

export function generateWinsEntry(wins?: number) {
  return generateNumericEntry("✓", "Wins", wins || 0);
}
export function generateWlEntry(wins?: number, losses?: number, name = "W/L") {
  return generateNumericEntry("⇅", name, (wins || 0) / (losses ??= 1));
}
export function generateKillsEntry(kills?: number, name = "Kills") {
  return generateNumericEntry("⚔", name, kills || 0);
}
export function generateKdEntry(kills?: number, deaths?: number, name = "K/D") {
  return generateNumericEntry("⇅", name, (kills || 0) / (deaths ??= 1));
}

export async function generateStatEntries(player: Player) {
  let statEntries: {
    [key in Gamemode]?: StatEntry[];
  } = {};

  for (const gamemode of gamemodes) {
    const {
      default: entries,
    }: {
      default: (player: Player) => StatEntry[];
    } = await import(`./entries/${gamemode}`);

    statEntries[gamemode] = entries(player);
  }

  return statEntries;
}
