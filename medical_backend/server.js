const express = require("express");
const app = express();
const doctorRouter = require("./routes/doctors");
const medicineRouter = require("./routes/medicines");
const doctorMedicineRouter = require("./routes/doctor-medicines");
const cors = require("cors");

// Enable CORS for all routes
app.use(cors());

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://mihirxjain:ZcTN0wVugfwvwUoL@cluster0.rkrc1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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
