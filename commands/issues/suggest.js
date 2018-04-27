const DiscordJS = require("discord.js");
const Commando = require("discord.js-commando");
const issue = require('../../src/Issue')

class SuggestCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "suggest",
      group: "issues",
      memberName: "suggest",
      description: "Create a suggestion",
      examples: [
        "suggest Title Of Suggestion :: This is the content of the example suggestion"
      ],
      args: [
        {
          key: "suggestion",
          prompt:
            "Please enter your suggestions in the format of ```Suggestion Title :: Suggestion Content```",
          type: "string"
        }
      ]
    });
  }
  async run(msg, args) {
    
  }
}
module.exports = SuggestCommand;
