// script to save medicine data to the db, change mongo address

const mongoose = require("mongoose");
const xlsx = require("xlsx");
const Medicine = require("./models/Medicine"); // Assuming the schema is in models/medicine.js

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/medical", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Event listeners for MongoDB connection
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  // Only run saveMedicines after successful connection
  saveMedicines();
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Load the workbook
const workbook = xlsx.readFile(
  "C:/Users/LENOVO/Downloads/CORPORATE HOSPITAL PRICE LIST AUGUST 2024.xlsx"
);
const sheet_name_list = workbook.SheetNames;
const sheet = workbook.Sheets[sheet_name_list[0]]; // Access the first sheet

// Convert sheet to JSON
const data = xlsx.utils.sheet_to_json(sheet);

// Extract only the brand name column and prepare for saving
const brandNames = data.slice(1).map((row) => row["__EMPTY_1"]); // Ensure this matches your column header
console.log(brandNames);

// Save medicines function
const saveMedicines = async () => {
  try {
    for (const name of brandNames) {
      if (name) {
        // Skip if the name is empty
        const medicine = new Medicine({ name: name.trim() });
        await medicine.save();
        console.log(`Saved medicine: ${name}`);
      }
    }
  } catch (error) {
    console.error("Error saving medicines:", error);
  }
};
