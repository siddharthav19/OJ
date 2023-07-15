const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A submission must be done by a user"],
    },
    problem: {
      type: mongoose.Schema.ObjectId,
      ref: "Problem",
      required: [true, "A submission Must Belong to a problem"],
    },
    submittedAt: {
      type: Date,
      default: Date.now(),
    },
    code: {
      type: String,
      required: true,
    },
    language: { type: String, required: true },
    verdict: {
      type: String,
      enum: ["AC", "WA", "RE"],
      required: [true, "You should provide the verdict"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Submission = mongoose.model("Submission", Schema);
module.exports = Submission;
