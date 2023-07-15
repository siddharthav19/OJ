const express = require("express");
const { compileCode: compiler } = require("../controllers/compilerController");
const router = express.Router();

router.post("/", compiler);

module.exports = router;
