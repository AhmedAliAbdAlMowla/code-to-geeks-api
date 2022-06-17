const dbConnection = require("../db/connection");
const savedPostSqlQuery = require("../db/queries/savedPost").queryList;
const validator = require("../utils/validator/savedPost");

/**
 * @desc    Create new saved post
 * @route   Post /api/v1/saved
 * @access  Private [auth]
 */
module.exports.create = async (req, res) => {
  // validation
  const validatorResult = validator.Create(req.body);
  if (!validatorResult)
    return res.status(400).json({ message: "postId is not correct !" });

  let result = await dbConnection.query(
    savedPostSqlQuery.CREATE_NEW_SAVED_POST,
    [req.user._id, req.body.postId]
  );

  if (result.rowCount == 0)
    return res
      .status(400)
      .json({ message: "Can not create this saved post for unknown reasons" });

  res.status(201).json({ message: "saved post created" });
};

/**
 * @desc    Get all saved posts
 * @route   GET /api/v1/saved/
 * @access  Private [auth]
 */
module.exports.getAll = async (req, res) => {
  // pagination element
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);

  let total = await dbConnection.query(savedPostSqlQuery.GET_SAVED_POSTS_COUNT);
  total = total.rows[0].count;

  let savedPosts = await dbConnection.query(savedPostSqlQuery.GET_ALL_SAVED_POSTS, [
    req.user._id,
    pageSize,
    (pageNumber - 1) * pageSize,
  ]);

  savedPosts = savedPosts.rows;

  res.status(200).json({
    total: parseInt(total, 10),
    savedPosts,
  });
};

/**
 * @desc    Delete  saved post
 * @route   Delete /api/v1/saved/:id
 * @access  Private [auth]
 */
module.exports.delete = async (req, res) => {
    
  const result = await dbConnection.query(savedPostSqlQuery.DELETE_SAVED_POST_BY_ID, [
    req.params.id,
  ]);

  if (result.rowCount == 0)
    return res.status(400).json({
      message: "No valid entry found for provided ID",
    });

  res.status(200).json({ message: "Saved post deleted." });
};
