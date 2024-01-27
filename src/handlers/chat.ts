import { Instance } from "../instance";
import { handleCommand } from "./commands";

export type MessageType = "whisper" | "ranked" | "party";
export async function handleChat(
	instance: Instance,
	type: MessageType,
	message: string
) {
	if (type === "ranked" && process.env.RANKED_CHAT_WEBHOOK) {
		const [_, username, content] = message.match(/^RANKED » (.+?): (.+?)$/)!;
		const player = await instance.apiClient.players.retrieve(username!);

		instance.rankedChatWebhookClient.send({
			username: username,
			avatarURL: player?.avatar,
			content: content!.replace(/@/g, "`@`"),
		});

		if (
			content!
				.toLowerCase()
				.startsWith(`.${process.env.BOT_GAMERTAG.toLowerCase()}`)
		) {
			const message = content!.split(/ +/).slice(1).join(" ");

			await handleCommand(instance, username!, "ranked", message);
		}
	} else if (type === "whisper") {
		let username: string, content: string;

		if (message.startsWith("WHISPER »")) {
			let [_, username_, content_] = message.match(/^WHISPER » (.+?): (.+)/)!;

			username_ = username_?.replace(" whispered to you", "");

			username = username_!;
			content = content_!;
		} else {
			const [_, username_, content_] = message.match(
				/^(.+?) whispered to you: (.+)/
			)!;

			username = username_!;
			content = content_!;
		}

		await handleCommand(instance, username!, "whisper", content!);
	}
}
