const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  givenInput: {
    type: String,
    required: [true, "Test case is required"],
  },
  correctOutput: {
    type: String,
    required: [true, "The correct output is required"],
  },
});

const TestCase = mongoose.model("TestCase", Schema);
module.exports = TestCase;
