const mongoose = require("mongoose");

const generatedContentSchema = new mongoose.Schema({
  user: String,
  course: String,
  content: String,
});

const GeneratedContent = mongoose.model(
  "GeneratedContent",
  generatedContentSchema
);

module.exports = GeneratedContent;
