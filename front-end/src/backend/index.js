const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerSetup = require('./swagger');

const app = express();
app.use(cors());
app.use(express.json());
swaggerSetup(app);

// Import routes
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

app.use('/patients', patientRoutes);
app.use('/doctors', doctorRoutes);
app.use('/appointments', appointmentRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/med_scheduler', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
