const express = require("express");
const streamController = require("../controllers/streamController");
const router = express.Router();

router.use("/:filePath", streamController.streamFile);
module.exports = router;
