const JWT = require("jsonwebtoken");
const Validator = require("../utils/validator/account");

/**
 * @desc    sign in
 * @route   POST /account/login
 * @access  Public
 */
exports.login = async (req, res) => {
    // validation
  const  { error } = await Validator.check(req.body);

if (error) return res.status(400).json({ message: error.details[0].message });

 if(!((process.env.USER_NAME === req.body.user_name)&&((process.env.PASSWORD === req.body.password))))
     return res.status(400).json({ message: "invalid user_name or password" });

  const token = await JWT.sign(
    {
      
    },
    process.env.JWT_PRIVIAT_KEY,
    {
      expiresIn: "1d",
    }
  );
  return res.status(200).json({ message: token });
};