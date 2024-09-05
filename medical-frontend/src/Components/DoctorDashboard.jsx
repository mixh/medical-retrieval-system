import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { API_URL } from "../api";

const DoctorDashboard = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [open, setOpen] = useState(false);

  // Fetch all doctors on component mount
  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${API_URL}/doctors`);
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleDeleteClick = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedDoctor(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${API_URL}/doctors/${selectedDoctor._id}`);
      setDoctors(doctors.filter((doc) => doc._id !== selectedDoctor._id));
      setOpen(false);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor._id} className="shadow-lg">
            <CardContent>
              <Typography variant="h5" className="font-semibold">
                {doctor.name}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {doctor.address}
              </Typography>
              <Typography variant="body2" className="text-gray-500">
                {doctor.phone_number}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                className="mt-4"
                onClick={() => handleDeleteClick(doctor)}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Confirmation Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete Dr. {selectedDoctor?.name}?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DoctorDashboard;
