const Joi = require("joi");

/**
 * @desc     Validate Create tag
 * @returns  Result after validate tag
 */
 module.exports.createValidator = (req, res, next) => {
  const schema = Joi.object({
    name:Joi.string().max(60).min(2).trim().required(),
    description: Joi.string().required().trim().max(500),
    color: Joi.string().max(10).min(2).trim().required(),
  
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};


module.exports.updateValidator = (req, res, next) => {
  const schema = Joi.object({
    name:Joi.string().max(60).min(2).trim(),
    description: Joi.string().trim().max(500),
    color: Joi.string().max(10).min(2).trim(),
  
  });
  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};
