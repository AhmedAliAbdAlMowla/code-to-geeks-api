const redis = require("redis");
let redisClient ;
/**
 * @desc    Handle redis connection
 * @type    function
 * @access  Public
 */
module.exports.connection = async () => {
  // create client
  const client =  redis.createClient({
    host: process.env.REDIS_HOST,
    no_ready_check: true,
    port: process.env.REDIS_PORT,
  });
  // connect with client
  await client.connect();
  // redis error listener
  client.on("error", (err) => console.log("Redis Client Error", err));
  // connection log
  console.log(
    `Connected successfully with Redis at : ${process.env.REDIS_HOST}`
  );

  redisClient = client;

};

module.exports.getClient = async () =>{
  return redisClient;
}