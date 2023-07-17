const jwt = require("jsonwebtoken");
const User = require("./../models/User");

const signToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_STRING, {
    expiresIn: "30d",
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = signToken(user._id);
    res.status(200).json({
      status: "successful",
      data: {
        name: user.name,
        mail: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(300).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};

const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.signup(name, email, password);
    const token = signToken(user._id);
    res.status(200).json({
      status: "successful",
      data: {
        name: user.name,
        mail: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(300).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};

module.exports = { signup, login };
