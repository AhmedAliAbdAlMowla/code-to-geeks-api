const mongoose = require("mongoose");
const Post = require("../models/post");
const Author = require("../models/author");
const Tag = require("../models/tag");
var slugify = require('slugify');
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

  const author = await Author.findOne({
    _id: req.body.author,
  }).select("_id");

  if (!author)
    return res
      .status(400)
      .json({ message: "Author No valid entry found for provided ID" });
  let all_tags = [];

  for (let i in req.body.tags) {
    
    const tag = await Tag.findOne({
      _id: req.body.tags[i],
    }).select("_id");

    if (tag) 
      all_tags.push(tag);
    else  
      return res.status(400).json({ message: "Tag No valid entry found for provided ID" });

  }



  const post = new Post({
    title: req.body.title,
    slug: slugify(req.body.slug, '_'),
    html: req.body.html,
    author: author._id,
    tags: all_tags,
  });

  await post.save();

  res.status(201).json({ message: "post created" });
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
  const total = await Post.countDocuments();
  
  const posts = await Post.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({
      createdAt: 1,
    })
    .populate({
      path: "author",
      select: "name _id profile_image ",
    })
    .populate({
      path: "tags",
      select: "name _id color",
    })
    .select("_id title createdAt");

  res.status(200).json({
    total,
    posts,
  });
};

/**
 * @desc    Get one  post
 * @route   GET /api/v1/post/:id
 * @access  public
 */
module.exports.get_one = async (req, res) => {
  const post = await Post.findOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  })
    .populate({
      path: "author",
      select: "name _id profile_image",
    })
    .populate({
      path: "tags",
      select: "name _id color",
    })
    .select("-updatedAt -__v");

  if (post) return res.status(200).json({ post });
  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};

/**
 * @desc    Get one  post by slug
 * @route   GET /api/v1/post/:slug
 * @access  public
 */
 module.exports.get_one_by_slug = async (req, res) => {
   console.log(req.params.slug)
  const post = await Post.findOne({
    slug: req.params.slug,
  })
    .populate({
      path: "author",
      select: "name _id profile_image",
    })
    .populate({
      path: "tags",
      select: "name _id color",
    })
    .select("-updatedAt -__v");

  if (post) return res.status(200).json({ post });
  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};
/**
 * @desc    Get posts by tag id
 * @route   GET /api/v1/post/tag/:tag_id
 * @access  Private
 */
module.exports.get_all_by_tag_id = async (req, res) => {
  // pagination element
  const pageNumber = parseInt(req.query.pageNumber, 10);
  const pageSize = parseInt(req.query.pageSize, 10);
  const total = await Post.countDocuments({
    tags: { $in: [mongoose.Types.ObjectId(req.params.tag_id)] },
  });

  const posts = await Post.find({
    tags: { $in: [mongoose.Types.ObjectId(req.params.tag_id)] },
  })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({
      createdAt: 1,
    })

    .populate({
      path: "author",
      select: "name _id profile_image",
    })
    .populate({
      path: "tags",
      select: "name _id color",
    })
    .select("_id title");

  res.status(200).json({
    total,
    posts,
  });
  /*
  res.status(400).json({
    message: "No valid entry found for provided ID",
  });*/
};

/**
 * @desc    Delete  post
 * @route   Delete /api/v1/post/:id
 * @access  Private
 */
module.exports.delete = async (req, res) => {
  const result = await Post.deleteOne({
    _id: mongoose.Types.ObjectId(req.params.id),
  });

  if (result.deletedCount)
    return res.status(200).json({ message: "Post deleted." });

  res.status(400).json({
    message: "No valid entry found for provided ID",
  });
};
