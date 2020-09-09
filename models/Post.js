const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  university: {
    type: String,
    required: true,
    lowercase: true,
  },
  course: {
    type: [String],
  },
  description: String,
  status: {
    type: Boolean,
    default: false,
  },
  interested: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
});

const Post = mongoose.model("post", postSchema);
module.exports = Post;
