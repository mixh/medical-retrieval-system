const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: String,
  phone_number: String,
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
