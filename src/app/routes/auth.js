"use strict";
const router = require("express").Router();
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");
const {
  signInValidator,
  signupValidator,
  updateValidator,
  OauthSignupValidator,
  resetPasswordValidator,
  verificationCodeValidator,
} = require("../utils/validator/auth");

// Signin
router.post("/signin", [signInValidator], authController.signIn);

// Signup
router.post("/signup", [signupValidator], authController.signup);

// update user account password
router.patch("/password", [auth, updateValidator] , authController.changePassword);

// Resend Ver Email
router.post(
  "/resend/verification/email",
  [updateValidator],
  authController.reSendVerificationEmail
);

//  Forgot Password
router.post("/account/recover", [updateValidator], authController.recover);
router.post("/code/check", [verificationCodeValidator],authController.checkCode);
router.post("/password/reset", [resetPasswordValidator], authController.resetPassword);

// account email verification
router.post("/verification/:token", authController.emailVerification); // # no validator
//  Oauth
router.post("/google", [OauthSignupValidator], authController.googleSignin);
module.exports = router;
