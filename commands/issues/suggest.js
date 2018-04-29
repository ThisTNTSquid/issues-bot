const DiscordJS = require("discord.js");
const Commando = require("discord.js-commando");
const Issue = require("../../src/Issue");
const IssueTypes=require('../../src/IssueTypes')

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
          key: "content",
          prompt:
            "Please enter your suggestions in the format of ```Suggestion Title :: Suggestion Content```",
          type: "string"
        }
      ]
    });
  }
  async run(msg, { content }) {
    // TODO: Creating Suggestion -@ThisTNTSquid at 4/28/2018, 2:51:08 AM
    //
    let post = new Issue(msg, content, IssueTypes.SUGGESTION).create()
  }
}
module.exports = SuggestCommand;
