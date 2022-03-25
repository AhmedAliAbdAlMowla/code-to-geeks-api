module.exports = (app) => {
    // Routes
    app.use("/api/v1/pages/", require("../routes/pages"));
    app.use("/api/v1/account",require("../routes/account"));
    app.use("/api/v1/post",require("../routes/post"));
    app.use("/api/v1/author",require("../routes/author"));
    app.use("/api/v1/tag",require("../routes/tag"));
    app.get("/", (req, res) => {
      res.status(200).send(" CODE TO GEEKS API V1 is running now....");
    });
    
  };