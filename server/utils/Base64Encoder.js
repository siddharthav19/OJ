const fs = require("fs");

async function encodeFileBase64(fileLocation) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileLocation, (err, data) => {
      if (err) {
        reject({
          name: err.name,
          cause: "",
          message: err.message,
        });
        return;
      }
      const Base64Data = Buffer.from(data).toString("base64");
      resolve(Base64Data);
    });
  });
}

module.exports = encodeFileBase64;
