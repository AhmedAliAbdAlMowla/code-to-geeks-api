const Joi = require("joi");

/**
 * @desc     Validate Create post
 * @returns  Result after validate post
 */
module.exports.createValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(100).min(2).required().trim(),
    slug: Joi.string().min(2).max(100).required().trim(),
    excerpt: Joi.string().min(0).max(800).required().trim(),
    md: Joi.string().required(),
    tags: Joi.array().min(1).required(),

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
 * @desc     Validate Update post
 * @returns  Result after validate post
 */
 module.exports.updateValidator = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().max(100).min(2).trim(),
    slug: Joi.string().min(2).max(100).trim(),
    excerpt: Joi.string().min(0).max(800).trim(),
    md: Joi.string(),
    tags: Joi.array().min(1),
    published: Joi.boolean()

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
 module.exports.uploadCoverImageValidator = (req, res, next) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "Should send file in form-data." });

  next();
};