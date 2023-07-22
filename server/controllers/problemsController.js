const { setDefaultResultOrder } = require("dns");
setDefaultResultOrder("ipv4first");
const Submission = require("./../models/Submission");
const Problem = require("../models/Problem");
const { default: axios } = require("axios");

const getAllProblems = async (req, res, next) => {
  try {
    const problems = await Problem.find({}).select(
      "difficulty name submissionsCount"
    );
    console.log(req.userId);
    res.status(200).json({
      status: "successful",
      result: {
        problems,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "unsuccessful",
      message: err.message,
    });
  }
};

const getProblemById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const problem = await Problem.findOne({ _id: id });
    res.status(200).json({
      status: "successful",
      result: {
        problem,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};

module.exports = { getAllProblems, getProblemById };
