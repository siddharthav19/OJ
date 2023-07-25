const Submission = require("./../models/Submission");

const getAllSubmissions = async (req, res, next) => {
  const userId = req.userId;
  try {
    const submissions = await Submission.find({
      user: userId,
    }).select("id submittedAt language verdict");
    res.status(200).json({
      submissions,
    });
  } catch (err) {
    res.status(404).json({
      err,
    });
  }
};

const getSubmission = async (req, res, next) => {
  const userId = req.userId;
  const submission = req.params.submissionId;
  try {
    const problemSubmission = await Submission.findOne({
      user: userId,
      _id: submission,
    }).select("verdict code submittedAt");

    res.status(200).json({
      problemSubmission,
    });
  } catch (err) {}
};

module.exports = { getAllSubmissions, getSubmission };
