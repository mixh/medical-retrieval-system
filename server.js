require("dotenv").config();
const express = require("express");
const app = express();
const doctorRouter = require("./routes/doctors");
const medicineRouter = require("./routes/medicines");
const doctorMedicineRouter = require("./routes/doctor-medicines");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("MongoDB connection established");
});

app.use(express.json());

app.use("/api/doctors", doctorRouter);
app.use("/api/medicines", medicineRouter);
app.use("/api/doctor-medicines", doctorMedicineRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started on port", process.env.PORT || 3001);
});
