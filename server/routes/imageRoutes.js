const express = require("express");
const router = express.Router();

router.use("/:filepath", async function (req, res) {
  const filepath = req.params.filepath;
  console.log(filepath);
  res.sendFile("E:/Projects/FileUpload/server/uploads/" + filepath);
});

module.exports = router;
