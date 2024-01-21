import { EventHandler } from "../handlers/events";
import { SetScore } from "../packets/setScore";
import { stripString } from "../utils/string";

export default <EventHandler<SetScore>>{
  event: "set_score",
  execute: (instance, packet) => {
    if (packet.action === "change") {
      // TODO: The lobby entry's index, 4, is subject to change if NetherGames updates their scoreboard. Dynamically finding this entry might be a better idea for future-proofing.
      const lobbyEntry = packet.entries.find((entry) => entry.score === 4);
      if (!lobbyEntry) return;

      const [, lobby] = stripString(lobbyEntry.customName!).split(" ");

      instance.session.lobby = parseInt(lobby!.slice(1));
    }
  },
};
