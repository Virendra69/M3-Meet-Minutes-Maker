// Global error handling middleware
// Must have 4 parameters for Express to recognize it as an error handler
const errorHandler = (err, req, res, next) => {
  console.error("Unhandled error:", err.stack || err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";

  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};

module.exports = errorHandler;
