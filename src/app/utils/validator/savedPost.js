const uuid = require('uuid')

/**
 * @desc     Validate Create saved post
 * @returns  Result after validate saved post
 */
 module.exports.Create = (savedPost) => {
    return uuid.validate(savedPost.postId);
  };
  

