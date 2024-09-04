// MedicineForm.js
import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../api";

function MedicineForm({ medicines, setMedicines }) {
  const [medicineName, setMedicineName] = useState("");
  const [medicineId, setMedicineId] = useState("");

  const handleAddOrUpdateMedicine = () => {
    const data = { name: medicineName };
    if (medicineId) {
      axios
        .put(`${API_URL}/medicines/${medicineId}`, data)
        .then(() => alert("Medicine updated successfully"))
        .catch((error) => console.error("Error updating medicine:", error));
    } else {
      axios
        .post(`${API_URL}/medicines`, data)
        .then((response) => {
          setMedicines((prevMedicines) => [...prevMedicines, response.data]);
          alert("Medicine added successfully");
          window.location.reload();
        })
        .catch((error) => console.error("Error adding medicine:", error));
    }
    setMedicineName("");
    setMedicineId("");
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6">Add Medicine</Typography>
        <TextField
          label="Medicine Name"
          value={medicineName}
          onChange={(e) => setMedicineName(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button
          onClick={handleAddOrUpdateMedicine}
          variant="contained"
          color="primary"
        >
          {medicineId ? "Update Medicine" : "Add Medicine"}
        </Button>
      </CardContent>
    </Card>
  );
}

export default MedicineForm;
