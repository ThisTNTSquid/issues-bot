const Commando = require("discord.js-commando");

class SetChannelCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "setchannel",
      group: "admin",
      memberName: "setchannel",
      description: "Sets the channel for issues/suggestions to post to",
      examples: [
        "setchannel suggest 401935929907458816",
        "setchannel issue 431194313873421504"
      ],
      args: [
        {
          key: "type",
          prompt:
            "Please enter the type for the channel: `suggest` for suggestion, and `issue`/`issues` for issues like bug reports",
          type: "string"
        },
        {
          key: "channel",
          prompt: "Please enter the channel id",
          type: "string"
        }
      ]
    });
  }
  async run(msg, args) {
    if (!msg.member.hasPermission("ADMINISTRATOR")) {
      msg.reply(
        "You do not have permission to do this, please ask your server administrator to do this instead"
      );
      return;
    }
    if (msg.guild.channels.has(args.channel)) {
      if (args.type == "suggest") {
        msg.guild.settings.set("suggest_channel", args.channel);
        msg.channel.send(
          `:white_check_mark: Suggestion channel set to #${
            msg.guild.channels.get(args.channel).name
          }(${msg.guild.channels.get(args.channel).id})`
        );
      } else if (args.type == "issue" || args.type == "issues") {
        msg.guild.settings.set("issue_channel", args.channel);
        msg.channel.send(
          `:white_check_mark: Issues channel set to #${
            msg.guild.channels.get(args.channel).name
          }(${msg.guild.channels.get(args.channel).id})`
        );
      } else {
        msg.channel.send(
          "The type of message is unknown, it should be either `suggest` or `issue`"
        );
      }
    } else {
      msg.channel.send(
        "The channel ID you provided does not belong to the this guild! Please set it to a channel that belongs to the **same guild**"
      );
    }
    // if msg.channel.guild = this.clientargs.channel.guild -> pass else
  }
}
module.exports = SetChannelCommand;

//done