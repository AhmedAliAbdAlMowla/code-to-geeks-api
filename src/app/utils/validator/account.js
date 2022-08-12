"use strict";
const Joi = require("joi");

/**
 * @desc     Validate updates in user document
 * @returns  Result after validate new data
 */

module.exports.updateValidator = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().trim().max(50).min(2),
    lastName: Joi.string().max(50).min(2).trim(),
    country: Joi.string().max(50).allow(null).allow(""),
    city: Joi.string().max(50).allow(null).allow(""),
    jobTitle: Joi.string().max(150).allow(null).allow("").trim(),
    bio: Joi.string().max(1000).allow(null).allow(""),
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
module.exports.createSocialLinkValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(2).trim().required(),
    link: Joi.string().max(600).min(2).trim().required(),
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
 * @desc     Validate profile image
 */
module.exports.uploadProfileImageValidator = (req, res, next) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "Should send file in form-data." });

  next();
};
