const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../../docs/swagger");

module.exports = (app) => {
if (process.env.NODE_ENV.trim() === "development")
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }