const { protectRoute } = require("../controllers/authController");
const {
  getAllSubmissions,
  getSubmission,
} = require("../controllers/submissionsController");
const submissionRouter = require("express").Router({ mergeParams: true });

submissionRouter.get("/:submissionId", protectRoute, getSubmission);
submissionRouter.get("/", protectRoute, getAllSubmissions);

module.exports = submissionRouter;
