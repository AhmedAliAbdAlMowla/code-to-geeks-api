"use strict";
const router = require("express").Router();
const multer = require("../config/multer");
const accountController = require("../controllers/account");
const auth = require("../middlewares/auth");
const author = require("../middlewares/author");
const {
  updateValidator,
  uploadProfileImageValidator,
  createSocialLinkValidator,
} = require("../utils/validator/account");

// get account profile data
router.get("/", auth, accountController.getAccountData);

// update account profile data
router.patch("/", [auth, updateValidator], accountController.updateAccount);

// get account profile image
router.get("/profile/image", auth, accountController.getProfileImage);
// upload profile image
router.post(
  "/profile/image",
  [auth, multer.single("file"), uploadProfileImageValidator],
  accountController.uploadProfileImage
);

// get account interactions
router.get("/interactions", auth, accountController.getInteractions);

//                          A U T H O R
// get Social Link to author account profile data
router.get("/profile/social", [auth, author], accountController.getSocialLinks);
// add Social Link to author account profile data
router.post(
  "/profile/social",
  [auth, author, createSocialLinkValidator],
  accountController.createSocialLink
);
// get author account profile data
router.get(
  "/author/profile/:id",
  accountController.getAuthorAccountProfileData
);

module.exports = router;
