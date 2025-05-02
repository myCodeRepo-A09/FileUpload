const fs = require("fs");
const path = require("path");
const { ApiError } = require("../utils/helpers");

const streamFile = async (req, res, next) => {
  try {
    const filePath = req.params.filePath;
    /// Changed to catch all segments
    const fullPath = path.join(process.cwd(), "uploads", filePath);

    if (!fs.existsSync(fullPath)) {
      throw new ApiError(404, "File not found");
    }

    const stat = fs.statSync(fullPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = fs.createReadStream(fullPath, { start, end });
      const head = {
        "Content-Range": `bytes ${start}-${end}/${fileSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": chunksize,
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers": "Content-Range",
        "Cross-Origin-Resource-Policy": "cross-origin", // ✅ This is the fix
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "http://localhost:4200",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers": "Content-Range",
        "Cross-Origin-Resource-Policy": "cross-origin", // ✅ This is the fix
      };
      res.writeHead(200, head);
      fs.createReadStream(fullPath).pipe(res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  streamFile,
};
