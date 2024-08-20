const express = require('express');
const { getQuizQuestions, submitQuizResult } = require('../Controllers/quizController');
const router = express.Router();

router.get(`/generate/:course`, getQuizQuestions);
router.post('/submit', submitQuizResult);

module.exports = router;
