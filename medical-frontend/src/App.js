// App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./Components/HomePage";
import OrderSummary from "./Components/OrderSummary";
import Navbar from "./Components/Navbar";
import AdminPage from "./Components/AdminPage";
import InformationPage from "./Components/InformationPage";
import DoctorDashboard from "./Components/DoctorDashboard";
import DoctorDiscountForm from "./Components/DoctorDiscountForm";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/information" element={<InformationPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/discount-edit" element={<DoctorDiscountForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
