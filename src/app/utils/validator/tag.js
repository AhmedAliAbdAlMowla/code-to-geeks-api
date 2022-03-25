const Joi = require("joi");

/**
 * @desc     Validate Create tag
 * @returns  Result after validate tag
 */
module.exports.Create = (tag) => {
  const schema = Joi.object({
 
    name:Joi.string().max(60).min(2).required(),
    description: Joi.string().required(),
    author:  Joi.string().max(40).required(),
    color: Joi.string().max(20).min(2).required(),
  
  });

  return schema.validate(tag);
};