const router = require("express").Router();
const post_controller = require("../controllers/post");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");

router.get("/", post_controller.get_all);
router.post("/", [auth, admin], post_controller.create);
router.patch("/:id", [auth, admin], post_controller.update);
router.get("/id/:id", post_controller.get_one_by_id);
router.get("/:slug", post_controller.get_one_by_slug);
router.get("/tag/:tagId", post_controller.get_all_by_tag_id);
router.delete("/:id",  [auth, admin], post_controller.delete);

module.exports =router;