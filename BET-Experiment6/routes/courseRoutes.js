const express = require("express");
const router = express.Router();
const { createCourse, getAllCourses, getCourseById } = require("../controllers/courseController");

// Create Course
router.post("/", createCourse);

// Get All Courses
router.get("/", getAllCourses);

// Get Single Course
router.get("/:id", getCourseById);

module.exports = router;
