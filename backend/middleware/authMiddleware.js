const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;


  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
   

      req.user = await User.findById(decoded.user._id).select("-password");
      next();
    } catch (error) {
      console.error("token not found", error);
      res.status(401).json({ message: "token not found" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};


// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};

module.exports = { protect, isAdmin };
