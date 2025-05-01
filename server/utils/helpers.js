// interface ErrorConstructor {
//     captureStackTrace(targetObject: Object, constructorOpt?: Function): void;
//   }
class ApiError extends Error {
  statusCode;
  isOperational;
  errors;
  constructor(statusCode, message, errors, isOperational = true) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.errors = errors;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message, errors) {
    return new ApiError(400, message, errors);
  }

  static unauthorized(message = "Unauthorized") {
    return new ApiError(401, message);
  }

  static forbidden(message = "Forbidden") {
    return new ApiError(403, message);
  }

  static notFound(message = "Not Found") {
    return new ApiError(404, message);
  }

  static internal(message = "Internal Server Error") {
    return new ApiError(500, message);
  }
}

module.exports = ApiError;
