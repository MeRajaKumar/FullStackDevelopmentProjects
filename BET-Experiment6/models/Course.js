const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true }, // EX: MCA101
  description: { type: String },
  credits: { type: Number, default: 3 }
});

module.exports = mongoose.model("Course", CourseSchema);
