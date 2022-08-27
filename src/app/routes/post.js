const router = require("express").Router();
const multer = require("../config/multer");
const postController = require("../controllers/post");
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin");
const author = require("../middlewares/author")
const {cash, flush}= require("../middlewares/cash");

const {createValidator, updateValidator,uploadCoverImageValidator} = require("../utils/validator/post");
router.get("/", [cash], postController.get_all);
router.post("/", [auth, author, createValidator,flush], postController.create);
// upload cover image
router.post("/cover/image/:id", [auth, multer.single("file"), uploadCoverImageValidator,flush], postController.uploadCoverImage );
router.post("/cover/image/reset/:id", [auth,flush],postController.resetCoverImage);

// love post 
router.post("/love/:id", auth,postController.love);
router.post("/unlove/:id", auth,postController.unLove);
// get all saved posts
router.get("/save", auth,  postController.getAllSavedPosts);
// save post 
router.post("/save/:id",auth, postController.savePost );
// un saved post 
router.post("/unsave/:id", auth, postController.unSavePost);

router.patch("/:id", [auth, author,updateValidator,flush], postController.update);
router.get("/id/:id", postController.get_one_by_id);
router.get("/:slug", postController.get_one_by_slug);
router.get("/tag/:tagId", postController.get_all_by_tag_id);
router.delete("/:id",  [auth, admin,flush], postController.delete);


module.exports =router;