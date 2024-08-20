const axios = require("axios");
const Content = require("../Models/ContentModel");
const QuizResult = require("../Models/quizResultModel");

exports.getQuizQuestions = async (req, res) => {
  const { course } = req.params;
   console.log(req.params.course)
  try {
    const contentDocument = await Content.findOne({ course: course });

    if (!contentDocument) {
      console.error("Content not found for course:", course); // Log error
      return res.status(404).json({ message: "Content not found for the specified course" });
    }

    const content = contentDocument.content;
    console.log("Content:", content); // Log content

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo",
        messages: [
          {
            role: "system",
            content:
              "You are an expert quiz generator AI robot. Each question (CSV row) should have 6 values: the first one is the question, the following 4 are the multiple-choice options (a, b, c, and d respectively), and the last one should indicate the correct answer (a, b, c, or d). Generate 10 questions in the CSV format. Do not write anything else in your response as it will corrupt the way we interpret your response as a CSV response. Here is an example of how you should respond: What is the full form of AI?,Advanced IT,Artificial Intelligence,Automated Interface,Advanced Interface,b",
          },
          {
            role: "user",
            content: `Provide me 10 multiple-choice questions in CSV format with 6 values on the topic "${course}" with content "${content}".`,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("reached here too");

    const questionsText = response.data.choices[0].message.content.trim();
    const questions = questionsText.split("\n").map((q) => {
      const parts = q.split(",");
      const question = parts[0];
      const options = parts.slice(1, 5);
      const answer = parts[5];
      return { question, options, answer };
    });

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error in getQuizQuestions:", error); // Log full error
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};

exports.submitQuizResult = async (req, res) => {
  const { user, course, score } = req.body;
  try {
    const result = new QuizResult({ user, course, score });
    await result.save();
    res.status(201).json(result);
  } catch (error) {
    console.error("Error in submitQuizResult:", error); // Log full error
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};
