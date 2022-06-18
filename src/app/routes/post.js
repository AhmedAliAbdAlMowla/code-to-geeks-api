const router = require("express").Router();
const multer = require("../config/multer");
const postController = require("../controllers/post");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const author = require("../middlewares/author")

router.get("/", postController.get_all);
router.post("/", [auth, author], postController.create);
// upload cover image
router.post("/cover/image/:id", auth, multer.single("file"), postController.uploadCoverImage );
router.post("/cover/image/reset/:id", auth,postController.resetCoverImage);

router.patch("/:id", [auth, author], postController.update);
router.get("/id/:id", postController.get_one_by_id);
router.get("/:slug", postController.get_one_by_slug);
router.get("/tag/:tagId", postController.get_all_by_tag_id);
router.delete("/:id",  [auth, admin], postController.delete);

module.exports =router;