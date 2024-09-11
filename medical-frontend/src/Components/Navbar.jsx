// Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <a href="/" className="text-2xl font-bold hover:text-blue-300">
            Home
          </a>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {/* Hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <ul className="hidden md:flex space-x-4">
          {/* Desktop Links */}
          <li>
            <Link to="/admin" className="hover:text-blue-300">
              AdminPage
            </Link>
          </li>
          <li>
            <Link to="/information" className="hover:text-blue-300">
              InformationPage
            </Link>
          </li>
          <li>
            <Link to="/doctor-dashboard" className="hover:text-blue-300">
              Doctors Info
            </Link>
          </li>
          <li>
            <Link to="/discount-edit" className="hover:text-blue-300">
              Edit Discount
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden mt-4 space-y-4">
          <li>
            <Link to="/admin" className="block hover:text-blue-300">
              AdminPage
            </Link>
          </li>
          <li>
            <Link to="/information" className="block hover:text-blue-300">
              InformationPage
            </Link>
          </li>
          <li>
            <Link to="/doctor-dashboard" className="block hover:text-blue-300">
              Doctors Info
            </Link>
          </li>
          <li>
            <Link to="/discount-edit" className="block hover:text-blue-300">
              Edit Discount
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
