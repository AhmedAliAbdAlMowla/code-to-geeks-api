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

// swagger
require("./startup/swagger")(app);

require("express-async-errors"); // for error handeler async

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