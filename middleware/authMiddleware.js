const jwt = require("jsonwebtoken");
const logExceptionToDb = require("../utils/logExceptionToDb");

const authMiddleware = async (req, res, next) => {
  console.log(req.cookies);
  const token = req.cookies.authToken;
  console.log("Token: ", token);

  if (!token) {
    const logData = {
      exception_message: " token provided.",
      source: "authMiddleware",
      severity: "WARNING",
    };

    try {
      await logExceptionToDb(logData);
    } catch (err) {
      console.error("Failed to log exception:", err);
    }

    return res.status(401).send({ message: "token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    const logData = {
      exception_message: err.message,
      exception_stacktrace: err.stack,
      source: "authMiddleware",
      severity: err.name === "TokenExpiredError" ? "INFO" : "ERROR",
    };

    try {
      await logExceptionToDb(logData);
    } catch (loggingError) {
      console.error("Failed to log exception:", loggingError);
    }

    if (err.name === "TokenExpiredError") {
      return res.status(403).json({ message: "Token has expired." });
    } else {
      return res.status(403).json({ message: "Invalid or expired token." });
    }
  }
};

module.exports = authMiddleware;
