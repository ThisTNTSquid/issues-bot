const DiscordJS = require("discord.js");
const issuesHandler = require("../index").issuesHandler;
const config = require("../config");

class Issue {
  constructor(message, type) {
    this.type = type;
    this.guild = message.guild;
    this.channel = message.channel;
    this.title = message.content.split("::")[0];
    this.content = message.content.split("::")[1];
  }

  setTitle(title) {
    this.title = title;
  }

  setContent(content) {
    this.content = content;
  }

  create() {
    // TODO: Add record into database -@ThisTNTSquid at 4/27/2018, 6:01:00 PM
    // TODO: Send it to the configured text channel -@ThisTNTSquid at 4/28/2018, 2:51:41 AM
    
    let channel = this.guild.settings.get((this.type == "suggest") ? "suggest_channel" : ((this.type == "issue") ? "issue_channel" : null));
    if (!channel) {
      this.channel.send(
        `⚠ The issues channel is not yet set! Set it with \`${this.guild.settings.get(
          "prefix"
        )}setchannel\``
      );
      return;
    }

    issuesHandler.create(this);
    // Record it to the database
  }
}


module.exports = Issue;
