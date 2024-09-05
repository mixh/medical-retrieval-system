import React from "react";
import { useLocation } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";
import * as XLSX from "xlsx"; // Import all functions from xlsx

function OrderSummary() {
  const location = useLocation();
  const { order } = location.state;
  const date = new Date().toLocaleDateString(); // get current date
  const doc = order.doctor.name;

  const handleExportToExcel = () => {
    const data = [
      ["Order Summary"],
      ["Date", date],
      [],
      ["Doctor Information"],
      ["Name", order.doctor.name],
      ["Address", order.doctor.address],
      ["Phone", order.doctor.phone_number],
      [],
      ["Medicines Ordered"],
      ["Name", "Discount", "Quantity"],
      ...order.medicines.map((medicine) => [
        medicine.medicine_name,
        `${medicine.discount}%`,
        medicine.quantity,
      ]),
    ];

    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Order Summary");
    XLSX.writeFile(wb, `order-${doc}-${date}.xlsx`);
  };

  const handleEmail = () => {
    const emailSubject = `Order Summary for ${doc} on ${date}`;
    const emailBody = `
Order Summary
=============
Date: ${date}

Doctor Information
------------------
Name: ${order.doctor.name}
Address: ${order.doctor.address}
Phone: ${order.doctor.phone_number}

Medicines Ordered
-----------------
Name            | Discount    | Quantity
-----------------------------------------
${order.medicines
  .map(
    (medicine) =>
      `${medicine.medicine_name.padEnd(15)} | ${medicine.discount}%       | ${
        medicine.quantity
      }`
  )
  .join("\n")}
`;

    const mailtoLink = `mailto:?subject=${encodeURIComponent(
      emailSubject
    )}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailtoLink, "_blank");
  };

  return (
    <div className="p-4">
      <Typography variant="h4" className="mb-4">
        Order Summary
      </Typography>
      <Typography variant="h6" className="mb-4">
        Date: {date}
      </Typography>

      <Card className="mb-4">
        <CardContent>
          <Typography variant="h6">Doctor Information</Typography>
          <Typography>Name: {order.doctor.name}</Typography>
          <Typography>Address: {order.doctor.address}</Typography>
          <Typography>Phone: {order.doctor.phone_number}</Typography>
        </CardContent>
      </Card>

      <Typography variant="h6" className="mb-2">
        Medicines Ordered
      </Typography>
      {order.medicines.map((medicine) => (
        <Card key={medicine.medicine_id} className="mb-2">
          <CardContent>
            <Typography>Name: {medicine.medicine_name}</Typography>
            <Typography>Discount: {medicine.discount}%</Typography>
            <Typography>Quantity: {medicine.quantity}</Typography>
          </CardContent>
        </Card>
      ))}

      <Button variant="contained" color="primary" onClick={handleExportToExcel}>
        Export to Excel
      </Button>

      <Button variant="contained" color="primary" onClick={handleEmail}>
        Send Gmail
      </Button>
    </div>
  );
}

export default OrderSummary;
