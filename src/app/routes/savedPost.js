let router = require("express").Router();
const auth = require("../middlewares/auth");
const savedPostController = require("../controllers/savedPost");


// upload profile image
router.post("/",auth, savedPostController.create );
// get all saved posts
router.get("/", auth,  savedPostController.getAll);
// delete saved post 
router.delete("/:id", auth, savedPostController.delete);
module.exports = router;
