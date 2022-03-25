const mongoose = require("mongoose");
const Author = require("../models/author");
const tagSchema = new mongoose.Schema(
  {

    name: { type: String, require: true },


    description: { type: String },

    color: { type: String },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author"
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Tag", tagSchema);
