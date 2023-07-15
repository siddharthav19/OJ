const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const curpath = path.join(__dirname, "outputs");

if (!fs.existsSync(curpath)) {
  fs.mkdirSync(curpath, { recursive: true });
}

const getExecutedOutput = async (language, filePath) => {
  let executableCode = path.basename(filePath).split(".")[0];
  let executableCodePath = "";
  let command = "";
  if (language == "cpp") {
    executableCode += ".exe";
    executableCodePath = path.join(curpath, executableCode);
    command = `g++ ${filePath} -o ${executableCodePath} && cd ${curpath} && .\\${executableCode}`;
  }

  if (language == "py") {
    command = `py ${filePath}`;
  }

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      if (err)
        return reject({
          message:
            language == "cpp"
              ? stderr.match(/error:(.*)/)?.[1]?.trim()
              : stderr
                  .split("." + language)[1]
                  .replace("<module>", "current code")
                  .trim(),
          fullmessage: stderr,
          //   .split("." + language)[1]
          //   .replace("<module>", "current code"),
        });
      if (stderr) return reject({ message: stderr, err });
      resolve(stdout);
    });
  });
};

module.exports = getExecutedOutput;
