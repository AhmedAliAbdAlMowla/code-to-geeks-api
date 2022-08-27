const redisConnection = require("../startup/redis");

module.exports.cash = async (req, res, next) => {
  const redis = await redisConnection.getClient();
  const path = req.originalUrl.split("v1")[1];

  const hashTable = path.split("/")[1];
  req.redisHashTable = hashTable;
  req.redisHashTablePath = path;
  let result = await redis.hGet(hashTable, path);
  if (result === null) return next();

  res.status(200).json(JSON.parse(result));
};

module.exports.flush = async (req, res, next) => {

  const redis = await redisConnection.getClient();
  const path = req.originalUrl.split("v1")[1];

  const hashTable = path.split("/")[1];

  await redis.del(hashTable);

  next();
};
