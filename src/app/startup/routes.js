module.exports = (app) => {
    // Routes
    app.use("/v1/auth", require("../routes/auth"));
    app.use("/v1/account", require("../routes/account"));
    app.use("/v1/post", require("../routes/post"));
    app.use("/v1/tag", require("../routes/tag"));
    app.use("/v1/file", require("../routes/file"));
    app.use("/v1/sys", require("../routes/system"));
    app.get("/", (req, res) => {
      res.status(200).send(" CODE TO GEEKS API V1 is running now....");
    });
    
  };
