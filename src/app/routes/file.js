let router = require("express").Router();
const multer = require("../config/multer");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author")
const fileController = require("../controllers/file");
const {updateValidator} = require("../utils/validator/file");
// upload profile image
router.post("/",auth, multer.single("file"), fileController.upload );
// get files
router.get("/", auth,  fileController.get_all);
// get one file 
router.get("/:id", auth, fileController.get_one);
// update file name
router.patch("/:id", [auth, updateValidator], fileController.update);
// delete file 
router.delete("/:id", auth, fileController.delete);
module.exports = router;
