"use strict"
const Joi = require("joi");

/**
 * @desc     Validate signup
 * @returns  Result after validate user
 */
module.exports.signupValidator = (user) => {
  const schema = Joi.object({

    firstName: Joi.string().max(50).min(2).required(),
    lastName: Joi.string().max(50).min(2).required(),
    email: Joi.string().max(50).min(6).email().required(),

    password: Joi.string()
    .max(20)
    .min(8)
    .required()
    .regex(/^(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
    .label("password")
    .messages({
      "string.min": "password must at least 8 characters",
      "object.regex": "password must have at least 8 characters",
      "string.pattern.base": "password must have characters and at least 1 number"
    }),

  });

  return schema.validate(user);
};

/**
 * @desc     Validate signin
 * @returns  Result after validate user
 */
module.exports.signInValidator = (user) => {
  const schema = Joi.object({
    email: Joi.string().max(50).min(6).email().required(),
    password: Joi.string().max(20).required(),
  });
  return schema.validate(user);
};

/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 */
module.exports.updateValidator = (user) => {
  const schema = Joi.object({
    firstName: Joi.string().max(50).min(2),
    lastName: Joi.string().max(50).min(2),
    email: Joi.string().max(50).min(6).email(),
    password: Joi.string()
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

  return schema.validate(user);
};

/**
 * @desc     Validate confirmation code 
 * @returns  Result after validate code
 */
module.exports.verificationCodeValidator = (code) => {
  const schema = Joi.object({
    code: Joi.string()
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

  return schema.validate(code);
};

/**
 * @desc     Validate reset password attribute [code , password] 
 * @returns  Result after validate  [code , password] 
 */
 module.exports.resetPasswordAttributeValidator = (attr) => {
  const schema = Joi.object({
    code: Joi.string().max(4).min(4).required(),
    password: Joi.string()
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

  return schema.validate(attr);
};
 //         Oauth


 /**
 * @desc     Validate  Oauth signin
 * @returns  Result after validate user token
 */
module.exports.OauthSignupValidator = (user) => {
  const schema = Joi.object({

    token : Joi.string().min(10).required(),
  });

  return schema.validate(user);
};