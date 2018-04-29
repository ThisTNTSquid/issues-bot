const Sequelize = require("sequelize");

/**
 * 
 * Class used to interact with database and handle operations on Issues
 * @class IssuesHandler
 */
class IssuesHandler {

  constructor(options) {
    this.sequelize = new Sequelize(options);
  }

  /**
   * 
   * Create a new issue
   * @param {Issue} issue 
   * @returns {Object} 
   * @memberof Datastore
   */
  create(issue) {
    console.log(issue)
    // return { 
    //   gid: gid, 
    //   type: type, 
    //   igid: igid,
    //   guildId:guildId }
  }

  /**
   * Replace an existing issue wiht a new issue. Usable for editing
   * @param {number} gid Global id of the issue
   * @param {Issue} issue New Issue object to replace the old one
   * @memberof Datastore
   */
  replace(gid, issue) {
    //some code
  }

  /**
   * 
   * Delete an issue with its global ID
   * @param {number} gid 
   * @memberof Datastore
   */
  delete(gid) {

  }

  /**
   * 
   * Get the Global ID of an issue with different parameters given
   * @param {number} guildId The ID of the guild
   * @param {number} igid Integer number of the issue within a guild
   * @param {any} type Type of the issue
   * @memberof Datastore
   */
  getGid(guildId,igid,type){
    // db query
  }

}
module.exports = IssuesHandler;
