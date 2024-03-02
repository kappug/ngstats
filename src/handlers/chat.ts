import { Instance } from "../instance";
import { handleCommand } from "./commands";

export type MessageType = "whisper" | "ranked" | "party";
export async function handleChat(
  instance: Instance,
  type: MessageType,
  message: string,
) {
  if (type === "whisper") {
    let username: string, content: string;

    if (message.startsWith("WHISPER »")) {
      let [_, username_, content_] = message.match(/^WHISPER » (.+?): (.+)/)!;

      username_ = username_?.replace(" whispered to you", "");

      username = username_!;
      content = content_!;
    } else {
      const [_, username_, content_] = message.match(
        /^(.+?) whispered to you: (.+)/,
      )!;

      username = username_!;
      content = content_!;
    }

    await handleCommand(instance, username!, content!);
  }
}
