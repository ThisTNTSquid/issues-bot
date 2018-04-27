const Commando = require("discord.js-commando");
const DiscordJS = require("discord.js");

class AboutCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "about",
      aliases: ["who", "what"],
      group: "misc",
      memberName: "about",
      description: "Returns some extra details about the bot",
      examples: ["about"]
    });
  }

  async run(msg, args) {
    msg.channel.send(new DiscordJS.RichEmbed()
        .setColor([255, 185, 0])
        .setTitle("COFFEE")
        .setDescription("A simple discord issue tracking and management bot")
        .addField("Written In", "Discord.JS", true)
        .addField("Version", "idk meh~", true)
        .addBlankField()
        .addField("Github", "https://github.com/ThisTNTSquid/issues-bot")
        .setTimestamp()
        .setFooter("Made with 🐸 and ☕ by ThisTNTSquid"));
  }
}

module.exports = AboutCommand;
