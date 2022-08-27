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

//  parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// rate limiter
app.use(require("./middlewares/rateLimiter"));
// swagger
require("./startup/swagger")(app);

// Redis connection 
require("./startup/redis").connection();
require("express-async-errors"); // for error handeler async

// DB Backup
require("./startup/cronJob")();
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