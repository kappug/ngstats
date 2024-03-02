import { Instance } from "../instance";
import { CommandRequest } from "../packets/commandRequest";
import { Text } from "../packets/text";
import { camelToSnake } from "./string";

export function sendChatMessage(instance: Instance, message: string) {
  return instance.client.queue(
    "text",
    camelToSnake<Text>({
      type: "chat",
      sourceName: "",
      needsTranslation: false,
      xuid: "",
      platformChatId: "",
      message,
    }),
  );
}

export function executeCommand(instance: Instance, command: string) {
  return instance.client.write(
    "command_request",
    camelToSnake<CommandRequest>({
      command,
      origin: {
        type: "player",
        uuid: "",
        requestId: "",
        playerEntityId: undefined,
      },
      internal: false,
    }),
  );
}

export function whisper(instance: Instance, username: string, message: string) {
  return executeCommand(instance, `/whisper "${username}" ${message}`);
}

export type ChatMode = "global" | "party" | "guild" | "ranked";

export function setChatMode(instance: Instance, mode: ChatMode) {
  return executeCommand(instance, `/chat ${mode}`);
}
