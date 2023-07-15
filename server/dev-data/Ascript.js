const fs = require("fs");
const path = require("path");

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

(async () => {
  const res = await encodeFileBase64(path.join(__dirname, "output.txt"));
  await fs.promises.writeFile(path.join(__dirname, "base64out.txt"), res);
})();
