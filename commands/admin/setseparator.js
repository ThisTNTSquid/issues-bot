const Commando = require("discord.js-commando");

class SetSeparatorCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "setseparator",
      group: "admin",
      memberName: "setseparator",
      description: "Sets the separator for separating title and content",
      examples: ["setseparator ::", "setseparator //"],
      args: [
        {
          key: "separator",
          prompt: "Please enter the separator",
          type: "string"
        }
      ]
    });
  }
  async run(msg, { separator }) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.reply(
        "❎ You do not have permission to do this, please ask your server administrator to do this instead"
      );
      return;
    }
    msg.guild.settings
      .set("separator", separator)
      .then(
        msg.channel.send(
          ":white_check_mark: Title content separator set to " +
            msg.guild.settings.get("separator")
        )
      );
  }
}
module.exports = SetSeparatorCommand;
