const Sequelize = require("sequelize");
sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../data.db"
});

module.exports = {
  create(issue) {
    console.log(issue);
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
  }
};
