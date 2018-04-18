const path = require("path");
const Discord = require("discord.js");
const bot = new Discord.Client();

// Bot initialization handler
bot.on("ready", () => {
  console.log("Bot Started");
  console.log(`Invite the bot to your server with\n \
  =======================================\n \
  ${bot.generateInvite([
    "ADD_RECTIONS",
    "VIEW_CHANNEL",
    "SEND_MESSAGES",
    "READ_MESSAGE_HISTORY",
    "MANAGE_MESSAGES",
    "EMBED_LINKS",
    "USE_EXTERNAL_EMOJIS",
    "MENTION_EVERYONE",
    "ATTACH_FILES"
  ])}\
  ===========================================
  `);
});

bot.login('')
