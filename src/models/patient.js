// Patient model
module.exports = class Patient {
  constructor(id, name, birthDate, phone) {
    this.id = id;
    this.name = name;
    this.birthDate = birthDate;
    this.phone = phone;
  }
};
