const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roles = require('../middleware/roles');
const { markAttendance, getStudentAttendance, getAttendanceForStudent, getAttendanceForCourse } = require('../controllers/attendanceController');

// Teachers/Admins mark attendance
router.post('/', auth, roles(['teacher','admin']), markAttendance);

// Students view their attendance
router.get('/student', auth, roles(['student']), getStudentAttendance);

// Teachers/Admins can view a student's attendance
router.get('/student/:studentId', auth, roles(['teacher','admin']), getAttendanceForStudent);

// Teachers/Admins can view attendance for a course
router.get('/course/:courseId', auth, roles(['teacher','admin']), getAttendanceForCourse);

module.exports = router;
