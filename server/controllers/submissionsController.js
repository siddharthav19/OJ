const Submission = require("./../models/Submission");

const getAllSubmissions = async (req, res, next) => {
  const pId = req.params.id;
  const userId = req.userId;
  try {
    const submissions = await Submission.find({
      problem: pId,
      user: userId,
    }).select("id submittedAt language verdict -user -problem");
    res.status(200).json({
      result: submissions.length,
      submissions,
    });
  } catch (err) {
    res.status(404).json({
      err,     
    });
  }
};

const getSubmission = async (req, res, next) => {
  const pId = req.params.id;
  const userId = req.userId;
  const submission = req.params.submissionId;
  try {
    const problemSubmission = await Submission.findOne({
      problem: pId,
      user: userId,
      _id: submission,
    }).select("verdict code submittedAt");
    res.status(200).json({
      problemSubmission,
    });
  } catch (err) {}
};

module.exports = { getAllSubmissions, getSubmission };
