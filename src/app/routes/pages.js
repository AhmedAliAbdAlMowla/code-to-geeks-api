const router = require("express").Router();

router.get("/", async (req, res) =>{

    res.render("dashboard.ejs");
});

router.get("/post", async (req, res) =>{

    res.render("post.ejs");
});

router.get("/tag", async (req, res) =>{

    res.render("tag.ejs");
});
router.get("/author", async (req, res) =>{

    res.render("author.ejs");
});

router.get("/image", async (req, res) =>{

    res.render("image.ejs");
});

router.get("/post/create", async (req, res) =>{

    res.render("createPost.ejs");
});
router.get("/post/view", async (req, res) =>{

    res.render("viewPost.ejs");
});
module.exports = router;