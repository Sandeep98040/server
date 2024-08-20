const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true,
    },
    selectedCourses: {
        type: [String],
        required: true,
    },
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
