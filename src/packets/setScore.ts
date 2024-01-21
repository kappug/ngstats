export interface ScoreboardEntry {
  scoreboardId: bigint;
  objectiveName: string;
  /** Used by NetherGames to position messages on the scoreboard. */
  score: number;
  entryType?: "player" | "entity" | "fake_player";
  entityUniqueId?: bigint;
  customName?: string;
}

export interface SetScore {
  action: "change" | "remove";
  entries: ScoreboardEntry[];
}
