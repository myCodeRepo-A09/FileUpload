const express = require("express");
const uploadController = require("../controllers/uploadController");
const router = express.Router();

router.use("/", uploadController.uploadFile);
module.exports = router;
