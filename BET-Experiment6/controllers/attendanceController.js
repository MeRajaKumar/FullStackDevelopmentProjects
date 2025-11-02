const Attendance = require('../models/Attendance');
const User = require('../models/User');
const Course = require('../models/Course');

exports.markAttendance = async (req, res) => {
  try {
    const { student, course, status, date } = req.body;

    // basic validations
    const stud = await User.findById(student);
    if (!stud) return res.status(400).json({ message: 'Student not found' });
    const courseObj = await Course.findById(course);
    if (!courseObj) return res.status(400).json({ message: 'Course not found' });

    const attendance = new Attendance({
      student,
      course,
      status,
      date: date ? new Date(date) : undefined,
      markedBy: req.user._id
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getStudentAttendance = async (req, res) => {
  try {
    const records = await Attendance.find({ student: req.user._id }).populate('course', 'title code');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// optional: teacher view attendance for a student or course
exports.getAttendanceForStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    const records = await Attendance.find({ student: studentId }).populate('course', 'title code').populate('markedBy','name email role');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAttendanceForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const records = await Attendance.find({ course: courseId }).populate('student','name email').populate('markedBy','name');
    res.json(records);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
