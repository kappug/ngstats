type CommandOriginType =
  | "player"
  | "block"
  | "minecart_block"
  | "dev_console"
  | "test"
  | "automation_player"
  | "client_automation"
  | "dedicated_server"
  | "entity"
  | "virtual"
  | "game_argument"
  | "entity_server"
  | "precompiled"
  | "game_director_entity_server"
  | "script"
  | "executor";

interface CommandOrigin {
  type: CommandOriginType;
  uuid: string;
  requestId: string;
  playerEntityId?: string;
}

export interface CommandRequest {
  command: string;
  origin: CommandOrigin;
  internal: boolean;
  version?: number;
}
