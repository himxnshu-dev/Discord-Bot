const mongoose = require("mongoose");

const mongoSchema = new mongoose.Schema(
  {
    shortUrl: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
  },
  {timestamps: true}
);

const URL = mongoose.model('url', mongoSchema)

module.exports = URL