const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const uploadRoute = require("./routes/uploadRoutes");
const streamRoute = require("./routes/streamRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const config = require("../server/utils/config");
const app = express();
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use("/api/upload", uploadRoute);
app.use("/api/stream", streamRoute);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.use(errorMiddleware);

module.exports = { app };
