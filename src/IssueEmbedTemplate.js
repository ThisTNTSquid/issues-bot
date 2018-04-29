const DiscordJS = require('discord.js')
class IssueEmbedTemplate{
  constructor(title,author,content,type){
    
  }

  build(){
    return DiscordJS.RichEmbed()
  }
}
module.exports=IssueEmbedTemplate