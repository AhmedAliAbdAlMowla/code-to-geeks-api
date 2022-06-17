"use strict"
/**
 * @desc     error middleware
 */
module.exports =  (err, req, res, next) => {
  if (err.type === "database") 
       err.message = err.message;//.substring(0, 20) + "[ DB ERROE ]";
   
 return  res.status(400).json({
   
    message: err.message,
  });
  
};