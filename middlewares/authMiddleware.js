const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - No token provided",
            error: "Access denied"
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.doctor = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized - Invalid token",
            error: error.message
        });
    }
};

module.exports = { protect };
