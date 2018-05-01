const Commando = require("discord.js-commando");

class LeaveServerCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "leave-server",
      group: "admin",
      memberName: "leave-server",
      description: "Make the bot leave your discord server",
      examples: ["leave-server"]
    });
  }

  run(msg) {
    if (msg.member.hasPermission("ADMINISTRATOR")) {
      msg.channel.send(":walking: Leaving your server.... See you :(");
      this.client.guilds.get(msg.guild.id).leave();
    } else {
      msg.channel.send(
        "❎ You do not have enough permission to remove me yet, please contact the server administrator if you really wanted to do this"
      );
    }
  }
}

module.exports = LeaveServerCommand;
