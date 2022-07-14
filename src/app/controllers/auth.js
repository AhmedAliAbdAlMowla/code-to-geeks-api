"use strict";
const authValidator = require("../utils/validator/auth");
const dbConnection = require("../db/connection");
const authSqlQuery = require("../db/queries/auth").queryList;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const Constants = require("../config/constants");
const Email = require("../services/email");
const verificationEmailTemplate = require("../utils/assets/templates/verificationEmail");
const forgetPasswordEmailTemplet = require("../utils/assets/templates/forgetPassword");

/**
 * @desc    signin account
 * @route   POST /api/v1/auth/signin
 * @access  Public
 */
exports.signIn = async (req, res) => {
  const requestData = req.body;
  const { error } = authValidator.signInValidator(requestData);

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/\"/g,'') });

  let account = await dbConnection.query(authSqlQuery.GET_DATA_FOR_SIGNIN, [
    requestData.email,
  ]);

  account = account.rows[0];

  if (!account)
    return res.status(400).json({ message: "Invalid email or password." });

  //   check if the account is confirmed
  if (!account.confirmed)
    return res.status(401).json({
      message:
        "Account not verified please open your email box and verify your account.",
    });

  const validPassword = await bcrypt.compare(
    requestData.password,
    account.password
  );

  if (!validPassword)
    return res.status(400).json({ message: "Invalid  password." });

  const token = JWT.sign(
    {
      _id: account._id,
      name: account.first_name + " " + account.last_name,
      role: account.role,
    },
    process.env.JWT_PRIVIAT_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    payload: {
      _id: account._id,
      firstName: account.first_name,
      lastName: account.last_name,
      email: account.email,
      role: account.rolle,
      profileImageLink: account.profile_image_link,
      country: account.country,
      city:account.city,
      jobTitle :account.jobTitle,
      bio: account.bio,
      createdAt : account.created_at,
      token,
    },
    message: "succes SignIn",
  });
};

/**
 * @desc    signup account
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {

  const requestData = req.body;
  const { error } = authValidator.signupValidator(requestData);

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/\"/g,'') });

  const email_exist = await dbConnection.query(
    authSqlQuery.CHECK_EMAIL_IS_EXIST,
    [requestData.email]
  );

  if (email_exist.rows[0].exists === true)
    return res.status(400).json({ message: "Email already used." });

  // hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(requestData.password, salt);

  const accountData = [
    requestData.firstName,
    requestData.lastName,
    requestData.email,
    hashedPassword,
  ];

  await dbConnection.query(authSqlQuery.CREATE_ACCOUNT, accountData);
  res.status(201).json({
    message:
      "Account created please open your email box and verify your account.",
  });

  await sendVerificationEmailFunc(requestData.email);
};

/**
 * @desc    Change account password
 * @route   PATCH /api/v1/auth/password
 * @access  Private/user
 */
