const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
    user: { type: String, required: true },
    course: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const QuizResult = mongoose.model('QuizResult', quizResultSchema);

module.exports = QuizResult;
