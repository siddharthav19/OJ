const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const userRouter = require("./routes/userRouter");
const problemsRouter = require("./routes/problemsRouter");
const compilerRouter = require("./routes/compilerRouter");

dotenv.config({
  path: "./config.env",
});

const DB_LINK = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected up & running"));

app.get("/", (req, res) => res.json({ message: "hello" }));
app.use("/api/user", userRouter);
app.use("/api/compiler", compilerRouter);
app.use("/api/problems", problemsRouter);

app.listen(3636, () => console.log("server at " + "http://localhost:3636/"));
