const Joi = require("joi");

/**
 * @desc     Validate update file
 * @returns  Result after validate file
 */
module.exports.updateValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).min(2).trim().required(),
  });

  const result = schema.validate(req.body);
  if (result.error)
    return res
      .status(400)
      .json({ message: result.error.details[0].message.replace(/\"/g, "") });
  req.body = result.value;
  next();
};
