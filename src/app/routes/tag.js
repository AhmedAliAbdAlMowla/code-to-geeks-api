const router = require("express").Router();
const tag_controller = require("../controllers/tag");
const auth = require("../middlewares/auth");

router.post("/", tag_controller.create);
router.get("/", tag_controller.get_all);
router.get("/:id", tag_controller.get_one);
router.delete("/:id", tag_controller.delete);

module.exports = router;