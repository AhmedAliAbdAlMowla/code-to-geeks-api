"use strict";
/**
 * @desc     Rate limte middleware
 */

const rediConnection = require("../startup/redis");

module.exports = async (req, res, next) => {

  const redis = await rediConnection.getClient();
  const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress
  ).slice(0, 9);

  const requests = await redis.INCR(ip);

  if (requests === 1) {
    await redis.expire(ip, process.env.SECONDS_WINDOW);
  }
  if (requests > process.env.ALLOWED_HITS) {
    return res.status(429).json({
      message: " Too many requests.",
    });
  }
  console.log("Request coming from ip :", ip);
  next();
};
