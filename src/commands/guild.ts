import { Command } from "../handlers/commands";
import { generateXpProgressString } from "../utils/string";
import { getXpToReachLevel } from "@nethergames/utils";

export default <Command<[string]>>{
  aliases: ["guild", "g"],
  description: "Displays statistics for a guild.",
  arguments: [
    {
      name: "guild",
      type: "string",
      // Defaults to the author's guild.
      required: false,
      stringInfinite: true,
    },
  ],
  execute: async (instance, author, args) => {
    let guildName = args[0];

    if (!guildName) {
      const player = await instance.apiClient.players.retrieve(author, {
        include: ["guild"],
      });

      if (!player?.guild)
        return "✗ No guild was provided, and you are not in a guild.";

      guildName = player.guild;
    }

    const guild = await instance.apiClient.guilds.retrieve(guildName);

    if (!guild) return "✗ Unknown guild.";

    const minimumXp = getXpToReachLevel(guild.level);
    const requiredXp = getXpToReachLevel(guild.level + 1);
    const progress = generateXpProgressString(
      guild.xpToNextLevel,
      requiredXp - minimumXp
    );

    const message = `⁎ ${guild.name}${guild.tag ? ` (${guild.tag})` : ""}${
      guild.position ? ` [#${guild.position}]` : ""
    } ♔ Leader: ${guild.leader} ☺ Members: ${guild.memberCount}/${
      guild.maxSize
    } (${guild.officers.length} officers) ⋆ Level: ${guild.level} ☍ XP: ${
      guild.xp
    } ↔ Leveling progress: ${progress}`;

    return message;
  },
};
