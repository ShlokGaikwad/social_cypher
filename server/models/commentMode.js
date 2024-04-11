const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    content: { type: String },
    userId: { type: String },
    postId: { type: String },
  },
  {
    versionKey: false,
  }
);

const CommentModel = mongoose.model("comment", commentSchema);

module.exports = CommentModel;
