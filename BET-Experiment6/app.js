require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

const app = express();
app.use(cors());
app.use(express.json());

// connect to mongo
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/universitydb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error', err);
    process.exit(1);
  });

// routes
app.use('/api/auth', authRoutes);
app.use('/api/attendance', attendanceRoutes);

// basic route
app.get('/', (req, res) => res.send('Attendance module running'));

const courseRoutes = require("./routes/courseRoutes");
app.use("/api/courses", courseRoutes);


// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
