import { MessageType, handleChat } from "../handlers/chat";
import { EventHandler } from "../handlers/events";
import { Text } from "../packets/text";
import { setChatMode } from "../utils/chat";
import { stripString } from "../utils/string";

export default <EventHandler<Text>>{
	event: "text",
	execute: (instance, packet) => {
		if (!packet.message) return;

		let type: MessageType;
		const stripped = stripString(packet.message);

		console.log(stripped);

		if (stripped === "Welcome to NetherGames!") setChatMode(instance, "ranked");

		if (stripped.startsWith("RANKED »")) type = "ranked";
		else if (
			/(.+) whispered to you: (.+)$/.test(stripped) ||
			(stripped.startsWith("WHISPER »") &&
				!stripped.startsWith("WHISPER » You whispered to"))
		)
			type = "whisper";
		else return;

		handleChat(instance, type, stripped);
	},
};
