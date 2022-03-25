const router = require("express").Router();
const account_controller = require("../controllers/account");
router.post("/login", account_controller.login);


module.exports =router;