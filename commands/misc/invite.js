const Commando = require('discord.js-commando')
const link = require('../../index').link
class AboutCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: 'invite',
      group: 'misc',
      memberName: 'invite',
      description: 'Obtain the invite link of the bot',
      examples: ['invite']
    })
  }

  async run(msg, args) {
    msg.channel.send(`Invite the bot to your serer with this link: ${link}`)
  }
}

module.exports = AboutCommand