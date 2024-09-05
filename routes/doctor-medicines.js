const express = require("express");
const router = express.Router();
const DoctorMedicine = require("../models/DoctorMedicine");

// // GET /api/doctor-medicines
// router.get("/", async (req, res) => {
//   const doctorMedicines = await DoctorMedicine.find();
//   res.json(doctorMedicines);
// });

// GET /api/doctor-medicines
router.get("/", async (req, res) => {
  const doctorId = req.query.doctor_id;
  const medicineId = req.query.medicine_id;

  if (doctorId && medicineId) {
    const doctorMedicine = await DoctorMedicine.findOne({
      doctor_id: doctorId,
      medicine_id: medicineId,
    });

    if (!doctorMedicine) {
      return res
        .status(404)
        .json({ message: "Doctor-Medicine association not found" });
    }

    res.json(doctorMedicine);
  } else {
    const doctorMedicines = await DoctorMedicine.find();
    res.json(doctorMedicines);
  }
});

// GET /api/doctor-medicines/:id
router.get("/:id", async (req, res) => {
  const doctorMedicine = await DoctorMedicine.findById(req.params.id);
  if (!doctorMedicine) {
    res.status(404).json({ message: "Doctor-Medicine association not found" });
  } else {
    res.json(doctorMedicine);
  }
});

// GET /api/doctor-medicines/by-doctor-and-medicine
router.get("/by-doctor-and-medicine", async (req, res) => {
  const doctorId = req.query.doctor_id;
  const medicineId = req.query.medicine_id;

  if (!doctorId || !medicineId) {
    return res
      .status(400)
      .json({ message: "Missing doctor_id or medicine_id" });
  }

  const doctorMedicine = await DoctorMedicine.findOne({
    doctor_id: doctorId,
    medicine_id: medicineId,
  });

  if (!doctorMedicine) {
    return res
      .status(404)
      .json({ message: "Doctor-Medicine association not found" });
  }

  res.json(doctorMedicine);
});

router.get("/:id/medicines", async (req, res) => {
  const doctorId = req.params.id;
  const doctorMedicines = await DoctorMedicine.find({ doctor_id: doctorId })
    .populate("medicine_id")
    .select("medicine_id name discount");

  if (!doctorMedicines || doctorMedicines.length === 0) {
    return res
      .status(404)
      .json({ message: "No medicines found for this doctor" });
  }

  const medicines = doctorMedicines.map((docMed) => ({
    medicine_id: docMed.medicine_id._id,
    medicine_name: docMed.medicine_id.name,
    discount: docMed.discount,
  }));

  res.json(medicines);
});

// POST /api/doctor-medicines
router.post("/", async (req, res) => {
  const doctorMedicine = new DoctorMedicine(req.body);
  await doctorMedicine.save();
  res.json(doctorMedicine);
});

// PUT /api/doctor-medicines/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    // Ensure that the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const doctorMedicine = await DoctorMedicine.findByIdAndUpdate(id, update, {
      new: true,
    });

    if (!doctorMedicine) {
      return res
        .status(404)
        .json({ message: "Doctor-Medicine association not found" });
    }

    res.json(doctorMedicine);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE discount for a specific medicine associated with a doctor
router.put("/:doctorId/medicines/:medicineId", async (req, res) => {
  const { doctorId, medicineId } = req.params;
  const { discount } = req.body;

  try {
    // Find the existing doctor-medicine association
    const doctorMedicine = await DoctorMedicine.findOne({
      doctor_id: doctorId,
      medicine_id: medicineId,
    });

    if (!doctorMedicine) {
      return res
        .status(404)
        .json({ message: "Doctor-Medicine association not found" });
    }

    // Update the discount
    doctorMedicine.discount = discount;
    await doctorMedicine.save();

    res.json({ message: "Discount updated successfully", doctorMedicine });
  } catch (error) {
    res.status(500).json({ message: "Error updating discount", error });
  }
});

// DELETE /api/doctor-medicines/:id
router.delete("/:id", async (req, res) => {
  await DoctorMedicine.findByIdAndRemove(req.params.id);
  res.json({ message: "Doctor-Medicine association deleted" });
});

router.post("/bulk", async (req, res) => {
  const associations = req.body;

  for (let assoc of associations) {
    const existingAssociation = await DoctorMedicine.findOne({
      doctor_id: assoc.doctor_id,
      medicine_id: assoc.medicine_id,
    });

    if (existingAssociation) {
      // Update the discount if the association already exists
      existingAssociation.discount = assoc.discount;
      await existingAssociation.save();
    } else {
      // Create a new association if it doesn't exist
      const newAssociation = new DoctorMedicine(assoc);
      await newAssociation.save();
    }
  }

  res.json({ message: "Associations processed successfully" });
});

module.exports = router;
