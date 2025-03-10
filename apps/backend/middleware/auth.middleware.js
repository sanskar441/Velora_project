// middleware/auth.middleware.js
const jwt = require("jsonwebtoken");

exports.authenticateUser = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ status: "error", message: "Unauthorized" });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ status: "error", message: "Invalid token" });
  }
};