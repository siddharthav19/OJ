const express = require("express");
const catchAsyncError = require("./../utils/catchAsyncError");
const problemsRouter = express.Router();

problemsRouter.route("/:id");

module.exports = problemsRouter;
