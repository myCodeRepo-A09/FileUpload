const express = require("express");
const uploadController = require("../controllers/uploadController");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadMiddleware");
router.use("/", uploadMiddleware, uploadController.uploadFile);

module.exports = router;
