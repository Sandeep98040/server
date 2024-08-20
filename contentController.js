const GeneratedContent = require("../Models/GeneratedModel");
const Content = require("../Models/ContentModel");

exports.saveGeneratedContent = async (req, res) => {
  const { user, course, content } = req.body;

  try {
    const generatedContent = await GeneratedContent.findOneAndUpdate(
      { user, course },
      { content },
      { new: true, upsert: true }
    );
    res.status(201).send(generatedContent);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getGeneratedContent = async (req, res) => {
  const { user, course } = req.params;

  try {
    const generatedContent = await GeneratedContent.findOne({ user, course });
    if (!generatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(generatedContent);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.getCourse = async (req, res) => {
  const { course } = req.params;
  try {
    const generatedContent = await Content.findOne({ course });
    if (!generatedContent) {
      return res.status(404).json({ message: "Content not found" });
    }
    res.status(200).json(generatedContent);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
