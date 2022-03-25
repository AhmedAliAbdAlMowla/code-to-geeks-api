const Joi = require("joi");

/**
 * @desc     Validate Create author
 * @returns  Result after validate author
 */
module.exports.Create = (author) => {
  const schema = Joi.object({
  
    name: Joi.string().max(100).min(5).required(),
    profile_image: Joi.string().max(500).required()
  
  });

  return schema.validate(author);
};