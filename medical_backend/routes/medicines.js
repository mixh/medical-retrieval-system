const express = require("express");
const router = express.Router();
const Medicine = require("../models/Medicine");

// GET /api/medicines
router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

// GET /api/medicines/:id
router.get("/:id", async (req, res) => {
  const medicine = await Medicine.findById(req.params.id);
  if (!medicine) {
    res.status(404).json({ message: "Medicine not found" });
  } else {
    res.json(medicine);
  }
});

router.get("/search", async (req, res) => {
  const name = req.query.name;
  const medicines = await Medicine.find({
    name: { $regex: name, $options: "i" },
  });
  res.json(medicines);
});

// POST /api/medicines
router.post("/", async (req, res) => {
  const medicine = new Medicine(req.body);
  await medicine.save();
  res.json(medicine);
});

// PUT /api/medicines/:id
router.put("/:id", async (req, res) => {
  const medicine = await Medicine.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!medicine) {
    res.status(404).json({ message: "Medicine not found" });
  } else {
    res.json(medicine);
  }
});

// DELETE /api/medicines/:id
router.delete("/:id", async (req, res) => {
  await Medicine.findByIdAndRemove(req.params.id);
  res.json({ message: "Medicine deleted" });
});

module.exports = router;
