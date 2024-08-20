const express = require('express');
const { saveGeneratedContent, getGeneratedContent, getCourse } = require('../Controllers/contentController');
const router = express.Router();

router.post('/save', saveGeneratedContent);
router.get('/:user/:course', getGeneratedContent);
router.get('/:course', getCourse);

module.exports = router;
