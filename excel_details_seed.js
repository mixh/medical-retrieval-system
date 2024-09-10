const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Doctor = require("./models/Doctor"); // Assuming the schema is in models/doctor.js

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/medical", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for MongoDB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // Only run saveDoctors after successful connection
  saveDoctors();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Load the workbook
const workbook = xlsx.readFile("C:/Users/LENOVO/Downloads/DOCTORS LIST.xlsx");
const sheet_name_list = workbook.SheetNames;
const sheet = workbook.Sheets[sheet_name_list[0]]; // Access the first sheet

// Save doctors function
const saveDoctors = async () => {
  try {
    // Convert sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1, range: 1 });

    // Extract doctor data and prepare for saving
    const doctors = data.map((row) => {
      const codeNo = row[1];
      const doctorName = row[2];
      return {
        name: `${doctorName} - ${codeNo}`,
      };
    });

    // Save doctors
    for (const doctor of doctors) {
      if (doctor.name) {
        // Skip if the name is empty
        const doc = new Doctor(doctor);
        await doc.save();
        console.log(`Saved doctor: ${doctor.name}`);
      }
    }
  } catch (error) {
    console.error("Error saving doctors:", error);
  }
};
