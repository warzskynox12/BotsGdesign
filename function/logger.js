const fs = require("fs");
const formatted = require("../js/txt.js");
const path = require("path");

function logger() {
  const logFolder = path.join(__dirname, "../logs");
  const logFileName = `logs_${formatted.formattedTime}.txt`;
  const logFilePath = path.join(logFolder, logFileName);

  if (!fs.existsSync(logFolder)) {
    fs.mkdirSync(logFolder);
  }

  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

  console.log = (...args) => {
    const logMessage = args.join(" ");
    logStream.write(`${logMessage}\n`);
    process.stdout.write(`${logMessage}\n`);
  };

  const { heure } = require("../js/heure.js");
  const formattedTime = heure();
  console.log(
    `       ####################### logs du ${formattedTime} du bot discord Gdesign #######################`
  );
  console.log(
    `       ####                                                                                          ####`
  );
  console.log(
    `       ####                                                                                          ####`
  );
  console.log(
    `       ##################################################################################################`
  );
  console.log("    ");
}

module.exports = {
  logger,
};
