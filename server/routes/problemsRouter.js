const express = require("express");
const problemsController = require("./../controllers/problemsController");
const { protectRoute } = require("./../controllers/authController");
const { judgeCode } = require("../controllers/compilerController");
const problemsRouter = express.Router();

problemsRouter.get("/", problemsController.getAllProblems);
problemsRouter
  .route("/:id")
  .get(protectRoute, problemsController.getProblemById)
  .post(protectRoute, judgeCode);

module.exports = problemsRouter;
