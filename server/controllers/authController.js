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

const protectRoute = async (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];
  try {
    const { _id } = jwt.verify(token, process.env.SECRET_STRING);
    req.userId = await User.find({ _id }).select("_id");
    next();
  } catch (err) {
    res.status(404).json({
      error: err.message,
      message: "authorization required",
    });
  }
};

module.exports = { signup, login, protectRoute };
