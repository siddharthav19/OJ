const express = require("express");
const TestCase = require("./../models/TestCase");
const problemsController = require("./../controllers/problemsController");
const { protectRoute } = require("./../controllers/authController");
const problemsRouter = express.Router();

problemsRouter.get("/", problemsController.getAllProblems);
problemsRouter.get("/:id", protectRoute, problemsController.getProblemById);

module.exports = problemsRouter;
