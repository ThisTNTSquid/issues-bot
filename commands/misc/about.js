const Commando= require('discord.js-commando')

class AboutCommand extends Commando.Command{
  constructor(client){
    super(client,{
      name: 'about',
      aliases: ['who','what'],
      group: 'misc',
      memberName: 'about',
      description: 'Returns some extra details about the bot',
      examples: ['about']
    })
  }

  async run(msg,args){
    msg.channel.send(msg.guild.settings.get("prefix"))
  }
}

module.exports=AboutCommand