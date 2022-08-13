let router = require("express").Router();
const auth = require("../middlewares/auth");
const admin = require("../middlewares/admin")
const systemController = require("../controllers/system");


//                        Logs  
// get all logs
router.get("/log",  systemController.getAllLogs);
//                         posts 
router.get("/post/slugs",systemController.getPostsSlugs)
module.exports = router;
