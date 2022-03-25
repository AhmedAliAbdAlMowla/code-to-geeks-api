const Joi = require("joi");

/**
 * @desc     Validate Create post
 * @returns  Result after validate post
 */
module.exports.Create = (post) => {
  const schema = Joi.object({
    title: Joi.string().max(60).min(2).required(),
    slug: Joi.string().min(2).max(100).required(),
    html: Joi.string().required(),
    author: Joi.string().max(60).min(1).required(),
    tags: Joi.array().required(),

  });

  return schema.validate(post);
};
