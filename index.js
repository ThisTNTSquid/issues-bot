// load libs
const path = require("path");
const logger = require('./utils/logger')
// setup discord,js
const Discord = require("discord.js");
const bot = new Discord.Client();

// load config
let config
try{
  config = require('./config.json')
} catch(e){
  console.error(e)
  console.log("=========================")
  console.log('TIPS: Have you rename \'config-example.json\' to \'config.json\' yet?')
  process.exit()
}

// Bot initialization handler
bot.on("ready", async () => {
  logger.info("Bot Started");
  logger.info("Invite the bot to your server with\n");
  let link = await bot.generateInvite([
    "ADD_REACTIONS",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "USE_EXTERNAL_EMOJIS",
    "MENTION_EVERYONE",
    "ATTACH_FILES"
  ])
  logger.info(link);
});

bot.login(config.token)
