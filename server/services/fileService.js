const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const ApiError = require("../utils/helpers");

const writeFileAsync = promisify(fs.writeFile);
const unlinkAsync = promisify(fs.unlink);

const FileService = {
  ensureUploadDirExists: function () {
    this.uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  },

  saveFile: async function (file) {
    this.uploadDir = path.join(process.cwd(), "uploads");
    this.ensureUploadDirExists();

    try {
      const filePath = path.join(this.uploadDir, file.filename);
      console.log(filePath);
      //await writeFileAsync(filePath, file.buffer);
      return file.filename;
    } catch (error) {
      throw new ApiError(500, "Failed to save file");
    }
  },

  deleteFile: async function (filePath) {
    this.uploadDir = path.join(process.cwd(), "uploads");
    this.ensureUploadDirExists();
    try {
      const fullPath = path.join(this.uploadDir, filePath);
      if (fs.existsSync(fullPath)) {
        await unlinkAsync(fullPath);
      }
    } catch (error) {
      throw new ApiError(500, "Failed to delete file");
    }
  },
};

module.exports = FileService;
