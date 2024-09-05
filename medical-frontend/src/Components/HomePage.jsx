import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../api";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [selectedMedicines, setSelectedMedicines] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [showQuantity, setShowQuantity] = useState({});

  //const location = useLocation();
  const navigate = useNavigate();

  // Fetch doctors based on search query
  useEffect(() => {
    if (searchQuery) {
      axios
        .get(`${API_URL}/doctors/search?name=${searchQuery}`)
        .then((response) => setDoctors(response.data))
        .catch((error) => console.error("Error fetching doctors:", error));
    } else {
      setDoctors([]);
    }
  }, [searchQuery]);

  // Fetch medicines when a doctor is selected
  useEffect(() => {
    if (selectedDoctor) {
      axios
        .get(`${API_URL}/doctor-medicines/${selectedDoctor._id}/medicines`)
        .then((response) => setMedicines(response.data))
        .catch((error) => console.error("Error fetching medicines:", error));
    } else {
      setMedicines([]);
    }
  }, [selectedDoctor]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setSelectedMedicines([]);
    setQuantities({});
  };

  const handleMedicineSelect = (medicine) => {
    setSelectedMedicines((prevSelected) =>
      prevSelected.includes(medicine)
        ? prevSelected.filter((m) => m !== medicine)
        : [...prevSelected, medicine]
    );
  };

  const handleQuantityChange = (medicineId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [medicineId]: parseInt(quantity),
    }));
    if (
      parseInt(quantity) > 0 &&
      !selectedMedicines.includes(
        medicines.find((m) => m.medicine_id === medicineId)
      )
    ) {
      setSelectedMedicines((prevSelected) => [
        ...prevSelected,
        medicines.find((m) => m.medicine_id === medicineId),
      ]);
    }
  };

  const handleSubmit = () => {
    const selectedOrder = {
      doctor: selectedDoctor,
      medicines: selectedMedicines.map((medicine) => ({
        ...medicine,
        quantity: quantities[medicine.medicine_id] || 0,
      })),
    };

    navigate("/order-summary", { state: { order: selectedOrder } });
  };

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <TextField
            label="Search Doctor"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearchChange}
            fullWidth
            className="mb-4"
          />

          {doctors.length > 0 && (
            <div className="mb-4">
              {doctors.map((doctor) => (
                <Card
                  key={doctor._id}
                  className="mb-2 cursor-pointer bg-white shadow-md rounded-lg p-4"
                  onClick={() => handleDoctorSelect(doctor)}
                >
                  <CardContent>
                    <Typography variant="h6">{doctor.name}</Typography>
                    <Typography>{doctor.address}</Typography>
                    <Typography>{doctor.phone_number}</Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {selectedDoctor && (
          <div className="mb-4">
            <Typography variant="h6" className="mb-2">
              Medicines for {selectedDoctor.name}
            </Typography>
            {medicines.map((medicine) => (
              <Card
                key={medicine.medicine_id}
                className="mb-2 cursor-pointer bg-white shadow-md rounded-lg p-4"
                onClick={() => handleMedicineSelect(medicine)}
              >
                <CardContent>
                  <Typography variant="h6">{medicine.medicine_name}</Typography>
                  <Typography>Discount: {medicine.discount}%</Typography>
                  {(selectedMedicines.includes(medicine) ||
                    showQuantity[medicine.medicine_id]) && (
                    <TextField
                      label="Quantity"
                      type="number"
                      variant="outlined"
                      value={quantities[medicine.medicine_id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(
                          medicine.medicine_id,
                          e.target.value
                        )
                      }
                      fullWidth
                      className="mt-2"
                      onFocus={() =>
                        setShowQuantity((prevShow) => ({
                          ...prevShow,
                          [medicine.medicine_id]: true,
                        }))
                      }
                      onBlur={() =>
                        setShowQuantity((prevShow) => ({
                          ...prevShow,
                          [medicine.medicine_id]: false,
                        }))
                      }
                    />
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {selectedMedicines.length > 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Submit Order
        </Button>
      )}
    </div>
  );
}
export default HomePage;
