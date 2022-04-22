const Joi = require("joi");

/**
 * @desc     Validate Create post
 * @returns  Result after validate post
 */
module.exports.Create = (post) => {
  const schema = Joi.object({
    title: Joi.string().max(60).min(2).required(),
    slug: Joi.string().min(2).max(100).required(),
    excerpt: Joi.string().min(0).max(800).required(),
    md: Joi.string().required(),
    tags: Joi.array().min(1).required(),
    cover: Joi.string().min(10)

  });

  return schema.validate(post);
};

/**
 * @desc     Validate Update post
 * @returns  Result after validate post
 */
 module.exports.Update = (post) => {
  const schema = Joi.object({
    title: Joi.string().max(60).min(2),
    slug: Joi.string().min(2).max(100),
    excerpt: Joi.string().min(0).max(800),
    md: Joi.string(),
    tags: Joi.array().min(1),

  });

  return schema.validate(post);
};

