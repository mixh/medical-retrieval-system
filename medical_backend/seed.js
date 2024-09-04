const mongoose = require("mongoose");
const Doctor = require("./models/Doctor");
const Medicine = require("./models/Medicine");
const DoctorMedicine = require("./models/DoctorMedicine");

// Connect to MongoDB
mongoose
  .connect(
    "mongodb+srv://mihirxjain:ZcTN0wVugfwvwUoL@cluster0.rkrc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

async function seed() {
  // Remove existing data
  await Doctor.deleteMany({});
  await Medicine.deleteMany({});
  await DoctorMedicine.deleteMany({});

  // Insert Doctors
  const doctor1 = new Doctor({
    name: "Dr. John Doe",
    address: "123 Main St",
    phone_number: "123-456-7890",
  });
  const doctor2 = new Doctor({
    name: "Dr. Jane Smith",
    address: "456 Elm St",
    phone_number: "098-765-4321",
  });
  await doctor1.save();
  await doctor2.save();

  // Insert Medicines
  const medicine1 = new Medicine({ name: "Aspirin" });
  const medicine2 = new Medicine({ name: "Ibuprofen" });
  await medicine1.save();
  await medicine2.save();

  // Insert DoctorMedicine relationships
  const doctorMedicine1 = new DoctorMedicine({
    doctor_id: doctor1._id,
    medicine_id: medicine1._id,
    discount: 10,
  });
  const doctorMedicine2 = new DoctorMedicine({
    doctor_id: doctor2._id,
    medicine_id: medicine2._id,
    discount: 15,
  });
  await doctorMedicine1.save();
  await doctorMedicine2.save();

  console.log("Dummy data inserted!");
  mongoose.disconnect();
}

seed();
