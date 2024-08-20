// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const authRoutes = require('./Routes/authRoutes'); // Correctly import authRoutes

// const app = express();

// app.use(cors());
// app.use(express.json());

// mongoose.connect('mongodb://localhost:27017/course_selection', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// const courseSchema = new mongoose.Schema({
//     user: String,
//     selectedCourses: [String],
// });

// const Course = mongoose.model('Course', courseSchema);

// app.post('/api/courses', async (req, res) => {
//     const { user, selectedCourses } = req.body;
//     console.log("Request received:", req.body); // Add this line
//     const course = await Course.findOneAndUpdate(
//         { user },
//         { selectedCourses },
//         { new: true, upsert: true }
//     );
//     console.log("Database entry:", course); // Add this line
//     res.status(201).send(course);
// });

// app.use('/api/auth', authRoutes);

// app.listen(5000, () => {
//     console.log('Server is running on port 5000');
// });
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const courseRoutes = require("./Routes/courseRoutes");
const contentRoutes = require("./Routes/contentRoutes");
const quizRoutes = require("./Routes/quizRoutes");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/course_selection", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/content", contentRoutes);
app.use("/api/quiz", quizRoutes); // Ensure this line is present

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
