const Sequelize = require("sequelize");
const { issues_storage_location } = require("../config");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: issues_storage_location
});
sequelize.sync();

// Define tables in the database
const IssuesStore = sequelize.define("issues", {
  // guild ID
  guild: Sequelize.INTEGER,
  // IssueType Enum Number
  type: Sequelize.INTEGER,
  // In-Guild id of the issue/suggest based on the counter for each type of issues in the guilds table
  igid: Sequelize.INTEGER,

  title: Sequelize.STRING,
  content: Sequelize.STRING
});
const GuildsStore = sequelize.define("counters", {
  guild: Sequelize.INTEGER,
  issue_count: Sequelize.INTEGER
});
const IssueMessage = sequelize.define("issue_messages", {
  messageId: Sequelize.STRING
});
IssueMessage.belongsTo(IssuesStore, { foreignKey: "issueId" });

module.exports = {
  create(issue) {
    // console.log({
    //   ty: issue.type,
    //   ti: issue.title,
    //   co: issue.content,
    //   gid: issue.guild.id
    // });
    // Record it to the database

    return new Promise((resolve, reject) => {
      sequelize
        .query(
          `UPDATE counters SET issue_count=issue_count+1 WHERE guild=${
            issue.guild.id
          }`
        )
        .then(async () => {
          let inGuildIssueId = await GuildsStore.findOne({
            where: { guild: issue.guild.id },
            attributes: ["issue_count"]
          }).then(queryResult => {
            return queryResult.dataValues.issue_count;
          });
          // console.log(inGuildIssueId);

          let data = {
            guild: issue.guild.id,
            type: issue.type,
            igid: inGuildIssueId,
            title: issue.title,
            content: issue.content
          };
          IssuesStore.create(data)
            .then(result => {
              data.gid = result.dataValues.id;
              console.log(data);
              resolve(data);
            })
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });

    // send it to the channel

    // console.log(sequelize)
    // return {
    //   gid: gid,
    //   type: type,
    //   igid: igid,
    //   guildId:guildId }
  },

  replace(gid, issue) {
    //some code
  },

  delete(gid) {
    //something
  },

  getGid(guildId, igid, type) {
    // TODO: Tasks pending completion -@ThisTNTSquid at 5/1/2018, 7:01:57 PM
    // Get the Global ID of the issue
  },
  initGuild(guildId) {
    GuildsStore.findOrCreate({
      where: { guild: guildId },
      defaults: { issue_count: 0 }
    }).spread((guild, created) => {
      // console.log(guild);
      if (created) {
        console.log("counter record added");
      } else {
        console.error("counter cannot be added");
      }
    });
  },
  /**
   *
   * @param {StringResolvable} messageId Message ID
   * @param {*} issueGid Global ID of the issue
   */
  linkMessage(messageId, issueGid) {
    IssueMessage.create({
      messageId: messageId,
      issueId: issueGid
    });
  }
};
