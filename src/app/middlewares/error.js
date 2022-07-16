"use strict"
const {log} = require("../services/logger")
/**
 * @desc     error middleware
 */
module.exports = async(err, req, res, next) => {

const logPath = req.method +"  -> "+req.protocol+"://"+req.get('host')+req.originalUrl;
await log(0, logPath,  err.message);

  if (err.type === "database") 
       err.message = err.message;//.substring(0, 20) + "[ DB ERROE ]";
   
 return  res.status(400).json({
    message: err.message,
  });
  
};