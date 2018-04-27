const Commando = require("discord.js-commando");

class TestCommand extends Commando.Command {
  constructor(client) {
    super(client, {
      name: "test",
      group: "misc",
      memberName: "test",
      description: "Just a testing command to add things up",
      examples: ["test 1 2 3"],
      args: [
        {
          key: "numbers",
          label: "number",
          prompt:
            "What numbers would you like to add? Every message you send will be interpreted as a single number.",
          type: "float",
          infinite: true
        }
      ]
    });
  }
  run(msg, args) {
    let result = 0;
    args.numbers.forEach(n => {
      result = result + n;
    });
    msg.channel.send(result);
  }
}

module.exports = TestCommand;
