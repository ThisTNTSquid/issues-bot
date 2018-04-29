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
  suggestion_count: Sequelize.INTEGER,
  issue_count: Sequelize.INTEGER
});

module.exports = {
  create(issue) {
    console.log({
      ty: issue.type,
      ti: issue.title,
      co: issue.content
    });

    // Create a record in database

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
    // db query
  },
  initGuild(guildId) {
    GuildsStore.findOrCreate({
      where: { guild: guildId },
      defaults: { suggestion_count: 0, issue_count: 0 }
    }).spread((guild, created) => {
      // console.log(guild);
      if (created) {
        console.log("counter record added");
      } else {
        console.error("counter cannot be added");
      }
    });
  }
};
