



"use strict"
const Joi = require("joi");

/**
 * @desc     Validate signup
 * @returns  Result after validate user
 */
module.exports.signupValidator = (req, res, next) => {
  const schema = Joi.object({

    firstName: Joi.string().max(50).min(2).trim().required(),
    lastName: Joi.string().max(50).min(2).trim().required(),
    email: Joi.string().max(50).min(6).trim().email().required(),

    password: Joi.string()
    .max(20)
    .min(8)
    .trim()
    .required()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .label("password")
    .messages({
      "string.min": "password must at least 8 characters",
      "object.regex": "password must have at least 8 characters",
      "string.pattern.base": "password must have characters and at least 1 number"
    }),

  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};

/**
 * @desc     Validate signin
 * @returns  Result after validate user
 */
module.exports.signInValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().max(50).min(6).email().trim().required(),
    password: Joi.string().max(20).trim().required(),
  });
  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};

/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 */
module.exports.updateValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().max(50).min(2).trim(),
    lastName: Joi.string().max(50).min(2).trim(),
    email: Joi.string().max(50).min(6).email().trim(),
    password: Joi.string()
    .trim()
    .max(20)
    .min(8)
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .label("password")
    .messages({
      "string.min": "password must at least 8 characters",
      "object.regex": "password must have at least 8 characters",
      "string.pattern.base": "password must have at least 1 number"
    }),

    
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};

/**
 * @desc     Validate confirmation code 
 * @returns  Result after validate code
 */
module.exports.verificationCodeValidator = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string()
    .trim()
    .required()
    .regex(/^[0-9]+$/)
    .length(4)
    .label("code")
    .messages({
      "string.length": "The code must consist of 4 single digits",
      "string.pattern.base": "The code must consist of numbers only",
      'any.required': 'code is a required field'
    }),
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};

/**
 * @desc     Validate reset password attribute [code , password] 
 * @returns  Result after validate  [code , password] 
 */
 module.exports.resetPasswordValidator = (req, res, next) => {
  const schema = Joi.object({
    code: Joi.string().length(4).trim().required(),
    password: Joi.string()
    .trim()
    .max(20)
    .min(8)
    .required()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .label("password")
    .messages({
      "string.min": "password must at least 8 characters",
      "object.regex": "password must have at least 8 characters",
      "string.pattern.base": "password must have at least 1 number"
    }),
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};
 //         Oauth


 /**
 * @desc     Validate  Oauth signin
 * @returns  Result after validate user token
 */
module.exports.OauthSignupValidator = (req, res, next) => {
  const schema = Joi.object({

    token : Joi.string().min(10).trim().required()
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};