const FileService = require("../services/fileService");
const ApiError = require("../utils/helpers");

//   private fileService: FileService;

//   constructor() {
//     this.fileService = new FileService();
//   }

const uploadFile = async function (req, res, next) {
  // (req, res, next);
  try {
    if (!req.file && !req.files) {
      throw new ApiError(400, "No file uploaded");
    }

    const filePath = await FileService.saveFile(req.file || req.files[0]);

    res.status(201).json({
      message: "File uploaded successfully",
      filePath: filePath,
    });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

module.exports = { uploadFile };
