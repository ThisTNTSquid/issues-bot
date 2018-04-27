// load libs
const path = require("path");
const Logger = require("./src/utils/Logger");
const sqlite = require("sqlite");
const fs = require("fs");
const DiscordJS = require("discord.js");

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
const log = new Logger("./logs");
let link;
// setup discord,js
const Commando = require("discord.js-commando");
const bot = new Commando.Client({
  owner: config.owners,
  commandPrefix: config.command_prefix
});

// Bot Main
bot
  .on("ready", async () => {
    log.info("Bot Started");
    log.info("Invite the bot to your server with");
    try {
      link = await bot.generateInvite([
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
  })
  .on("message", msg => {
    if (msg.author.bot || msg.channel.type == "dm") return;

    if (msg.content.startsWith(msg.guild.settings.get("prefix"))) {
      log.info(
        `[CMD] (${msg.guild.name}->#${msg.channel.name}) ${
          msg.author.username
        }: ${msg.content}`
      );
    }
    // let msgArray = msg.content.split(" ");
    // let command = msgArray[0];
    // let args = msgArray.slice(1);

    // if (command == `${prefix}test`) {
    //   msg.channel.send(
    //     "You ran the test command with args: " + args.toString()
    //   );
    // } else if (command == `${prefix}suggest`) {
    //   // Suggestions
    // TODO: Add in database logic
    //   // --code
    //   msg.channel.send(
    //     new DiscordJS.RichEmbed()
    //       .setAuthor(
    //         "Suggestion #1",
    //         "https://emojipedia-us.s3.amazonaws.com/thumbs/120/twitter/134/thought-balloon_1f4ad.png"
    //       )
    //       .setTitle("Title of the suggestion")
    //       .setDescription(args.join(" ") + "\n")
    //       .setColor(0x4ab6f9)
    //       .setTimestamp()
    //       .setFooter(msg.author.username, msg.author.avatarURL)
    //   );
    // } else if (command == `${prefix}leave-server`) {
    //   if (msg.member.hasPermission("ADMINISTRATOR")) {
    //     msg.channel.send(":walking: Leaving your server.... See you :(");
    //     bot.guilds.get(msg.guild.id).leave();
    //   } else {
    //     msg.channel.send(
    //       "You do not have enough permission to remove me yet, please contact the server administrator if you really wanted to do this"
    //     );
    //   }
    // }
  })
  .on("error", e => console.error(e))
  .on("guildDelete", guild => {
    log.info(`[LEAVE] (-) Bot left guild \'${guild.name}\' (${guild.id})`);
  })
  .on("guildCreate", guild => {
    log.info(`[JOIN] (+) Bot joined guild \'${guild.name}\' (${guild.id})`);
    guild.settings.set("prefix",config.command_prefix)
  });

// client.on("suggest",(msg)=>{
//   msg.channel.send("Someone suggest something")
// })

// Database provider
bot
  .setProvider(
    sqlite
      .open(path.join(__dirname, "settings.db"))
      .then(db => new Commando.SQLiteProvider(db))
  )
  .catch(console.error);

// Load commands folder
bot.registry
  .registerGroups([["issues", "Opening issues"], ["misc", "Misc Commands"],["admin","Bot Administrator"]])
  .registerDefaults()
  .registerCommandsIn(path.join(__dirname, "commands"))
  .registerTypesIn(path.join(__dirname, "types"));

bot.on("debug", msg => {
  log.debug(msg);
});

bot.login(config.token);

module.exports=link