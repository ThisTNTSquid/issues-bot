const fs = require("fs");

class Logger {
  constructor() {
    if (!fs.existsSync(__dirname + "/../logs")) {
      fs.mkdirSync(__dirname + "/../logs");
    }
    let date = new Date();
    let timestring = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
    let filename = `${__dirname}/../logs/log-${timestring}.txt`;
    fs.writeFile(filename, timestring + "\n", () => {
      console.log("Logging started");
    });
    this.logStream = fs.createWriteStream(filename, { flag: "a" });
  }
  // methods for repetitive task
  sendToLog(text) {
    console.log(text);
    this.logStream.write(text, "utf-8");
  }

  info(msg) {
    // let date = new Date();
    // let timestring = `${date.getHours}:${date.getMinutes}:${date.getSeconds}`;
    this.sendToLog("[INFO] " + msg);
  }
  info(msg) {
    this.sendToLog("[WARN] " + msg);
  }
}

// Send the message out the console and log it
module.exports = Logger;
