const DiscordJS = require("discord.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize("data", null, null, {
  dialect: "sqlite",
  storage: "../data.db"
});
class Issue {
  /**
   * Construct the Issue Object
   * @param {CommandoGuild} guild - Commando Guild object from the message
   * @param {string} type - Type of the issue, either "issue" or "suggest"
   * @param {string} content - Content of the message
   */
  constructor(channel, type, content) {
    this.channel = channel;
    this.type = type;
    this.guild = channel.guild;
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
    // TODO: Add record into database -@ThisTNTSquid at 4/27/2018, 6:01:00 PM
    // Send it to the configured text channel
    let channel = this.guild.settings.get("issues_channel");
    if (!channel) {
      this.channel.send(
        `The issues channel is not yet set! Set it with ${this.guild.settings.get(
          "prefix"
        )}setchannel`
      );
    }
    // Record it to the database
  }
  modify(id) {
    // TODO: Issue modification -@ThisTNTSquid at 4/27/2018, 6:02:29 PM
    // edit the record in database
    // edit the message
  }
  delete() {}
}
module.exports = Issue;
