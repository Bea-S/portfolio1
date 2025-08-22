const Appointment = require('../models/appointment');
let appointments = [];
let nextId = 1;

exports.createAppointment = (req, res) => {
  const { patientId, doctorId, date, reason } = req.body;
  const appointment = new Appointment(nextId++, patientId, doctorId, date, reason);
  appointments.push(appointment);
  res.status(201).json(appointment);
};

exports.getAppointments = (req, res) => {
  res.json(appointments);
};

exports.getAppointmentById = (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
  res.json(appointment);
};

exports.updateAppointment = (req, res) => {
  const appointment = appointments.find(a => a.id === parseInt(req.params.id));
  if (!appointment) return res.status(404).json({ error: 'Agendamento não encontrado' });
  const { patientId, doctorId, date, reason } = req.body;
  appointment.patientId = patientId || appointment.patientId;
  appointment.doctorId = doctorId || appointment.doctorId;
  appointment.date = date || appointment.date;
  appointment.reason = reason || appointment.reason;
  res.json(appointment);
};

exports.deleteAppointment = (req, res) => {
  const index = appointments.findIndex(a => a.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Agendamento não encontrado' });
  appointments.splice(index, 1);
  res.status(204).send();
};
