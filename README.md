# ngstats

ngstats is a messageable bot that allows you to check your NetherGames statistics extensively, in-game.

# Why?

- It's a lot easier to message a bot in-game than open a browser and visit the portal or use a Discord bot.
- The built-in `/stats` command provides little information, and lacks statistics about specific gamemodes, leaderboards, and guilds.
- Mobile players aren't able to tab out of their game to visit an external app (to check their stats) without disconnecting.

# Running

### Requirements

- Node.js v16+

### Installation

```sh
$ git clone https://github.com/kappug/ngstats.git
$ cd ngstats
$ npm install
```

Next, create a file named `.env` in the root directory. Your file should look something like like this (with the fields filled in, obviously):

```
BOT_GAMERTAG=...
VERSION=1.20.40
NG_SERVER_ADDRESS=play.nethergames.org
NG_SERVER_PORT=19132
NG_API_KEY=...
LOGS_WEBHOOK=https://discord.com/api/webhooks/.../...
TRUSTED_GAMERTAGS=Player One,Player Two,...
```

All of these fields are optional except for `BOT_GAMERTAG`, the bot's Gamertag, and `VERSION`, the Minecraft version the bot should connect with. If you want to want to set all these variables manually instead of creating a `.env` file, that's fine too.

Finally, run:

```sh
$ npm run dev
```

After logging in, you should be able to log onto NetherGames and type `/whisper <bot's username> help`, and receive a response.

# Common issues

- "My bot is online, but it's not responding to my messages."
  - Ensure that your privacy settings on both your and the bot's account are set to allow messages from everyone. You can change this on the portal (`Edit Profile > DM Settings > Allow DMs from everyone`) and in-game (`Social Menu > Chat Settings > DM Privacy Settings > Allow from everyone`).
- "Why do I get `sendto failed with code -1...` messages every time I start the bot?"
  - Just ignore it. If it still connects, it's fine.

# Disclaimer

I am not responsible for any punishments given to you as a result of running your own instance. I have been granted [explicit permission](https://ngmc.co/p/ngstats) to run _my own instance_ of this bot, and if you really want to run your own, you should consult staff for the same.
