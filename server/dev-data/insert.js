const mongoose = require("mongoose");
const data = require("./problems");
const Problem = require("./../models/Problem");
const TestCase = require("./../models/TestCase");

const runner = async () => {
  const arr = [];
  data.forEach((e) => {
    arr.push({ givenInput: e.input, correctOutput: e.output });
  });
  const tests = await TestCase.create(arr);
  const promisePool = [];
  for (let i = 0; i < arr.length; i++) {
    const _id = tests[i]._id;
    const { description, name, difficulty } = data[i];
    const x = { description, name, difficulty, testCaseId: _id };
    promisePool.push(Problem.create(x));
  }
  await Promise.all(promisePool);
};

mongoose
  .connect(
    "mongodb+srv://siddharthavadlapudi3738:BGp06iD9xZHPvT02@cluster0.hgihajs.mongodb.net/OJ_MAIN?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("DB connected up & running");
    runner()
      .then(() => console.log("done"))
      .catch((e) => console.log(e));
  });
