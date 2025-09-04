import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute(
      "data-theme",
      current === "dark" ? "light" : "dark"
    );
  };

  return (
    <nav className="navbar">
      <div className="logo">InkCredible ERP</div>

      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>Quotation</li>
        <li>Orders</li>
        <li>Production</li>
        <li>Inventory</li>
        <li>Quality</li>
        <li>Dispatch</li>
        <li>Finance</li>
        <li>Analytics</li>
        <li onClick={toggleTheme}>🌓</li>
      </ul>
    </nav>
  );
}
