"use strict"
const router = require("express").Router();
const authController = require("../controllers/auth");
const auth = require("../middlewares/auth");

// Signin 
router.post("/signin", authController.signin);

// Signup 
router.post("/signup",authController.signup); 

// update user account password
router.patch("/password", auth,authController.updatePassword);

// Resend Confirmation Email
router.post("/resend/confirmation/email",authController.reSendConfirmationEmail); 

// Confirmation  webhook
router.get("/confirmation/:token",authController.confirmation); 

//  Forgot Password
router.post("/recover",authController.recover);
router.post("/token/check",authController.checkToken);
router.post("/password/reset",authController.resetPassword);


module.exports = router;