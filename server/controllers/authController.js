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
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(404).json({
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
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: "unsuccessful",
      message: error.message,
    });
  }
};

const protectRoute = async (req, res, next) => {
  const { authorization } = req.headers;

  //if not starts with
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Login to Continue",
    });
  }
  const token = authorization.split(" ")[1];
  try {
    //verify jwt
    const { _id } = jwt.verify(token, process.env.SECRET_STRING);
    //verify user
    const user = await User.find({ _id });

    //user not exists
    if (!user) {
      return res.status(401).json({
        message: "Login to Continue",
      });
    }

    //user exists
    req.userId = user._id;
    next();
  } catch (err) {
    res.status(404).json({
      error: err.message,
      message: "authorization required",
    });
  }
};

module.exports = { signup, login, protectRoute };
