const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name cannot be empty"],
    },
    testCaseId: {
      type: mongoose.Schema.ObjectId,
      ref: "TestCase",
      required: [true, "A test case must be present for a problem"],
    },
    description: {
      type: String,
      required: [true, "A Problem Shoud have it's description"],
    },
    submissionsCount: {
      type: Number,
      default: 0,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: [
        true,
        "A problem Should have difficulty either Easy,Medium or Hard",
      ],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Schema.virtual("submissions", {
  ref: "Submission",
  foreignField: "problem",
  localField: "_id",
});

const Problem = mongoose.model("Problem", Schema);
module.exports = Problem;
