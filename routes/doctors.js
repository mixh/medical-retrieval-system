const express = require("express");
const router = express.Router();
const Doctor = require("../models/Doctor");

// GET /api/doctors
router.get("/", async (req, res) => {
  const doctors = await Doctor.find();
  res.json(doctors);
});

router.get("/search", async (req, res) => {
  const name = req.query.name;
  const doctors = await Doctor.find({ name: { $regex: name, $options: "i" } });
  res.json(doctors);
});

// GET /api/doctors/:id
router.get("/:id", async (req, res) => {
  const doctor = await Doctor.findById(req.params.id);
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    res.json(doctor);
  }
});

// POST /api/doctors
router.post("/", async (req, res) => {
  const doctor = new Doctor(req.body);
  await doctor.save();
  res.json(doctor);
});

// PUT /api/doctors/:id
router.put("/:id", async (req, res) => {
  const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!doctor) {
    res.status(404).json({ message: "Doctor not found" });
  } else {
    res.json(doctor);
  }
});

// DELETE /api/doctors/:id
router.delete("/:id", async (req, res) => {
  await Doctor.findByIdAndRemove(req.params.id);
  res.json({ message: "Doctor deleted" });
});

module.exports = router;
