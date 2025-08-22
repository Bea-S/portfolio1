// Doctor model
module.exports = class Doctor {
  constructor(id, name, specialty, phone) {
    this.id = id;
    this.name = name;
    this.specialty = specialty;
    this.phone = phone;
  }
};
