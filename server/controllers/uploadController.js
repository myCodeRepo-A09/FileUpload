const { uploadMiddleware } = require("../middlewares/uploadMiddleware");
const FileService = require("../services/fileService");
const { ApiError } = require("../utils/helpers");

//   private fileService: FileService;

//   constructor() {
//     this.fileService = new FileService();
//   }

const uploadFile = async function (req, res, next) {
  uploadMiddleware(req, res, next);
  try {
    if (!req.file) {
      throw new ApiError(400, "No file uploaded");
    }

    const filePath = await FileService.saveFile(req.file);

    res.status(201).json({
      message: "File uploaded successfully",
      filePath: filePath,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile };
