const fs = require("fs");
const zlib = require("zlib");
const glob = require("glob");
const path = require("path");
const config = require("../../config");
class Logger {
  constructor(logFolder) {
    // gzip previous logs
    let gzip = zlib.createGzip()
    glob(path.join(logFolder, "*.log"), (err, files) => {
      files.forEach(f => {
        let r = fs.createReadStream(f);
        let w = fs.createWriteStream(f+".gz")
        r.pipe(gzip).pipe(w)
        fs.unlink(f,err=>{
          if (err) console.error(err)
        })
      });
    });
    if (!fs.existsSync(logFolder)) {
      fs.mkdirSync(logFolder);
    }
    let date = new Date();
    let timestring = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}-${date.getHours()}h${date.getMinutes()}m${date.getSeconds()}s`;
    let filename = `${logFolder}/${timestring}.log`;
    fs.writeFile(filename, timestring + "\n", () => {
      console.log(">>>>> Logger started");
    });
    this.logStream = fs.createWriteStream(filename, { flag: "a" });
  }
  info(msg) {
    let date = new Date();
    let displayText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [INFO] ${msg}`;

    this.logStream.write(displayText + "\n", "utf-8");
    console.log(displayText);
  }
  warning(msg) {
    let date = new Date();
    let displayText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [WARN] ${msg}`;

    this.logStream.write(displayText + "\n", "utf-8");
    console.log(displayText);
  }
  debug(msg) {
    if (config.debug) {
      let date = new Date();
      let displayText = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} [INFO] ${msg}`;
      this.logStream.write(displayText + "\n", "utf-8");
      console.log(displayText);
    } else return;
  }
}
module.exports = Logger;
