const s3Service = require("../services/s3");
const accountTableKey = require("../config/constants").accountTableKey;
const dbConnection = require("../db/connection");
const accountSqlQuery = require("../db/queries/account").queryList;
const { updateValidator } = require("../utils/validator/account");
/**
 * @desc    Get user profile data
 * @route   GET /api/v1/users/profile
 * @access  Private
 */
 exports.getAccountData = async (req, res) => {
    const accountData = await dbConnection.query(accountSqlQuery.GET_ACCOUNT_DATA, [
      req.user._id,
    ]);
  
    res.status(200).json({
      userData: accountData.rows[0],
    });
  };

  /**
 * @desc    Update user profile data
 * @route   PATCH /api/v1/users/profile
 * @access  Private
 */
exports.updateAccount = async (req, res) => {
    // validateProduct body
    const { error } = updateValidator(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
 
    // update
    let updateCol = {};
    let updateDate = [];
    Object.keys(req.body).forEach(function (key) {
      updateCol[accountTableKey[key]] = "";
      updateDate.push(req.body[key]);
    });
   const result = await dbConnection.query(
      accountSqlQuery.UPDATE_ACCOUNT_DATA(req.user._id, "account", updateCol),
      updateDate
    );
  
    if (result.rowCount == 0 ) 
          return res.status(400).json({ message: "No valid entry found for provided ID" });
      
      res.status(200).json({ message: "Successful  update"});
  
     
  };

  /**
 * @desc    Upload profile image
 * @route   POST /api/v1/account/profile/image
 * @access  Private
 */
exports.uploadProfileImage = async (req, res) => {

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
     const imageData = await s3Service.uploadFile(req.file);
    
     //  update accountby new image data 
       await dbConnection.query(accountSqlQuery.UPDATE_ACCOUNT_PROFILE_IMAGE, [
       imageData.fileLink,
       imageData.s3_key,
       req.user._id
     ]);

      //  if image data have s3_key then this account have old image then delete this from aws
    if (profileImageS3Key.rows[0].s3_key !== null) {
      //  delete old image file from aws 
      await s3Service.deleteOne(profileImageS3Key.rows[0]);
    }
  
    res.status(200).json({
      message: "Successful upload",
      link: imageData.fileLink,
    });
  };


  /**
 * @desc    Get  profile image
 * @route   GET  /api/v1/account/profile/image
 * @access  Private
 */
exports.getProfileImage = async (req, res) => {
    const imageData = await dbConnection.query(
      accountSqlQuery.GET_ACCOUNT_PROFILE_IMAGE,
      [req.user._id]
    );
 
    if (imageData.rows[0].profile_image_link === null)
      return res.status(400).json({ message: "image not uploaded" });
  
    res.status(200).json( imageData.rows[0]);
  };

  

  /*
  
  
  try {
      // upload new image to aws S3
       imageData = await s3Service.uploadFile(req.file);
      // begin transaction 
      await dbConnection.query("BEGIN");
      //  update accountby new image data 
      file_id = await dbConnection.query(accountSqlQuery.UPDATE_ACCOUNT_PROFILE_IMAGE, [
        imageData.fileLink,
        imageData.s3_key,
      ]);

        // update account profile image _id with image file _id
      await dbConnection.query(accountSqlQuery.UPDATE_ACCOUNT_DATA(req.user._id, "account", {profile_image:""}), [
        file_id.rows[0]._id
      ]);
      // commit if success
      await dbConnection.query("COMMIT");
    } catch (err) {
      // rollback if any error
      await dbConnection.query("ROLLBACK");
      return res.status(400).json({ message: err.message });
    }
  
  */