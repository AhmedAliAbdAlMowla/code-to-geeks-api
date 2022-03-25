const mongoose = require("mongoose");
const Author = require("../models/author");
const Validator = require("../utils/validator/author");

/**
 * @desc    Create new author
 * @route   Post /api/v1/author
 * @access  Private
 */
module.exports.create = async (req, res) => {
  // validation
  const { error } = Validator.Create(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });


  await Author.create(req.body);

  res.status(201).json({ message: "author created" });
};

/**
 * @desc    Get all  author
 * @route   GET /api/v1/author/
 * @access  Private
 */
module.exports.get_all = async (req, res) => {
     // pagination element
     const pageNumber = parseInt(req.query.pageNumber, 10);
     const pageSize = parseInt(req.query.pageSize, 10); 
  const total = await Author.countDocuments();
  const authors = await Author.find()
  .skip((pageNumber - 1) * pageSize)
  .limit(pageSize)
  .sort({
    createdAt: 1,
  }).select("-updatedAt -__v");
  res.status(200).json({
    total,
    authors,
  });
};



/**
 * @desc    Get one  author
 * @route   GET /api/v1/author/:id
 * @access  Private
 */
module.exports.get_one = async (req, res) => {
  const author = await Author.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  }).select("-updatedAt -__v");

  if (author) return res.status(200).json({ author });
  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};

/**
 * @desc    Delete  author
 * @route   Delete /api/v1/author/:id
 * @access  Private
 */
module.exports.delete = async (req, res) => {
  const result = await Author.deleteOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (result.deletedCount)
    return res.status(200).json({ message: "Author deleted." });

  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};
