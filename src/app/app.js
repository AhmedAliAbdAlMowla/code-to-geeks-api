const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");
const corsOptions = require("./config/cors");
const error = require("./middlewares/error");
const notfound = require("./middlewares/notFound");

// logger
app.use(logger("dev"));



// config
require("./config/config")();

require("express-async-errors"); // for error handeler async

//  parser middleware
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.static(__dirname + "/public"));
//  set view engine
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


// DB Config
require("./startup/db")();

// core
app.use(cors(corsOptions));


// Routes
require("./startup/routes")(app);

// error handler
app.use(error);

// not found handler
app.use(notfound);

// production
require("./startup/prod")(app);
module.exports = app;


//ghost_id