const tagSqlQuerys = require("../db/queries/tag").queryList;
const Validator = require("../utils/validator/tag");
const dbConnection = require("../db/connection");
/**
 * @desc    Create new tag
 * @route   Post /api/v1/tag
 * @access  Private
 */
module.exports.create = async (req, res) => {
  // validation
  const { error } = Validator.Create(req.body);
  if (error)
    return res.status(400).json({ message: error.details[0].message });

    const data = req.body;
    
    let result = await dbConnection.query(tagSqlQuerys.CREATE_NEW_TAG, [
      data.name,
      data.description,
      data.color
    ]);
   
    if (result.rowCount == 0)
    return res.status(400).json({ message: "Can not create this tag for unknown reasons" });
  

  res.status(201).json({ message: "tag created" });
};

/**
 * @desc    Update tag
 * @route   Patch /api/v1/tag/:id
 * @access  Private
 */
 module.exports.update = async (req, res) => {
 
    // validateProduct body
    const { error } = Validator.Update(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });
 
    // update
    let updateCol = {};
    let updateDate = Object.values(req.body);

   Object.keys(req.body).forEach(function (key) {
      updateCol[key] = "";
    });

   const result = await dbConnection.query(
    tagSqlQuerys.UPDATE_TAG_DATA(req.params.id, "tag", updateCol),
      updateDate
    );
  
    if (result.rowCount == 0 ) 
          return res.status(400).json({ message: "No valid entry found for provided ID" });
      
      res.status(200).json({ message: "Successful  update"});
  
     

};


/**
 * @desc    Get all  tags
 * @route   GET /api/v1/tag/
 * @access  Private
 */
module.exports.get_all = async (req, res) => {
    // pagination element
    const pageNumber = parseInt(req.query.pageNumber, 10);
    const pageSize = parseInt(req.query.pageSize, 10);

    let total = await dbConnection.query(tagSqlQuerys.GET_TAG_COUNT);
    total = total.rows[0].count;

    let tags = await dbConnection.query(tagSqlQuerys.GET_ALL_TAG, [
      pageSize,
      (pageNumber - 1) * pageSize,
    ]);
  
    tags = tags.rows;
  
    res.status(200).json({
          total,
          tags,
        });
};

/**
 * @desc    Get one  tag
 * @route   GET /api/v1/tag/:id
 * @access  Private
 */
module.exports.get_one = async (req, res) => {

  let tag = await dbConnection.query(tagSqlQuerys.GET_ONE_TAG_BY_ID, [req.params.id]);
  tag = tag.rows[0];
  if (tag) return res.status(200).json({ tag });
  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};

/**
 * @desc    Delete  tag
 * @route   Delete /api/v1/tag/:id
 * @access  Private
 */
module.exports.delete = async (req, res) => {

  // tranaction to update post_tag table by defult tag before delete tag  and delete tag
  let result;
  try{
      await dbConnection.query('BEGIN');
     // update post_tag table
      await dbConnection.query(tagSqlQuerys.UPDATE_POST_TAG_TABLE_BY_DEFULT_TAG,[req.params.id]);
     // update post table -> tags[]
      await dbConnection.query(tagSqlQuerys.UPDATE_POSTS_TAGS_WHEN_DELETE_ANY_TAG(req.params.id));
     // delete tag from tags table
      result = await dbConnection.query(tagSqlQuerys.DELETE_TAG_BY_ID, [req.params.id]);

      await dbConnection.query('COMMIT');
  }catch(err){
    console.log(err.message)
      await dbConnection.query('ROLLBACK'); 

      return  res.status(400).json({ message: "Can not delete tag.." });

  }

  if (result.rowCount == 0)
    return  res.status(400).json({
      message: "No valid entry found for provided ID",
    });
    
    res.status(200).json({ message: "Tag deleted." });
};
