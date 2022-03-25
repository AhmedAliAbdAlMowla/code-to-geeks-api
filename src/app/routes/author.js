const router = require("express").Router();
const author_controller = require("../controllers/author");
const auth = require("../middlewares/auth");

router.post("/" , author_controller.create);
router.get("/", author_controller.get_all);
router.get("/:id", author_controller.get_one);
router.delete("/:id", author_controller.delete);
module.exports =router;