const { Schema, model } = require("../connection");
const schema = new Schema({
  title: String,
  description: String,
  thumbnail: String,
  file: String,
  uploadedBy: String,
  category: String,
  createdAt: { type: Date, default: new Date() },
});

module.exports = model("podcastcollection", schema);
