// seedCourses.js
require('dotenv').config();
const mongoose = require('mongoose');
const Course = require('./models/Course');

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const courses = [
  { title: 'Data Structures', code: 'CS201' },
  { title: 'Algorithms', code: 'CS202' },
  { title: 'Database Management', code: 'CS203' }
];

(async () => {
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log('Seeded courses');
  process.exit();
})();
