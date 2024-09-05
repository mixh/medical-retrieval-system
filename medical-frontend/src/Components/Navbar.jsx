// Navbar.js
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <ul className="flex justify-between">
        <li>
          <a href="/" className="mr-4 hover:text-blue-300">
            Home
          </a>
        </li>
        <li>
          <Link to="/admin" className="mr-4 hover:text-blue-300">
            AdminPage
          </Link>
        </li>
        <li>
          <Link to="/information" className="mr-4 hover:text-blue-300">
            InformationPage
          </Link>
        </li>
        <li>
          <Link to="/doctor-dashboard" className="mr-4 hover:text-blue-300">
            Doctors Info
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
