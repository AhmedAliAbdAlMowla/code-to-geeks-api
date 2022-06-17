const s3Service = require("../services/s3");
const postSqlQuerys = require("../db/queries/post").queryList;
const dbConnection = require("../db/connection");
var slugify = require("slugify");
const Validator = require("../utils/validator/post");

/**
 * @desc    Create new post
 * @route   Post /api/v1/post
 * @access  Private
 */
module.exports.create = async (req, res) => {
  // validation
  const { error } = Validator.Create(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  let data = req.body;
  //check if tag alreedy exist
  const tags = data.tags;
  for (id of tags) {
    let result = await dbConnection.query(postSqlQuerys.CHECK_IF_TAG_EXIST, [
      id,
    ]);
    if (result.rows[0].exists != true)
      return res
        .status(400)
        .json({ message: "Tag No valid entry found for provided ID" });
  }

  // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  let post_id;
  try {
    await dbConnection.query("BEGIN");
    result = await dbConnection.query(postSqlQuerys.CREATE_NEW_POST, [
      data.title,
      slugify(data.slug, "_"),
      data.excerpt,
      data.md,
      req.user._id,
      data.tags,
    ]);
    post_id = result.rows[0]._id;

    //   insert  post_tag row for m to m relsh
    for (id of tags)
      await dbConnection.query(postSqlQuerys.CREATE_POST_TAG_REL, [
        post_id,
        id,
      ]);

    await dbConnection.query("COMMIT");
  } catch (err) {
    console.log(err.message);
    await dbConnection.query("ROLLBACK");

    return res.status(400).json({ message: err.message });
  }

  if (result.rowCount == 0)
    return res
      .status(400)
      .json({ message: "Can not create this post for unknown reasons" });

  res.status(201).json({ message: "post created" });
};

/**
 * @desc    Upload post cover image
 * @route   POST /api/v1/post/cover/image/:id
 * @access  Private [ admin - author ]
 */
exports.uploadCoverImage = async (req, res) => {
  if (!req.file)
    return res
      .status(400)
      .json({ message: "You shoud send file in form-data." });

  // get old image  S3Key if image exist
  const postCoverImageS3Key = await dbConnection.query(
    postSqlQuerys.GET_POST_COVER_IMAGE_S3_KEY,
    [req.params.id]
  );

  if (postCoverImageS3Key.rowCount == 0)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });

  // upload new image to aws S3
  const imageData = await s3Service.uploadFile("postCovers/", req.file);

  //  update accountby new image data
  await dbConnection.query(postSqlQuerys.UPDATE_POST_COVER_IMAGE, [
    imageData.fileLink,
    imageData.s3_key,
    req.params.id,
  ]);

  //  if image data have s3_key then this account have old image then delete this from aws
  if (postCoverImageS3Key.rows[0].s3_key !== null) {
    //  delete old image file from aws
    await s3Service.deleteOne(postCoverImageS3Key.rows[0]);
  }

  res.status(200).json({
    message: "Successful upload",
    link: imageData.fileLink,
  });
};

/**
 * @desc    Update  post
 * @route   Patch /api/v1/post
 * @access  Private
 */
module.exports.update = async (req, res) => {
  // validateProduct body
  const { error } = Validator.Update(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  // if update slug make slugify
  if (req.body.slug) req.body.slug = slugify(req.body.slug, "_");
  // update
  let updateCol = {};
  let updateDate = Object.values(req.body);

  Object.keys(req.body).forEach(function (key) {
    updateCol[key] = "";
  });

  const result = await dbConnection.query(
    postSqlQuerys.UPDATE_POST_DATA(req.params.id, "post", updateCol),
    updateDate
  );

  if (result.rowCount == 0)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });

  res.status(200).json({ message: "Successful  update" });
};

/**
 * @desc    Get all  post
 * @route   GET /api/v1/post/
 * @access  Private
 */
module.exports.get_all = async (req, res) => {
  // pagination element
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  const publishState = req.query.state;
  if (publishState !== "published" && publishState !== "unpublished")
    return res
      .status(400)
      .json({ message: "No valid entry found for publish State" });

  let total = await dbConnection.query(postSqlQuerys.GET_POSTS_COUNT, [
    publishState === "published",
  ]);
  total = total.rows[0].count;

  let posts = await dbConnection.query(postSqlQuerys.GET_ALL_POSTS, [
    publishState === "published",
    pageSize,
    (pageNumber - 1) * pageSize,
  ]);

  posts = posts.rows;

  res.status(200).json({
    total: parseInt(total, 10),
    posts,
  });
};

/**
 * @desc    Get one  post
 * @route   GET /api/v1/post/id/:id
 * @access  public
 */
module.exports.get_one_by_id = async (req, res) => {
  let post = await dbConnection.query(postSqlQuerys.GET_ONE_POST_BY_ID, [
    req.params.id,
  ]);
  post = post.rows[0];
  if (!post)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });
  res.status(200).json({ post });
};

/**
 * @desc    Get one  post by slug
 * @route   GET /api/v1/post/:slug
 * @access  public
 */
module.exports.get_one_by_slug = async (req, res) => {
  let post = await dbConnection.query(postSqlQuerys.GET_ONE_POST_BY_SLUG, [
    req.params.slug,
  ]);
  post = post.rows[0];
  if (!post)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided SLUG" });
  res.status(200).json({ post });
};
/**
 * @desc    Get posts by tag id
 * @route   GET /api/v1/post/tag/:tagId
 * @access  Private
 */
module.exports.get_all_by_tag_id = async (req, res) => {
  // pagination element
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);

  let total = await dbConnection.query(
    postSqlQuerys.GET_POSTS_COUNT_BY_TAG_ID,
    [req.params.tagId]
  );
  total = total.rows[0].count;

  let posts = await dbConnection.query(postSqlQuerys.GET_ALL_POST_BY_TAG_ID, [
    req.params.tagId,
    pageSize,
    (pageNumber - 1) * pageSize,
  ]);

  posts = posts.rows;

  res.status(200).json({
    total,
    posts,
  });
};

/**
 * @desc    Delete  post
 * @route   Delete /api/v1/post/:id
 * @access  Private
 */
module.exports.delete = async (req, res) => {
  let result;
  try {
    await dbConnection.query(postSqlQuerys.DELETE_POST_TAG_REL_BY_POST_ID, [
      req.params.id,
    ]);

    result = await dbConnection.query(postSqlQuerys.DELETE_POST_BY_ID, [
      req.params.id,
    ]);
  } catch (err) {
    console.log(err.message);
    await dbConnection.query("ROLLBACK");

    return res.status(400).json({ message: err.message });
  }
  if (result.rowCount == 0)
    return res
      .status(400)
      .json({ message: "No valid entry found for provided ID" });

  res.status(200).json({ message: "Post deleted." });
};
