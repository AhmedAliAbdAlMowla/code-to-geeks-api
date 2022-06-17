"use strict"
/**
 * @desc     Auth author middleware
 */
module.exports = (req, res, next) => {
  if (req.user.role !== "author" && req.user.role !== "admin") // moderator have all author methods
    return res.status(403).json({
      message: "Access denied.",
    });
  next();
};