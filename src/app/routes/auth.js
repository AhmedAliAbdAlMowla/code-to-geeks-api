"use strict"
const router = require("express").Router();
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");

// Signin 
router.post("/signin", authController.signIn);

// Signup 
router.post("/signup",authController.signup); 

// update user account password
router.patch("/password", auth,authController.updatePassword);

// Resend Confirmation Email
router.post("/resend/confirmation/email",authController.reSendConfirmationEmail); 

// Confirm new account endpoint
router.post("/account/confirm",authController.confirmNewAccount); 

//  Forgot Password
router.post("/account/recover",authController.recover);
router.post("/code/check",authController.checkCode);
router.post("/password/reset",authController.resetPassword);

//  Oauth
router.post("/google", authController.googleSignin)
module.exports = router;