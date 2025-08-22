const Patient = require('../models/patient');
let patients = [];
let nextId = 1;

exports.createPatient = (req, res) => {
  const { name, birthDate, phone } = req.body;
  const patient = new Patient(nextId++, name, birthDate, phone);
  patients.push(patient);
  res.status(201).json(patient);
};

exports.getPatients = (req, res) => {
  res.json(patients);
};

exports.getPatientById = (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
  res.json(patient);
};

exports.updatePatient = (req, res) => {
  const patient = patients.find(p => p.id === parseInt(req.params.id));
  if (!patient) return res.status(404).json({ error: 'Paciente não encontrado' });
  const { name, birthDate, phone } = req.body;
  patient.name = name || patient.name;
  patient.birthDate = birthDate || patient.birthDate;
  patient.phone = phone || patient.phone;
  res.json(patient);
};

exports.deletePatient = (req, res) => {
  const index = patients.findIndex(p => p.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Paciente não encontrado' });
  patients.splice(index, 1);
  res.status(204).send();
};
