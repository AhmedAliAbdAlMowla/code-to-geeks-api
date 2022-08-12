const s3Service = require("../services/s3");
const dbConnection = require("../db/connection");
const fileSqlQuery = require("../db/queries/file").queryList;

 /**
 * @desc    Upload file 
 * @route   POST /api/v1/file
 * @access  Private [author, admin]
 */
  module.exports.upload = async (req, res) => {

    if (!req.file)
      return res
        .status(400)
        .json({ message: "You shoud send file in form-data." });

     // upload file to aws S3
     const fileData = await s3Service.uploadFile("files/", req.file);
    
     //  insert file data into file table 
     let fileId = await dbConnection.query(fileSqlQuery.INSERT_FILE, [
        fileData.fileLink,
        fileData.s3_key,
        fileData.originalName,
        fileData.extension
     ]);

     fileId = fileId.rows[0];

    res.status(201).json({
      message: "Successful upload",
      fileId : fileId._id,
      link   : fileData.fileLink,
    });
  };


  
/**
 * @desc    Get all  files
 * @route   GET /api/v1/file/
 * @access  Private [author, admin ]
 */
module.exports.get_all = async (req, res) => {
    // pagination element
    const pageNumber = parseInt(req.query.pageNumber, 10);
    const pageSize = parseInt(req.query.pageSize, 10);
  
    let total = await dbConnection.query(fileSqlQuery.GET_FILES_COUNT);
    total = total.rows[0].count;
  
    let files = await dbConnection.query(fileSqlQuery.GET_ALL_FILES, [
      pageSize,
      (pageNumber - 1) * pageSize,
    ]);
  
    files = files.rows;
  
    res.status(200).json({
      total: parseInt(total, 10),
      files,
    });
  };
  
/**
 * @desc    Get one  file
 * @route   GET /api/v1/file/:id
 * @access  Private
 */
module.exports.get_one = async (req, res) => {

    let file = await dbConnection.query(fileSqlQuery.GET_FILE, [req.params.id]);
    file = file.rows[0];
    if (file) return res.status(200).json({ file });
    res.status(400).json({
      message: "No valid entry found for provided ID",
    });
  };

  /**
 * @desc    Update file
 * @route   Patch /api/v1/file/:id
 * @access  Private [author, admin]
 */
 module.exports.update = async (req, res) => {
 
    // update
   const result = await dbConnection.query(
    fileSqlQuery.UPDATE_FILE_NAME,[req.body.name, req.params.id ]
      
    );
  
    if (result.rowCount == 0 ) 
          return res.status(400).json({ message: "No valid entry found for provided ID" });
      
      res.status(200).json({ message: "Successful  update"});
  
     

};


/**
 * @desc    Delete  file
 * @route   Delete /api/v1/file/:id
 * @access  Private [admin]
 */
 module.exports.delete = async (req, res) => {
     
    const result = await dbConnection.query(
        fileSqlQuery.DELETE_FILE,[req.params.id ]
        );

    if (result.rowCount == 0)
        return  res.status(400).json({
          message: "No valid entry found for provided ID",
        });

     // delete file from  aws S3
     
    res.status(200).json({ message: "File deleted." });
    await s3Service.deleteOne(result.rows[0]);
  };
  