const multer = require("multer");
const path = require("path");
const ApiError = require("../utils/helpers");

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, "../uploads");
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif|mp4|mov|avi|mkv/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new ApiError(400, "Error: Only images and videos are allowed!"));
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 100, // 100MB limit
  },
  fileFilter: fileFilter,
}).array("file", 5);

// Middleware function
const uploadMiddleware = (req, res, next) => {
  upload(req, res, (err) => {
    console.log(req.file);
    if (err) {
      console.log(err);
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(
            new ApiError(400, "File size is too large. Maximum 100MB allowed.")
          );
        }
        return next(new ApiError(400, err.message));
      } else if (err) {
        return next(err);
      }
    }
    next();
  });
};

module.exports = uploadMiddleware;
