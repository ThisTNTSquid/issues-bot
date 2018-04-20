// load libs
const path = require("path");
const Logger = require("./src/utils/Logger"),
  log = new Logger("./logs")
const sqlite = require("sqlite3");
const db = new sqlite.Database("./data.db",err=>{
  if (err){
    console.error(err)
  process.exit(1)}
  log.info("Connected to database")

})

// load config
let config;
try {
  config = require("./config.js");
} catch (e) {
  console.error(e.stack);
  console.log("=========================");
  console.log("TIPS: Have you rename 'config-example.js' to 'config.js' yet?");
  process.exit(1);
}

// setup discord,js
const DiscordJS = require("discord.js");
const client = new DiscordJS.Client();
const prefix = config.command_prefix;
// Bot initialization handler
client.on("ready", async () => {
  log.info("Bot Started");
  log.info("Invite the bot to your server with");

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
  if (msg.content.startsWith(config.command_prefix)) {
    log.info(
      `[CMD] (${msg.guild.name}->${msg.channel.name}) ${msg.author.username}: ${
        msg.content
      }`
    );
  }
  let msgArray = msg.content.split(" ");
  let command = msgArray[0];
  let args = msgArray.slice(1);

  if (command == `${prefix}test`) {
    msg.channel.send("You ran the test command with args: " + args.toString());
  } else if (command == `${prefix}suggest`) {
    // Suggestions
    //todo Add in database logic
    // --code
    msg.channel.send(
      new DiscordJS.RichEmbed()
        .setAuthor(
          "Suggestion #1",
          "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/134/thought-balloon_1f4ad.png"
        )
        .setTitle("Title of the suggestion")
        .setDescription(args.join(" ") + "\n")
        .setColor(0x4ab6f9)
        .setTimestamp()
        .setFooter(msg.author.username, msg.author.avatarURL)
    );
  } else if (command == `${prefix}leave`) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      msg.channel.send(":walking: Leaving your server.... See you :(");
      client.guilds.get(msg.guild.id).leave();
    } else {
      msg.channel.send("You do not have enough permission to remove me yet, please contact the server administrator if you really wanted to do this")
    }
  }
});

// handle problems
client.on("error", e => console.error(e));

client.on("guildDelete", guild => {
  log.info(`[LEAVE] Bot left guild \'${guild.name}\' (${guild.id})`);
});

// client.on("suggest",(msg)=>{
//   msg.channel.send("Someone suggest something")
// })

client.login(config.token);
