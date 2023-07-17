const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    givenInput: {
      type: String,
      required: [true, "Test case is required"],
    },
    correctOutput: {
      type: String,
      required: [true, "The correct output is required"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const TestCase = mongoose.model("TestCase", Schema);
module.exports = TestCase;
