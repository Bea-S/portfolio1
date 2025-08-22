const Doctor = require('../models/doctor');
let doctors = [];
let nextId = 1;

exports.createDoctor = (req, res) => {
  const { name, specialty, phone } = req.body;
  const doctor = new Doctor(nextId++, name, specialty, phone);
  doctors.push(doctor);
  res.status(201).json(doctor);
};

exports.getDoctors = (req, res) => {
  res.json(doctors);
};

exports.getDoctorById = (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
  res.json(doctor);
};

exports.updateDoctor = (req, res) => {
  const doctor = doctors.find(d => d.id === parseInt(req.params.id));
  if (!doctor) return res.status(404).json({ error: 'Médico não encontrado' });
  const { name, specialty, phone } = req.body;
  doctor.name = name || doctor.name;
  doctor.specialty = specialty || doctor.specialty;
  doctor.phone = phone || doctor.phone;
  res.json(doctor);
};

exports.deleteDoctor = (req, res) => {
  const index = doctors.findIndex(d => d.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Médico não encontrado' });
  doctors.splice(index, 1);
  res.status(204).send();
};
