const DiscordJS = require("discord.js");
const issuesHandler = require("./IssuesHandler");
const config = require("../config");
const IssueType = require("./IssueTypes");
const IssueEmbed = require("./IssueEmbed");

class Issue {
  constructor(client, message, content, type) {
    this.client = client;
    this.type = type;
    this.guild = message.guild;
    this.channel = message.channel;
    this.author = message.author;
    this.title = content.split("::")[0];
    this.content = content.split("::")[1];
  }

  setTitle(title) {
    this.title = title;
  }

  setContent(content) {
    this.content = content;
  }

  create() {
    // DONE: Add record into database -@ThisTNTSquid at 4/27/2018, 6:01:00 PM
    // TODO: Send it to the configured text channel -@ThisTNTSquid at 4/28/2018, 2:51:41 AM

    let channelId = this.guild.settings.get(
      IssueType.getDetail(this.type).settings_name
    );
    if (!channelId) {
      this.channel.send(
        `⚠ The issues channel is not yet set! Set it with \`${this.guild.settings.get(
          "prefix"
        )}setchannel\``
      );
      return;
    }

    issuesHandler.create(this).then(data => {
      this.client.channels
        .get(channelId)
        .send(
          new IssueEmbed(
            data.title,
            this.author,
            data.content,
            data.type,
            data.igid
          ).build()
        ).then(message=>{
          // link the message to the issue
          issuesHandler.linkMessage(message.id,data.gid)
        })
    });
  }
}

module.exports = Issue;
