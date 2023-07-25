const express = require("express");
const problemsController = require("./../controllers/problemsController");
const { protectRoute } = require("./../controllers/authController");
const { judgeCode } = require("../controllers/compilerController");
const submissionRouter = require("./submissionRouter");
const problemsRouter = express.Router();

//problems/:id/submissions
//problems/:id/submissions/:submissionId
problemsRouter.use("/:id/submissions", submissionRouter);
problemsRouter.get("/", problemsController.getAllProblems);
problemsRouter
  .route("/:id")
  .get(protectRoute, problemsController.getProblemById)
  .post(protectRoute, judgeCode);

module.exports = problemsRouter;
