import { NetherGamesClient } from "@nethergames/api";

const dummyClient = new NetherGamesClient();

export type Player = Exclude<
  Awaited<ReturnType<typeof dummyClient.players.retrieve>>,
  null
>;

export type Guild = Exclude<
  Awaited<ReturnType<typeof dummyClient.guilds.retrieve>>,
  null
>;
