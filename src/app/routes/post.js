const router = require("express").Router();
const multer = require("../config/multer");
const post_controller = require("../controllers/post");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const author = require("../middlewares/author")

router.get("/", post_controller.get_all);
router.post("/", [auth, author], post_controller.create);
// upload cover image
router.post("/cover/image/:id", auth, multer.single("file"), post_controller.uploadCoverImage )
router.patch("/:id", [auth, author], post_controller.update);
router.get("/id/:id", post_controller.get_one_by_id);
router.get("/:slug", post_controller.get_one_by_slug);
router.get("/tag/:tagId", post_controller.get_all_by_tag_id);
router.delete("/:id",  [auth, admin], post_controller.delete);

module.exports =router;