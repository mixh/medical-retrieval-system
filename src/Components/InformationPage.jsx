import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import { API_URL } from "../api";

function InformationPage() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [medicines, setMedicines] = useState([]);

  // Fetch all doctors on component mount
  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => setDoctors(response.data))
      .catch((error) => console.error("Error fetching doctors:", error));
  }, []);

  // Fetch medicines when a doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`${API_URL}/doctor-medicines/${selectedDoctor._id}/medicines`)
        .then((response) => {
          setMedicines(response.data);
        })
        .catch((error) => console.error("Error fetching medicines:", error));
    }
  }, [selectedDoctor]);

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
  };

  const handleDoctorInfoChange = (e) => {
    setSelectedDoctor({
      ...selectedDoctor,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateDoctor = () => {
    axios
      .put(`${API_URL}/doctors/${selectedDoctor._id}`, selectedDoctor)
      .then(() => {
        alert("Doctor information updated successfully!");
        window.location.reload();
      })
      .catch((error) => console.error("Error updating doctor info:", error));
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Grid container spacing={4}>
        {/* Doctors List */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" className="mb-4 text-gray-700">
            Doctors List
          </Typography>
          {doctors.map((doctor) => (
            <Card
              key={doctor._id}
              className="mb-4 cursor-pointer shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleDoctorSelect(doctor)}
            >
              <CardContent>
                <Typography variant="h6" className="text-gray-800">
                  {doctor.name}
                </Typography>
                <Typography className="text-gray-600">
                  {doctor.address}
                </Typography>
                <Typography className="text-gray-600">
                  {doctor.phone_number}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>

        {/* Doctor Information and Medicines */}
        <Grid item xs={12} md={8}>
          {selectedDoctor && (
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <Typography variant="h5" className="mb-4 text-gray-700">
                Edit Doctor Information
              </Typography>
              <TextField
                label="Name"
                name="name"
                value={selectedDoctor.name}
                onChange={handleDoctorInfoChange}
                fullWidth
                className="mb-4"
                variant="outlined"
              />
              <TextField
                label="Address"
                name="address"
                value={selectedDoctor.address}
                onChange={handleDoctorInfoChange}
                fullWidth
                className="mb-4"
                variant="outlined"
              />
              <TextField
                label="Phone Number"
                name="phone_number"
                value={selectedDoctor.phone_number}
                onChange={handleDoctorInfoChange}
                fullWidth
                className="mb-6"
                variant="outlined"
              />

              <Typography variant="h6" className="mb-4 text-gray-700">
                Medicines and Discounts
              </Typography>
              {medicines.map((medicine) => (
                <Card key={medicine.medicine_id} className="mb-4 shadow-md">
                  <CardContent>
                    <Typography variant="h6" className="text-gray-800">
                      {medicine.medicine_name}
                    </Typography>
                    <Typography className="text-gray-600">
                      Discount: {medicine.discount}%
                    </Typography>
                  </CardContent>
                </Card>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={handleUpdateDoctor}
                className="mt-4"
              >
                Update Doctor Information
              </Button>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
}
export default InformationPage;
