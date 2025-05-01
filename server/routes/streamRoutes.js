const express = require("express");
const streamController = require("../controllers/streamController");
const router = express.Router();

router.use("/", streamController.streamFile);
module.exports = router;
