// AdminPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../api";
import DoctorForm from "./DoctorForm";
import MedicineForm from "./MedicineForm";
import AssociationForm from "./AssociationForm";

function AdminPage() {
  const [doctors, setDoctors] = useState([]);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/doctors`)
      .then((response) => setDoctors(response.data));
    axios
      .get(`${API_URL}/medicines`)
      .then((response) => setMedicines(response.data));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-8">
        <DoctorForm doctors={doctors} setDoctors={setDoctors} />
      </div>
      <div className="mb-8">
        <MedicineForm medicines={medicines} setMedicines={setMedicines} />
      </div>
      <div className="mb-8">
        <AssociationForm doctors={doctors} medicines={medicines} />
      </div>
    </div>
  );
}

export default AdminPage;
