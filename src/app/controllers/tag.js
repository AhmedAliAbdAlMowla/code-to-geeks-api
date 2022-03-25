const mongoose = require("mongoose");
const Tag = require("../models/tag");
const Validator = require("../utils/validator/tag");

/**
 * @desc    Create new tag
 * @route   Post /api/v1/tag
 * @access  Private
 */
module.exports.create = async (req, res) => {
  // validation
  const { error } = Validator.Create(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });

  try {
    await Tag.create(req.body);
  } catch (ex) {
    let error_message;
    if (ex.message.includes("Tag validation failed: author"))
      error_message = "Author not found !..";
    else error_message = ex.messag;

    return res.status(400).json({ message: error_message });
  }

  res.status(201).json({ message: "tag created" });
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
  
  const total = await Tag.countDocuments();
  const tags = await Tag.find()
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
  .sort({
    createdAt: 1,
  }).select("-updatedAt -__v");
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
  const tag = await Tag.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  }).select("-updatedAt -__v");

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
  const result = await Tag.deleteOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (result.deletedCount)
    return res.status(200).json({ message: "Tag deleted." });

  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};
