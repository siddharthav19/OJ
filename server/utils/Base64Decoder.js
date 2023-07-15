const fs = require("fs");

async function decodeBase64DataToFile(base64Encoding, outputFile) {
  return new Promise((resolve, reject) => {
    const buffer = Buffer.from(base64Encoding, "base64");
    fs.writeFile(outputFile, buffer, (err) => {
      if (err) {
        return reject({
          name: err.name,
          cause: "error while decoding the buffer ",
          message: err.message,
        });
      }
      resolve();
    });
  });
}

module.exports = decodeBase64DataToFile;
