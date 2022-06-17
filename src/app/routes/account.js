"use strict"
const router = require("express").Router();
const multer = require("../config/multer");
const accountController = require("../controllers/account");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author")

// // get user profile data
router.get("/", auth, accountController.getAccountData);

 // update user profile data
router.patch("/", auth, accountController.updateAccount);

// upload profile image
router.post("/profile/image", auth, multer.single("file"), accountController.uploadProfileImage )

 // get account profile image
router.get("/profile/image", auth,  accountController.getProfileImage);

// create Social Link 
router.post("/profile/social", [auth, author], accountController.createSocialLink);
router.get("/profile/social", [auth, author], accountController.getAllSocialLinks);
// author 
router.get("/author/profile/:id", accountController.getAuthorProfileData);


module.exports = router;