const Joi = require("joi");

/**
 * @desc     Validate Create tag
 * @returns  Result after validate tag
 */
module.exports.Create = (tag) => {
  const schema = Joi.object({
    name:Joi.string().max(60).min(2).required(),
    description: Joi.string().required().max(500),
    color: Joi.string().max(10).min(2).required(),
  
  });

  return schema.validate(tag);
};


module.exports.Update = (tag) => {
  const schema = Joi.object({
    name:Joi.string().max(60).min(2),
    description: Joi.string(),
    color: Joi.string().max(10).min(2),
  
  });

  return schema.validate(tag);
};