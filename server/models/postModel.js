const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    postDate: { type: Date, default: Date.now },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    commentIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
    picture: { type: String },
    friends: { type: [String] },
  },
  {
    versionKey: false,
  }
);

const PostModel = mongoose.model("post", postSchema);

module.exports = {PostModel};
