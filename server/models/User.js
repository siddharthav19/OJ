const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "mod"],
      default: "user",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

Schema.virtual("submissions", {
  ref: "Submission",
  foreignField: "user",
  localField: "_id",
});

Schema.statics.signup = async function (name, email, password) {
  if (!email || !password)
    throw new Error("email and password is required and cannot be empty");
  if (!validator.isEmail(email)) throw new Error("email is not valid");
  const exists = await this.findOne({ email });
  if (exists) throw new Error("user already exists with the given email");
  const hashedPassword = await bcrypt.hash(password, 11);
  const user = await this.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });
  return user;
};

Schema.statics.login = async function (email, password) {
  if (!email || !password)
    throw new Error("email and password cannot be empty");
  const user = await this.findOne({ email });
  if (!user) throw new Error("user does not exists with given email");
  const result = await bcrypt.compare(password, user.password);
  if (!result) throw new Error("incorrect password");
  return user;
};

const User = mongoose.model("User", Schema);
module.exports = User;
