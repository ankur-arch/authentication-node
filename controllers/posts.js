const User = require("../models/User");
const Post = require("../models/Post");

module.exports = {
  createPost: async (req, res, next) => {
    /** As long as you are authenticated */
    //google2@gmail.com
    const user = await User.findOne({ email: "google2@gmail.com" });
    const post = new Post({
      owner: user._id,
      university: "Independent University",
      course: ["CSE 330", "Cse 550"],
      description: "I need help pleasee",
    });
    await post.save();
    res.send("success");
  },
  viewPost: async (req, res, next) => {
    const post = await Post.findById("5f2b07e9e6e1503f500081e9");
    res.send(post);
  },
  updatePost: async (req, res, next) => {
    /** Update a Post */
    const post = await Post.findByIdAndUpdate("5f2b07e9e6e1503f500081e9", {
      course: ["CSE 330", "Cse 550", "china"],
      description: "I need help pleasee 2",
    });
    res.send(post);
  },
  confirmPost: async (req, res, next) => {
    /** Post has been resolved by Student */
    const post = await Post.findByIdAndUpdate("5f2b07e9e6e1503f500081e9", {
      status: true,
    });
    res.send(post);
  },
  deletePost: async (req, res, next) => {
    /** Delete a post */

    const post = await Post.findByIdAndDelete("5f2b07e9e6e1503f500081e9");
    res.send("deleted", post);
  },
  viewPosts: (req, res, next) => {
    /** View all relevant for a students */
  },
  viewAllPosts: (req, res, next) => {
    /** View all relevant for admins */
    //paginate and send
  },
  interestedOnPost: (req, res, next) => {
    /** Teacher interested on a post */
  },
};
