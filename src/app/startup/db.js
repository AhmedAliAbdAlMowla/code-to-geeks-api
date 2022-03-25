const mongoose = require("mongoose");
/**
 * @desc     Mongodb  connect
 */
module.exports = () => {
  mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,

    autoIndex: true, //make this also true
    
  });
  const db = mongoose.connection;
  db.on("error", (error) => console.log(error));
  db.once("open", () => console.log("Connected to Mongodb.."));
};