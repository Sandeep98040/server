const express = require('express');
const { saveCourses, getCourses } = require('../Controllers/courseController');
const router = express.Router();

router.post('/', saveCourses);
router.get('/:username', getCourses);

module.exports = router;
