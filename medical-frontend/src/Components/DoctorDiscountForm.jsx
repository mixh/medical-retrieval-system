import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import { API_URL } from "../api"; // Assuming you have this set up

const DoctorDiscountForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [newDiscount, setNewDiscount] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch all doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${API_URL}/doctors`);
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors", error);
      }
    };
    fetchDoctors();
  }, []);

  // Fetch medicines for a selected doctor
  const fetchMedicinesForDoctor = async (doctorId) => {
    try {
      const response = await axios.get(
        `${API_URL}/doctor-medicines/${doctorId}/medicines`
      );
      setMedicines(response.data);
    } catch (error) {
      console.error("Error fetching medicines", error);
    }
  };

  // Handle doctor selection
  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    fetchMedicinesForDoctor(doctor._id);
  };

  // Open modal to edit discount
  const handleEditDiscount = (medicine) => {
    setSelectedMedicine(medicine);
    setNewDiscount(medicine.discount);
    setOpen(true);
  };

  // Handle discount update
  const handleUpdateDiscount = async () => {
    try {
      await axios.put(
        `${API_URL}/doctor-medicines/${selectedDoctor._id}/medicines/${selectedMedicine.medicine_id}`,
        {
          discount: newDiscount,
        }
      );
      setOpen(false);
      fetchMedicinesForDoctor(selectedDoctor._id); // Refresh medicines list
    } catch (error) {
      console.error("Error updating discount", error);
    }
  };

  // Handle delete association
  const handleDeleteAssociation = async (medicineId) => {
    try {
      await axios.delete(
        `${API_URL}/doctor-medicines/${selectedDoctor._id}/medicines/${medicineId}`
      );
      fetchMedicinesForDoctor(selectedDoctor._id); // Refresh medicines list
      alert("Association deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting association", error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Typography variant="h4" gutterBottom className="text-center mb-6">
        Doctor Dashboard
      </Typography>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Doctor Cards */}
        {doctors.map((doctor) => (
          <Card key={doctor._id} className="border shadow-lg">
            <CardContent>
              <Typography variant="h6">{doctor.name}</Typography>
              <Typography variant="body2">{doctor.address}</Typography>
              <Typography variant="body2">{doctor.phone_number}</Typography>
              <Button
                variant="contained"
                className="mt-3"
                onClick={() => handleSelectDoctor(doctor)}
              >
                View Medicines
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedDoctor && (
        <div className="mt-8">
          <Typography variant="h5" gutterBottom>
            Medicines for {selectedDoctor.name}
          </Typography>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {medicines.map((medicine) => (
              <Card key={medicine.medicine_id} className="border shadow-lg">
                <CardContent>
                  <Typography variant="h6">{medicine.medicine_name}</Typography>
                  <Typography variant="body2">
                    Discount: {medicine.discount}%
                  </Typography>
                  <Button
                    variant="outlined"
                    className="mt-2"
                    onClick={() => handleEditDiscount(medicine)}
                  >
                    Edit Discount
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    className="mt-2 ml-2"
                    onClick={() =>
                      handleDeleteAssociation(medicine.medicine_id)
                    }
                  >
                    Delete Association
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Editing Discount */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box className="bg-white p-6 mx-auto mt-10 rounded-lg shadow-lg max-w-md">
          <Typography variant="h6">
            Edit Discount for {selectedMedicine?.medicine_name}
          </Typography>
          <TextField
            label="New Discount"
            variant="outlined"
            value={newDiscount}
            onChange={(e) => setNewDiscount(e.target.value)}
            fullWidth
            className="mt-4"
          />
          <Button
            variant="contained"
            className="mt-4"
            onClick={handleUpdateDiscount}
          >
            Update Discount
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default DoctorDiscountForm;
