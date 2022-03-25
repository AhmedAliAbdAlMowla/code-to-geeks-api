const router = require("express").Router();
const post_controller = require("../controllers/post");
const auth = require("../middlewares/auth");

router.post("/",post_controller.create);
router.get("/", post_controller.get_all);
router.get("/:id", post_controller.get_one);
// router.get("/:slug", post_controller.get_one_by_slug);
router.delete("/:id",post_controller.delete);

module.exports =router;