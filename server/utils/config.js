const dotenv = require("dotenv");

dotenv.config();

// interface Config {
//   env: string;
//   port: number;
//   uploadLimit: string;
// }

const config = {
  env: process.env.NODE_ENV || "development",
  port: parseInt(process.env.PORT || "3000", 10),
  uploadLimit: process.env.UPLOAD_LIMIT || "100mb",
};

module.exports = config;
