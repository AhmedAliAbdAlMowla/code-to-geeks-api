"use strict";
const authValidator = require("../utils/validator/auth");
const dbConnection = require("../db/connection");
const authSqlQuery = require("../db/queries/auth").queryList;
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const crypto = require("crypto");
const Constants = require("../config/constants");
const Email = require("../services/email");
const verficationEmailTemplet = require("../utils/assets/templates/verificationEmail");

/**
 * @desc    signin user
 * @route   POST /api/v1/auth/signin
 * @access  Public
 */
exports.signIn = async (req, res) => {
  const { error } = authValidator.signInValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let account = await dbConnection.query(authSqlQuery.GET_DATA_FOR_SIGNIN, [
    req.body.email,
  ]);

  account = account.rows[0];

  if (!account)
    return res.status(400).json({ message: "Invalid email or password." });

  //   check if the account is comfirmed
  if (!account.confirmed)
    return res.status(401).json({
      message:
        "Account not confirmed please open you email box and confirm your account by code.",
    });

  const validPassword = await bcrypt.compare(
    req.body.password,
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
      expiresIn: "20h",
    }
  );

  res
    .status(200)
    .json({
      payload: {
        _id: account._id,
        firstName: account.first_name,
        lastName: account.last_name,
        role: account.rolle,
        profileImageLink: account.profile_image_link,
        bio: account.bio,
        token,
      },
      message: "succes Auth",
    });
};

/**
 * @desc    signup user
 * @route   POST /api/v1/auth/signup
 * @access  Public
 */
exports.signup = async (req, res) => {
  const { error } = authValidator.signupValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const email_exist = await dbConnection.query(
    authSqlQuery.CHECK_EMAIL_IS_EXIST,
    [req.body.email]
  );

  if (email_exist.rows[0].exists === true)
    return res.status(400).json({ message: "Email already used." });

  // hashing password
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  const accountData = [
    req.body.firstName,
    req.body.lastName,
    req.body.email,
    req.body.password,
  ];

  await dbConnection.query(authSqlQuery.CREATE_ACCOUNT, accountData);
  res.status(201).json({
    message:
      "Account created please open you email box and confirm your account by code..",
  });

  await sendConfirmationEmailFunc(
    "use this code to confirm your account : ",
    "Confirm new account code",
    req.body.email
  );
};

/**
 * @desc    Update user password
 * @route   PATCH /api/v1/auth/password
 * @access  Private/user
 */
