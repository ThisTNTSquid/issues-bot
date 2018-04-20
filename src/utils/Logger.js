const fs = require("fs");
const config = require("../../config");
class Logger {
  constructor(logFolder) {
    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);
    }
    let date = new Date();
    let timestring = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
    let filename = `${logFolder}/log-${timestring}.txt`;
    fs.writeFile(filename, timestring + "\n", () => {
      console.log(">>>>> Logger started");
    });
    this.logStream = fs.createWriteStream(filename, { flag: "a" });
  }
  info(msg) {
    let date = new Date();
    let displayText = `${date.getHours()}:${date.getMinutes()}:${
      date.getSeconds()
    } [INFO] ${msg}`;
    this.logStream.write(displayText+"\n", "utf-8");
    console.log(displayText);
  }
  warning(msg) {
    //todo Warning log
  }
  debug(msg) {
    if (config.debug) {
      let date = new Date();
      let displayText = `${date.getHours()}:${date.getMinutes()}:${
        date.getSeconds()
      } [INFO] ${msg}`;
      this.logStream.write(displayText+"\n", "utf-8");
      console.log(displayText);
    }
  }
}
module.exports = Logger;
