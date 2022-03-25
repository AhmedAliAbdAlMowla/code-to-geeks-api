const Joi = require("joi");

/**
 * @desc     Validate login 
 * @returns  Result after validate account
 */
module.exports.check = async(account) => {
  const schema = Joi.object({
  
    user_name: Joi.string().max(20).min(1).required(),
    password: Joi.string()
      .max(15)
      .min(8)
      .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/)
      .required()
      .label("password")
      .messages({
        "string.min": "password incorrect",
        "object.regex": "password incorrect",
        "string.pattern.base":
          "password incorrect",
      }),
  });

  return schema.validate(account);
};