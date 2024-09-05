import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../api";

function AssociationForm({ doctors, medicines, setDoctors, setMedicines }) {
  const [doctorId, setDoctorId] = useState("");
  const [medicineId, setMedicineId] = useState("");
  const [discount, setDiscount] = useState(""); // Change initial state to an empty string

  const handleAddOrUpdateAssociation = () => {
    const data = {
      doctor_id: doctorId,
      medicine_id: medicineId,
      discount: discount, // This will now be a string
    };
    axios
      .post(`${API_URL}/doctor-medicines`, data)
      .then(() => {
        alert("Association added/updated successfully");
        window.location.reload();
      })
      .catch((error) => console.error("Error updating association:", error));
    setDoctorId("");
    setMedicineId("");
    setDiscount(""); // Reset discount to an empty string after submission
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6">Add Doctor-Medicines Association</Typography>
        <Box sx={{ maxHeight: 200, overflow: "auto" }}>
          <FormControl fullWidth className="mb-4">
            <InputLabel>Select Doctor</InputLabel>
            <Select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
            >
              {doctors.map((doctor) => (
                <MenuItem key={doctor._id} value={doctor._id}>
                  {doctor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="mb-4">
            <InputLabel>Select Medicine</InputLabel>
            <Select
              value={medicineId}
              onChange={(e) => setMedicineId(e.target.value)}
            >
              {medicines.map((medicine) => (
                <MenuItem key={medicine._id} value={medicine._id}>
                  {medicine.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <TextField
          label="Discount"
          type="text" // Change input type to text
          value={discount}
          onChange={(e) => setDiscount(e.target.value)} // No need for number parsing
          fullWidth
          className="mb-4"
        />
        <Button
          onClick={handleAddOrUpdateAssociation}
          variant="contained"
          color="primary"
        >
          {doctorId && medicineId ? "Update Association" : "Add Association"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default AssociationForm;
