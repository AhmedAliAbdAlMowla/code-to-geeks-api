"use strict"
const router = require("express").Router();
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");

// Signin 
router.post("/signin", authController.signIn);

// Signup 
router.post("/signup",authController.signup); 

// update user account password
router.patch("/password", auth,authController.changePassword);

// Resend Ver Email
router.post("/resend/verification/email",authController.reSendVerificationEmail); 


//  Forgot Password
router.post("/account/recover",authController.recover);
router.post("/code/check",authController.checkCode);
router.post("/password/reset",authController.resetPassword);

// account email verification 
router.post("/verification/:token",authController.emailVerification); 
//  Oauth
router.post("/google", authController.googleSignin)
module.exports = router;