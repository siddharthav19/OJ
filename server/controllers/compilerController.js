const getExecutedOutput = require("../utils/getExecutedOutput");
const generateFile = require("../utils/generateFile");

const compileCode = async (req, res, next) => {
  try {
    console.log(req.body);
    const { language, code } = req.body;
    const filePath = await generateFile(language, code);
    const output = await getExecutedOutput(language, filePath);
    res.json({
      status: "1",
      data: { output: output || "error", compilation: "succesful" },
    });
  } catch (error) {
    res.status(300).send({
      status: "0",
      data: { output: "error", compilation: "unsuccesful" },
    });
  }
};

exports.compileCode = compileCode;
