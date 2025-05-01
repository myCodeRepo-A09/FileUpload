const ApiError = require("../utils/helpers");
const config = require("../utils/config");

// Error middleware function
const errorMiddleware = (err, req, res, next) => {
  // Default error response
  const errorResponse = {
    status: "error",
    message: "Something went wrong",
  };

  let statusCode = 500;

  // Handle known ApiError
  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    errorResponse.message = err.message;

    // Include validation errors if available
    if (err.errors) {
      errorResponse.errors = err.errors;
    }
  }
  // Handle Mongoose validation errors
  else if (err.name === "ValidationError") {
    statusCode = 400;
    errorResponse.message = "Validation Error";
    errorResponse.errors = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
  }
  // Handle JWT errors
  else if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    errorResponse.message = "Invalid token";
  }
  // Handle Multer errors
  else if (err.name === "MulterError") {
    statusCode = 400;
    errorResponse.message = err.message;
  }
  // Handle other unexpected errors
  else {
    // In development, include the stack trace
    if (config.env === "development") {
      errorResponse.stack = err.stack;
    }

    // Log the full error in development
    console.error("Unexpected error:", err);
  }

  // Send the error response
  res.status(statusCode).json(errorResponse);
};

module.exports = errorMiddleware;
