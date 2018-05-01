const DiscordJS = require("discord.js");
const IssueTypes = require("./IssueTypes");
class IssueEmbed {
  constructor(title, author, content, type, igid) {
    this.title = title;
    this.author = author;
    this.content = content;
    this.type = type;
    this.igid = igid;
  }

  build() {
    let embed = new DiscordJS.RichEmbed()
      .setAuthor(
        `Issue #${this.igid} - ${IssueTypes.getDetail(this.type).name}`,
        IssueTypes.getDetail(this.type).image
      )
      .setTitle(this.title)
      .setDescription(this.content)
      .setFooter(this.author.username, this.author.avatarURL)
      .setTimestamp();
    return embed;
  }
}
module.exports = IssueEmbed;
