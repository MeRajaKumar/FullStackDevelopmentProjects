const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['Present','Absent'], required: true },
  markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } // a teacher/admin id
});

module.exports = mongoose.model('Attendance', AttendanceSchema);
