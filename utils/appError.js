class AppError extends Error {
  constructor(statusCode, msg) {
    super();
    this.status = statusCode;
    this.message = msg;
  }
}

module.exports = AppError;
