import { Version, createClient } from "bedrock-protocol";
import { config } from "dotenv";
import { Instance } from "./instance";
import { WebhookClient } from "discord.js";
import { NetherGamesClient } from "@nethergames/api";
import { registerEvents } from "./handlers/events";
import { registerCommands } from "./handlers/commands";

async function main() {
  let hasConnected = false;
  const client = createClient({
    version: process.env.VERSION as Version,
    username: process.env.BOT_GAMERTAG,
    host: process.env.NG_SERVER_ADDRESS ?? "play.nethergames.org",
    port: parseInt(process.env.NG_SERVER_PORT ?? "19132"),
  });

  const apiClient = new NetherGamesClient(process.env.NG_API_KEY, {
    userAgent: `ngstats/${process.env.npm_package_version}`,
  });

  const instance: Instance = {
    client,
    apiClient,
    webhookClient: new WebhookClient({
      url: process.env.LOGS_WEBHOOK ?? "",
    }),
    commands: [],
    session: {},
  };

  console.log("Connecting...");

  client.on("join", () => {
    console.log("Connected!");
    hasConnected = true;

    registerEvents(instance);
    registerCommands(instance);
  });

  client.on("disconnect", async ({ message }: { message: string }) => {
    console.log(`Disconnected: ${message}\nReconnecting...`);

    const hasConnected = await main();

    setTimeout(() => {
      if (!hasConnected) {
        client.disconnect();
      }
    }, 20000);
  });

  return hasConnected;
}

config();
main();
