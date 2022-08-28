"use strict"
const JWT = require("jsonwebtoken");

/**
 * @desc     validate token  middleware
 */
module.exports = (req, res, next) => {
    const token = req.header("x-auth-token");

    if (!token)
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
  
    try {
      const decoded = JWT.verify(token, process.env.JWT_PRIVATE_KEY);
 
      req.user = decoded;
      return res.status(200).json({})
    } catch (ex) {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  };