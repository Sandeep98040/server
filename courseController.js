const Course = require('../Models/courseModel');

exports.saveCourses = async (req, res) => {
    const { user, selectedCourses } = req.body;

    try {
        const course = await Course.findOneAndUpdate(
            { user },
            { selectedCourses },
            { new: true, upsert: true }
        );
        res.status(201).json(course);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

exports.getCourses = async (req, res) => {
    const { username } = req.params;

    try {
        const userCourses = await Course.findOne({ user: username });
        if (!userCourses) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(userCourses);
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};
