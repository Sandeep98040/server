const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema({
  course: String,
  content: String,
});

const Content = mongoose.model("Content", ContentSchema);

module.exports = Content;