exports.changePassword = async (req, res) => {

  const requestData = req.body;
  // validate newPassword
  const { error } = authValidator.updateValidator({
    password: requestData.newPassword,
  });

  if (error) return res.status(400).json({ message: "new " + error.details[0].message.replace(/\"/g,'') });

  let user = await dbConnection.query(authSqlQuery.GET_ACCOUNT_PASSWORD, [
    req.user._id,
  ]);

  const oldPassword = user.rows[0].password;

  // check old password
  const validPassword = await bcrypt.compare(requestData.password, oldPassword);

  if (!validPassword)
    return res.status(401).json({ message: "Invalid old password." });
  // hashing new password
  const salt = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(requestData.newPassword, salt);

  await dbConnection.query(authSqlQuery.UPDATE_ACCOUNT_PASSWORD, [
    hashedNewPassword,
    req.user._id,
  ]);
  res.status(200).json({ message: "Account password changeed successfully." });
};

//  Forgot Password

/**
 * @desc    Recover  account
 * @route   POST /api/v1/auth/recover
 * @access  Public
 */
exports.recover = async (req, res) => {
  const requestData = req.body;

  const { error } = authValidator.updateValidator({ email: requestData.email });
  if (error) return res.status(400).json({ error: error.details[0].message.replace(/\"/g,'') });

  let email_exist = await dbConnection.query(
    authSqlQuery.CHECK_EMAIL_IS_EXIST,
    [requestData.email]
  );

  if (email_exist.rows[0].exists === false)
    return res.status(401).json({
      message:
        "The email address " +
        requestData.email +
        " is not associated with any account. Double-check your email address and try again.",
    });

  //Generate and set password reset code
  const resetPasswordCode = crypto.randomInt(1111, 9999).toString();
  const resetPasswordExpires = (Date.now() + 1200000); //expires in an 20 minutes

  await dbConnection.query(authSqlQuery.UPDATE_PASSWORD_VERIFICATION_CODE, [
    resetPasswordCode,
    resetPasswordExpires,
    requestData.email,
  ]);

  //  Send mail

  const emailSubject = "(CODETOGEEKS) Forget password code";

    await Email.sendMail(emailSubject, "", forgetPasswordEmailTemplet(resetPasswordCode), requestData.email);

  res.status(200).json({ message: "Send password reset code is successful." });
};

/**
 * @desc    Check recover code
 * @route   POST /api/v1/auth/code/check
 * @access  Public
 */
exports.checkCode = async (req, res) => {
  const code = req.body.code;
  // validate code
  const { error } = authValidator.verificationCodeValidator({
    code,
  });

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/\"/g,'')});

  const user = await dbConnection.query(authSqlQuery.CHECH_TOKENT_IS_FIND, [
    code,
  ]);

  if (!user.rows.length)
    return res
      .status(401)
      .json({ message: "Password reset code is invalid or has expired." });

  const resetPasswordExpires = user.rows[0].reset_password_expires.getTime();

  if (resetPasswordExpires < Date.now())
    return res
      .status(401)
      .json({ message: "Password reset code has expired." });

  return res.status(200).json({ message: "The password reset code is correct." });
};
/**
 * @desc    Reset password
 * @route   POST /api/v1/auth/password/reset
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  const requestData = req.body;

  // validate code and new password
  const { error } = authValidator.resetPasswordAttributeValidator(requestData);

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/\"/g,'') });

  const user = await dbConnection.query(authSqlQuery.CHECH_TOKENT_IS_FIND, [
    requestData.code,
  ]);

  if (!user.rows.length)
    return res
      .status(401)
      .json({ message: "Password reset code is invalid or has expired." });

  const resetPasswordExpires = user.rows[0].reset_password_expires.getTime();

  if (resetPasswordExpires < Date.now())
    return res
      .status(401)
      .json({ message: "Password reset code has expired." });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(requestData.password, salt);

  await dbConnection.query(authSqlQuery.RESET_ACCOUNT_PASSWORD, [
    hashedPassword,
    requestData.code,
  ]);

  res.status(200).json({ message: "Account password has been updated." });
};

/**
 * @desc    Resend verification Email
 * @route   POST /api/v1/auth/resend/verification/email
 * @access  Public
 */
module.exports.reSendVerificationEmail = async (req, res) => {

  const requestData = req.body;
  const { error } = authValidator.updateValidator(requestData);
  if (error)
    return res.status(400).json({
      message: error.details[0].message.replace(/\"/g,''),
    });

  let account = await dbConnection.query(
    authSqlQuery.GET_ACCOUNT_DATA_BY_EMAIL_FOR_RESEND_CONFIRM_EMAIL,
    [req.body.email]
  );

  account = account.rows[0];
  if (!account)
    return res.status(403).json({
      message: "Invalid email or dont have account.",
    });
  if (account.confirmed)
    return res.status(409).json({
      message: "Account already verified",
    });

  res.status(200).json({
    message: "Verification email sent successfully",
  });
  await sendVerificationEmailFunc(requestData.email);
};



//                        Oauth

/**
 * @desc    google Signin user
 * @route   POST /api/v1/auth/google
 * @access  Public
 */
exports.googleSignin = async (req, res) => {
  const { error } = authValidator.OauthSignupValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message.replace(/\"/g,'') });

  let googleToken = req.body.token;
  let decodeOfGoogleToken = JWT.decode(googleToken);

  // validate some variations in token
  if (
    decodeOfGoogleToken.aud !== process.env.OAUTH_GOOGLE_CLIENT_ID ||
    Math.floor(Date.now() / 1000) > decodeOfGoogleToken.exp ||
    !decodeOfGoogleToken.email_verified
  )
    return res.status(400).json({ message: "unvalid token !!" });

  //  check if eamil alreedy exist

  const email_exist = await dbConnection.query(
    authSqlQuery.CHECK_EMAIL_IS_EXIST,
    [decodeOfGoogleToken.email]
  );

  if (email_exist.rows[0].exists === true) {
    let account = await dbConnection.query(authSqlQuery.GET_DATA_FOR_SIGNIN, [
      decodeOfGoogleToken.email,
    ]);

    account = account.rows[0];

    if (account.type === "registred") {
      return res.status(400).json({
        message:
          "This email have registred account , please try login with this email and password !",
      });
    } else {
      const newAuthToken = await JWT.sign(
        {
          _id: account._id,
          name: account.first_name + " " + account.last_name,
          role: account.role,
        },
        process.env.JWT_PRIVIAT_KEY,
        {
          expiresIn: "1d",
        }
      );
      return res.status(200).json({
        payload: {
          _id: account._id,
          firstName: account.first_name,
          lastName: account.last_name,
          role: account.rolle,
          profileImageLink: account.profile_image_link,
          bio: account.bio,
          token: newAuthToken,
        },
        message: "succes Auth",
      });
    }
  } else {
    const accountData = [
      decodeOfGoogleToken.given_name,
      decodeOfGoogleToken.family_name,
      decodeOfGoogleToken.email,
      decodeOfGoogleToken.picture,
      "google",
    ];

    let result = await dbConnection.query(
      authSqlQuery.CREATE_OAUTH_ACCOUNT,
      accountData
    );

    result = result.rows[0];

    const newAuthToken = await JWT.sign(
      {
        _id: result._id,
        name:
          decodeOfGoogleToken.given_name +
          " " +
          decodeOfGoogleToken.family_name,
        role: "user",
      },
      process.env.JWT_PRIVIAT_KEY,
      {
        expiresIn: "1d",
      }
    );
    return res.status(200).json({
      payload: {
        _id: result._id,
        firstName: decodeOfGoogleToken.given_name,
        lastName: decodeOfGoogleToken.family_name,
        role: "user",
        profileImageLink: decodeOfGoogleToken.picture,
        bio: null,
        token: newAuthToken,
      },
      message: "succes Auth",
    });
  }
};

/**
 * @desc    verify  account email
 * @route   POST /api/v1/auth/confirmation/:token
 * @access  Public 
 */

module.exports.emailVerification = async (req, res) => {
  let decoded;
  try {
    decoded = await JWT.verify(req.params.token, process.env.JWT_EMAIL_SECRET);
  } catch (err) {
    return res.status(403).json({
      message: "verification link is expired.",
    });
  }

  let alreadyVerified = await dbConnection.query(
    authSqlQuery.CHECK_IF_ACCOUNT_ALREADY_VERIFIED,
    [decoded.email]
  );
  alreadyVerified = alreadyVerified.rows[0];

  if (alreadyVerified.exists === true)
    return res.status(400).json({
      message: "Email already verified.",
    });

  let accountData = await dbConnection.query(
    authSqlQuery.CONFIRM_ACCOUNT_BY_EMAIL,
    [decoded.email]
  );

  accountData = accountData.rows[0];

  const token = JWT.sign(
    {
      _id: accountData._id,
      name: accountData.first_name + " " + accountData.last_name,
      role: accountData.role,
    },
    process.env.JWT_PRIVIAT_KEY,
    {
      expiresIn: "24h",
    }
  );

  res.status(200).json({
    payload: {
      _id: accountData._id,
      firstName: accountData.first_name,
      lastName: accountData.last_name,
      email : accountData.email,
      role: accountData.rolle,
      profileImageLink: accountData.profile_image_link,
      country :accountData.country,
      city:accountData.city,
      jobTitle:accountData.jobTitle,
      bio: accountData.bio,
      createdAt: accountData.created_at,
      token,
    },
    message: "Account verified successfully.",
  });
};

// #            functions

/**
 * @desc    Send verificatio Email Function
 * @access  Just use in auth Controller
 */
 
const sendVerificationEmailFunc = async (email) => {
  const token = await JWT.sign(
    {
      email,
    },
    process.env.JWT_EMAIL_SECRET,
    {
      expiresIn: "24h", // 24 hours
    }
  );
  //  Send mail
  await Email.sendMail(
    Constants.notificationConfirmAccountEmail.emailSubject,
    "",
    verificationEmailTemplate(
      Constants.notificationConfirmAccountEmail.emailContent + token
    ),
    email
  );
};
