// load libs
const path = require("path");
const Log = require("log"),
  log = new Log("info");
const sqlite = require("sqlite");

// load config
let config;
try {
  config = require("./config.json");
} catch (e) {
  console.error(e);
  console.log("=========================");
  console.log(
    "TIPS: Have you rename 'config-example.json' to 'config.json' yet?"
  );
  process.exit();
}

// setup discord,js
const DiscordJS = require("discord.js");
const client = new DiscordJS.Client();
const prefix = config.command_prefix;
// Bot initialization handler
client.on("ready", async () => {
  log.info("Bot Started");
  log.info("Invite the bot to your server with\n");

  try {
    let link = await client.generateInvite([
      "ADD_REACTIONS",
      "VIEW_CHANNEL",
      "SEND_MESSAGES",
      "READ_MESSAGE_HISTORY",
      "MANAGE_MESSAGES",
      "EMBED_LINKS",
      "USE_EXTERNAL_EMOJIS",
      "MENTION_EVERYONE",
      "ATTACH_FILES"
    ]);
    log.info(link);
  } catch (e) {
    console.error(e);
  }
});

client.on("message", msg => {
  if (msg.author.bot || msg.channel.type == "dm") return;
  let msgArray = msg.content.split(" ");
  let command = msgArray[0];
  let args = msgArray.slice(1);

  if (command == `${prefix}test`) {
    log.info(`[CMD] ${msg.author.username}: ${msg.content}`);
    msg.channel.send("You ran the test command with args: " + args.toString());
  }
});

// handle problems
client.on("error", e => console.error(e));

client.on("disconnect", () => {
  process.exit();
});

client.login(config.token);
