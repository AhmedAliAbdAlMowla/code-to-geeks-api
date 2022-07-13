const s3Service = require("../services/s3");
const accountTableKey = require("../config/constants").accountTableKey;
const dbConnection = require("../db/connection");
const accountSqlQuery = require("../db/queries/account").queryList;
const {
  updateValidator,
  createSocialLink,
} = require("../utils/validator/account");
/*
 * @desc    Get account profile data
 * @route   GET /api/v1/account/
 * @access  Private
 */
module.exports.getAccountData = async (req, res) => {
  const accountData = await dbConnection.query(
    accountSqlQuery.GET_ACCOUNT_DATA,
    [req.user._id]
  );

  res.status(200).json({
    payload: {
      accountData: accountData.rows[0],
    },
    message: "Account profile data retrieved successfully.",
  });
};

/**
 * @desc    Update account profile data
 * @route   PATCH /api/v1/account/
 * @access  Private
 */
module.exports.updateAccount = async (req, res) => {
  // validateProduct body
  const { error } = updateValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // update
  let updateColumn = {};
  let updateDate = [];
  Object.keys(req.body).forEach(function (key) {
    updateColumn[accountTableKey[key]] = "";
    updateDate.push(req.body[key]);
  });
  const result = await dbConnection.query(
    accountSqlQuery.UPDATE_ACCOUNT_DATA(req.user._id, "account", updateColumn),
    updateDate
  );

  if (result.rowCount == 0)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });

  res
    .status(200)
    .json({ message: "Account profile data updated successfully." });
};

/**
 * @desc    Upload account profile image
 * @route   POST /api/v1/account/profile/image
 * @access  Private
 */
module.exports.uploadProfileImage = async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "You shoud send file in form-data." });

  // get old image  S3Key if image exist
  const profileImageS3Key = await dbConnection.query(
    accountSqlQuery.GET_ACCOUNT_PROFILE_IMAGE_S3_KEY,
    [req.user._id]
  );

  // upload new image to aws S3
  const imageData = await s3Service.uploadFile("userProfileImage/", req.file);

  //  update account by new image data
  await dbConnection.query(accountSqlQuery.UPDATE_ACCOUNT_PROFILE_IMAGE, [
    imageData.fileLink,
    imageData.s3_key,
    req.user._id,
  ]);

  //  if image data have s3_key then this account have old image then delete this from aws
  if (profileImageS3Key.rows[0].s3_key !== null) {
    //  delete old image file from aws
    await s3Service.deleteOne(profileImageS3Key.rows[0]);
  }

  res.status(201).json({
    payload: {
      link: imageData.fileLink,
    },
    message: "Account profile image changed successfully.",
  });
};



/**
 * @desc    Get  account profile image
 * @route   GET  /api/v1/account/profile/image
 * @access  Private
 */
module.exports.getProfileImage = async (req, res) => {
  const imageData = await dbConnection.query(
    accountSqlQuery.GET_ACCOUNT_PROFILE_IMAGE,
    [req.user._id]
  );

  if (imageData.rows[0].profile_image_link === null)
    return res
      .status(400)
      .json({ message: "Account does not have a profile image!" });

  res.status(200).json({
    payload: {
      profileImageLink: imageData.rows[0].profile_image_link,
    },
    message: "Account profile data retrieved successfully.",
  });
};

/**
 * @desc    Create  Social link
 * @route   POST   /api/v1/account/profile/social
 * @access  Private
 */

module.exports.createSocialLink = async (req, res) => {
  const data = req.body;
  // validation
  const { error } = createSocialLink(data);

  if (error) return res.status(400).json({ message: error.details[0].message });

  let result = await dbConnection.query(accountSqlQuery.INSERT_SOCIAL_LINK, [
    req.user._id,
    data.name,
    data.link,
  ]);

  if (result.rowCount === 0)
    return res
      .status(400)
      .json({ message: "Can not create this link for unknown reasons" });

  res.status(201).json({ message: "link created" });
};

/**
 * @desc    GET  Social links
 * @route   GET  /api/v1/account/profile/social
 * @access  Private
 */

module.exports.getSocialLinks = async (req, res) => {
  const links = await dbConnection.query(accountSqlQuery.GET_ALL_SOCIAL_LINKS, [
    req.user._id,
  ]);

  res.status(200).json({
    payload: {
      links: links.rows
    },
    message: "Account profile social links retrieved successfully.",
     });
};

/*
 * @desc    Get author profile data
 * @route   GET /api/v1/account/author/profile/:id
 * @access  private
 */
module.exports.getAuthorAccountProfileData = async (req, res) => {
  const data = await dbConnection.query(
    accountSqlQuery.GET_AUTHOR_PROFILE_DATA,
    [req.params.id]
  );

  if (data.rowCount === 0)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });

  const authorSocialLinks = await dbConnection.query(
    accountSqlQuery.GET_AUTHOR_SOCIAL_LINKS,
    [req.params.id]
  );

  res.status(200).json({
    payload : {
      authorData: data.rows,
      authorSocialLinks: authorSocialLinks.rows,
    },
    message: "Author account profile data retrieved successfully.",


  });
};

/*
 * @desc    Get account interactions [love, saved]
 * @route   GET /api/v1/account/interactions
 * @access  private
 */
module.exports.getInteractions = async (req, res) => {

  const savedPostsResult = await dbConnection.query(
    accountSqlQuery.GET_SAVED_POSTS,
    [req.user._id]
  );

  const lovePostsResult = await dbConnection.query(
    accountSqlQuery.GET_LOVE_POSTS,
    [req.user._id]
  );

  let savedPosts = [];
  let lovedPosts = [];

  for (let i = 0; i < savedPostsResult.rows.length; i++) {
    savedPosts.push(savedPostsResult.rows[i].id);
  }

  for (let i = 0; i < lovePostsResult.rows.length; i++) {
    lovedPosts.push(lovePostsResult.rows[i].id);
  }
  
  res.status(200).json({
    payload: {
      savedPosts,
      lovedPosts,
    },
    message : "Account interactions data retrieved successfully."
  });
};
