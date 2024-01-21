import { NetherGamesClient } from "@nethergames/api";
import { Client } from "bedrock-protocol";
import { WebhookClient } from "discord.js";
import { Command } from "./handlers/commands";

export interface Instance {
  client: Client;
  apiClient: NetherGamesClient;
  rankedChatWebhookClient: WebhookClient;
  logsWebhookClient: WebhookClient;
  commands: Command[];
  session: {
    lobby?: number;
  };
}
