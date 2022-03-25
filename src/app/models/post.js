const mongoose = require("mongoose");
const Author = require("../models/author");
const Tag = require("../models/tag");
const postSchema = new mongoose.Schema(
  {
    title: { type: String },

    slug: {
      type: String,
      index:  true,
      require: true,
      unique: true,
      dropDups: true
  
    },

    html: { type: String, require: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Author",

      required: true,
      index: true,
    },

    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,

        ref: "Tag",

        required: true,
        index: true,
      },
    ],
  },

  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
