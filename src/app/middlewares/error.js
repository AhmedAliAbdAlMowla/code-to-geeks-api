"use strict"
/**
 * @desc     error middleware
 */
module.exports =  (err, req, res, next) => {
  // console.log(err);
  res.status(400).json({
    message: err.message,
  });
  next();
};