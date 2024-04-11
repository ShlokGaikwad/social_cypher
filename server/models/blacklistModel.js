const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema(
  {
    blacklistToken: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
  }
);

const BlacklistModel = mongoose.model("blacklist", blacklistSchema);

module.exports = { BlacklistModel };
