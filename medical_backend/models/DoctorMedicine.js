const mongoose = require("mongoose");

const doctorMedicineSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  medicine_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Medicine",
    required: true,
  },
  discount: { type: Number, required: true },
});

const DoctorMedicine = mongoose.model("DoctorMedicine", doctorMedicineSchema);

module.exports = DoctorMedicine;
