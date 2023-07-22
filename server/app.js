const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const userRouter = require("./routes/userRouter");
const problemsRouter = require("./routes/problemsRouter");
const compilerRouter = require("./routes/compilerRouter");
var bodyParser = require("body-parser");

dotenv.config({
  path: "./config.env",
});

const DB_LINK = process.env.MONGODB_URI;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

console.log("xyz");
mongoose
  .connect(DB_LINK, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB connected up & running"));

app.use("/api/user", userRouter);
app.use("/api/compiler", compilerRouter);
app.use("/api/problems", problemsRouter);

app.listen(3036, () => console.log("server at " + "http://localhost:3036/"));