exports.updatePassword = async (req, res) => {
  // validate newPassword
  const { error } = authValidator.updateValidator({
    password: req.body.newPassword,
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await dbConnection.query(authSqlQuery.GET_ACCOUNT_PASSWORD, [
    req.user._id,
  ]);

  const oldPassword = user.rows[0].password;

  // check old password
  const validPassword = await bcrypt.compare(req.body.password, oldPassword);

  if (!validPassword)
    return res.status(401).json({ message: "Invalid old password." });
  // hashing new password
  const salt = await bcrypt.genSalt(10);
  req.body.newPassword = await bcrypt.hash(req.body.newPassword, salt);
  await dbConnection.query(authSqlQuery.UPDATE_ACCOUNT_PASSWORD, [
    req.body.newPassword,
    req.user._id,
  ]);
  res.status(200).json({ message: "password updated." });
};

//  Forgot Password

/**
 * @desc    Recover  account
 * @route   POST /api/v1/auth/recover
 * @access  Public
 */
exports.recover = async (req, res) => {
  const { error } = authValidator.updateValidator({ email: req.body.email });
  if (error) return res.status(400).json({ error: error.details[0].message });

  let email_exist = await dbConnection.query(
    authSqlQuery.CHECK_EMAIL_IS_EXIST,
    [req.body.email]
  );

  if (email_exist.rows[0].exists === false)
    return res.status(401).json({
      message:
        "The email address " +
        req.body.email +
        " is not associated with any account. Double-check your email address and try again.",
    });

  await sendConfirmationEmailFunc(
    "use this code to recover your account : ",
    "Forget password code",
    req.body.email
  );

  res.status(200).json({ message: "Send password reset code is success." });
};

/**
 * @desc    Check recover code
 * @route   POST /api/v1/auth/code/check
 * @access  Public
 */
exports.checkCode = async (req, res) => {
  const code = req.body.code;
  // validate code
  const { error } = authValidator.confirmationCodeValidator({
    code,
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

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

  return res.status(200).json({ message: "Code auth is correct." });
};
/**
 * @desc    Reset password
 * @route   POST /api/v1/auth/password/reset
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
  // validate code and new password
  const { error } = authValidator.resetPasswordAttributeValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const user = await dbConnection.query(authSqlQuery.CHECH_TOKENT_IS_FIND, [
    req.body.code,
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
  req.body.password = await bcrypt.hash(req.body.password, salt);

  await dbConnection.query(authSqlQuery.RESET_ACCOUNT_PASSWORD, [
    req.body.password,
    req.body.code,
  ]);

  res.status(200).json({ message: "Your password has been updated." });
};

/**
 * @desc    Resend Confirmation Email
 * @route   POST /api/v1/auth/resend/confirmation/email
 * @access  Public
 */
module.exports.reSendConfirmationEmail = async (req, res) => {
  const { error } = authValidator.updateValidator(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  let user = await dbConnection.query(
    authSqlQuery.GET_ACCOUNT_DATA_BY_EMAIL_FOR_RESEND_CONFIRM_EMAIL,
    [req.body.email]
  );

  user = user.rows[0];
  if (!user)
    return res.status(403).json({
      message: "Invalid email or  dont have account.",
    });
  if (user.confirmed)
    return res.status(409).json({
      message: "Account already confirmed.",
    });

  res.status(200).json({
    message: "Confirmation email sended.",
  });

  await sendConfirmationEmailFunc(
    "use this code to confirm your account : ",
    "Confirm new account code",
    req.body.email
  );
};

/**
 * @desc    Confirmation account
 * @route   Post /api/v1/auth/confirm
 * @access  Public webhook
 */

module.exports.confirmNewAccount = async (req, res) => {
  const code = req.body.code;
  // validate code
  const { error } = authValidator.confirmationCodeValidator({
    code,
  });

  if (error) return res.status(400).json({ message: error.details[0].message });

  let user = await dbConnection.query(authSqlQuery.CHECH_TOKENT_IS_FIND, [
    code,
  ]);

  if (!user.rows.length)
    return res
      .status(401)
      .json({ message: "Confirmation code is invalid or has expired ." });
  user = user.rows[0];
  const resetPasswordExpires = user.reset_password_expires.getTime();

  if (resetPasswordExpires < Date.now())
    return res.status(401).json({ message: "Confirmation code has expired." });

  await dbConnection.query(authSqlQuery.CONFIRM_ACCOUNT_BY_EMAIL, [user.email]);

  const token = JWT.sign(
    {
      _id: user._id,
      name: user.first_name + " " + user.last_name,
      role: user.role,
    },
    process.env.JWT_PRIVIAT_KEY,
    {
      expiresIn: "48h",
    }
  );
  res.status(200).json({
    payload: {
      _id: user._id,
      firstName: user.first_name,
      lastName: user.last_name,
      role: user.rolle,
      profileImageLink: user.profile_image_link,
      bio: user.bio,
      token,
    },
    message: "succes Auth",
  });
};

//                        Oauth

/**
 * @desc    google Signin user
 * @route   POST /api/v1/auth/google
 * @access  Public
 */
exports.googleSignin = async (req, res) => {
  const { error } = authValidator.OauthSignupValidator(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

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
    return res
      .status(200)
      .json({

        payload: {
          _id: result._id,
          firstName: decodeOfGoogleToken.given_name,
          lastName: decodeOfGoogleToken.family_name,
          role: 'user',
          profileImageLink: decodeOfGoogleToken.picture,
          bio: null,
          token: newAuthToken,
        },
        message: "succes Auth",

      });
  }
};

// #            functions

/**
 * @desc    Send Confirmation Email Function
 * @access  Just use in User Controller
 */
const sendConfirmationEmailFunc = async (emailText, emailSubject, email) => {
  //Generate and set password reset code
  const resetPasswordCode = crypto.randomBytes(3).toString("hex");
  let resetPasswordExpires = Date.now() + 1200000; //expires in an 20 minutes

  await dbConnection.query(authSqlQuery.UPDATE_PASSWORD_VERIFICATION_TOKEN, [
    resetPasswordCode,
    resetPasswordExpires,
    email,
  ]);

  //  Send mail

  emailText = emailText + resetPasswordCode;
  await Email.sendMail(emailSubject, emailText, " ", email);
};
