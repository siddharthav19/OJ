const express = require("express");
const { protectRoute } = require("./../controllers/authController");

const compilerController = require("../controllers/compilerController");
const router = express.Router();

router.post("/", compilerController.compileCode);
router.post("/judge", protectRoute, compilerController.judgeCode);

module.exports = router;
