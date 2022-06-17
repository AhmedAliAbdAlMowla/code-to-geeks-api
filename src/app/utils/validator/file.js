const Joi = require("joi");

/**
 * @desc     Validate update file
 * @returns  Result after validate file
 */
module.exports.Update = (file) => {
  const schema = Joi.object({
    name:Joi.string().max(50).min(2).required(),
  });

  return schema.validate(file);
};