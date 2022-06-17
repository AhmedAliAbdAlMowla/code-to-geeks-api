"use strict"
const Joi = require("joi");


/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 * @allow    SuperAdmin
 */
 module.exports.updateForSuperAdminValidator = (account) => {
    const schema = Joi.object({
      firstName: Joi.string().max(50).min(2),
      lastName: Joi.string().max(50).min(2),
      email: Joi.string().max(100).min(5).email(),
      password: Joi.string()
        .max(15)
        .min(8)
        .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)
        .label("password")
        .messages({
          "string.min": "password must at least 8 characters",
          "object.regex": "password must have at least 8 characters",
          "string.pattern.base": "password must have at least 1 uppercase lowercase special character and number"
        }),
      role:Joi.string().valid("admin", "client")
      
    });
  
    return schema.validate(account);
  };
/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 */
 module.exports.updateValidator = (account) => {
  const schema = Joi.object({
    firstName: Joi.string().max(50).min(2),
    lastName: Joi.string().max(50).min(2),
    bio : Joi.string().max(1000)
    
  });

  return schema.validate(account);
};



/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 */
 module.exports.createSocialLink = (link) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(2),
    link: Joi.string().max(600).min(2)
    
  });

  return schema.validate(link);
};


