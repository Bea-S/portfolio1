// Appointment model
module.exports = class Appointment {
  constructor(id, patientId, doctorId, date, reason) {
    this.id = id;
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.date = date;
    this.reason = reason;
  }
};
