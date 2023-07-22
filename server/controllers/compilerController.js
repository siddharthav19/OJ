const fs = require("fs");
const Problem = require("./../models/Problem");
const Submission = require("./../models/Submission");
const TestCase = require("./../models/TestCase");
const encodeFile = require("./../utils/Base64Encoder");
const generateFile = require("../utils/generateFile");
const getExecutedOutput = require("./../utils/getExecutedOutput");
const path = require("path");
const os = require("os");
const decodeBase64DataToFile = require("../utils/Base64Decoder");

console.log(os.platform());

const curPath = __dirname;
const inputPath = path.join(curPath, "in.txt");
const outputPath = path.join(curPath, "out.txt");
const expectedOutputFile = path.join(curPath, "expectedOut.txt");
const cppJUDGE = path.join(curPath, "Main.cpp");
const pyJUDGE = path.join(curPath, "Main.py");
const javaJUDGE = path.join(curPath, "Main.java");

if (!fs.existsSync(cppJUDGE)) {
  fs.writeFileSync(cppJUDGE, "");
}

if (!fs.existsSync(pyJUDGE)) {
  fs.writeFileSync(pyJUDGE, "");
}

if (!fs.existsSync(javaJUDGE)) {
  fs.writeFileSync(javaJUDGE, "");
}

const normalizeLineEndings = (text) => {
  return text.replace(/\r\n/g, "\n");
};

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

async function compareFiles(file1, file2) {
  try {
    const content1 = normalizeLineEndings(await readFile(file1));
    const content2 = normalizeLineEndings(await readFile(file2));

    await fs.promises.writeFile(file1, "");
    await fs.promises.writeFile(file2, "");
    return content1 == content2;
  } catch (error) {
    throw new Error("Error reading files or files are not the same.");
  }
}
const compileCode = async (req, res, next) => {
  try {
    const { language, code, input, checkingPath = "", evalType } = req.body;
    await fs.promises.writeFile(inputPath, input);
    const filePath = await generateFile(language, code);
    await getExecutedOutput(language, filePath, inputPath, outputPath);
    const data = (await fs.promises.readFile(outputPath)).toString();
    res.json({
      status: "1",
      data: { output: data, compilation: "succesful" },
    });
  } catch (error) {
    res.status(404).send({
      status: "0",
      data: {
        compilation: "unsuccesful",
        output: "error",
        message: error.message || error,
      },
    });
  }
};

const judgeCode = async (req, res, next) => {
  const problemId = req.params.id;
  const userId = req.userId;
  const { language, code } = req.body;
  try {
    // input, expectedOutput
    const problem = await Problem.findById(problemId).populate("testCaseId");
    const { givenInput, correctOutput } = problem.testCaseId;
    await decodeBase64DataToFile(givenInput, inputPath);
    await decodeBase64DataToFile(correctOutput, expectedOutputFile);
    let fileName = "";
    if (language === "py") fileName = pyJUDGE;
    if (language === "cpp") fileName = cppJUDGE;
    if (language === "java") fileName = javaJUDGE;
    await fs.promises.writeFile(fileName, code);
    await getExecutedOutput(language, fileName, inputPath, outputPath);
    const result = await compareFiles(expectedOutputFile, outputPath);
    await fs.promises.writeFile(inputPath, "");
    problem.submissionsCount += 1;
    await problem.save();
    const state = result ? "ACCEPTED" : "WRONG ANSWER";
    await Submission.create({
      code,
      language,
      user: userId,
      problem: problemId,
      verdict: state,
    });
    console.log(state);
    res.status(200).json({
      status: state,
    });
  } catch (err) {
    await Submission.create({
      code,
      language,
      user: userId,
      problem: problemId,
      verdict: "ERROR",
    });
    res.status(404).json({
      status: "ERROR",
      message: err.message,
    });
  }
};

exports.compileCode = compileCode;
exports.judgeCode = judgeCode;
