const fs = require("fs");
const path = require("path");
const { v4: UUID } = require("uuid");
const curpath = path.join(__dirname, "inputCodes");

if (!fs.existsSync(curpath)) {
  fs.mkdirSync(curpath, { recursive: true });
}

const generateFile = async (language, code) => {
  const fileName = UUID() + "." + language;
  console.log(fileName);
  const filePath = path.join(curpath, fileName);
  await fs.promises.writeFile(filePath, code);
  return filePath;
};

module.exports = generateFile;
