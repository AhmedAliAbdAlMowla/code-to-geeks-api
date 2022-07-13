"use strict"
const Joi = require("joi");

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


