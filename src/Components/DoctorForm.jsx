// AddDoctorForm.js
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

function AddDoctorForm({ setDoctors }) {
  const [doctorName, setDoctorName] = useState("");
  const [doctorAddress, setDoctorAddress] = useState("");
  const [doctorPhoneNumber, setDoctorPhoneNumber] = useState("");

  const handleAddDoctor = () => {
    const data = {
      name: doctorName,
      address: doctorAddress,
      phone_number: doctorPhoneNumber,
    };
    axios
      .post(`${API_URL}/doctors`, data)
      .then((response) => {
        setDoctors((prevDoctors) => [...prevDoctors, response.data]);
        alert("Doctor added successfully");
        window.location.reload();
      })
      .catch((error) => console.error("Error adding doctor:", error));
    setDoctorName("");
    setDoctorAddress("");
    setDoctorPhoneNumber("");
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h6">Add Doctor</Typography>
        <TextField
          label="Doctor Name"
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Address"
          value={doctorAddress}
          onChange={(e) => setDoctorAddress(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <TextField
          label="Phone Number"
          value={doctorPhoneNumber}
          onChange={(e) => setDoctorPhoneNumber(e.target.value)}
          fullWidth
          className="mb-4"
        />
        <Button onClick={handleAddDoctor} variant="contained" color="primary">
          Add Doctor
        </Button>
      </CardContent>
    </Card>
  );
}

export default AddDoctorForm;
