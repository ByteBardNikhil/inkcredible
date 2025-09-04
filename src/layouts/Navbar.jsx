import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");

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
        <li>
          <Link to="/quotation" onClick={() => setMenuOpen(false)}>
            Quotation
          </Link>
        </li>
        <li>
          <Link to="/orders" onClick={() => setMenuOpen(false)}>
            Orders
          </Link>
        </li>
        <li>
          <Link to="/production" onClick={() => setMenuOpen(false)}>
            Production
          </Link>
        </li>
        <li>
          <Link to="/inventory" onClick={() => setMenuOpen(false)}>
            Inventory
          </Link>
        </li>
        <li>
          <Link to="/quality" onClick={() => setMenuOpen(false)}>
            Quality
          </Link>
        </li>
        <li>
          <Link to="/dispatch" onClick={() => setMenuOpen(false)}>
            Dispatch
          </Link>
        </li>
        <li>
          <Link to="/finance" onClick={() => setMenuOpen(false)}>
            Finance
          </Link>
        </li>
        <li>
          <Link to="/analytics" onClick={() => setMenuOpen(false)}>
            Analytics
          </Link>
        </li>
        <li>
          <Link to="/HR" onClick={() => setMenuOpen(false)}>
            HR
          </Link>
        </li>
        <li
          onClick={() => {
            const current = theme;
            const next = current === "dark" ? "light" : "dark";
            setTheme(next);
            document.documentElement.setAttribute("data-theme", next);
          }}
          className="theme"
        >
          {theme === "dark" ? "🌙" : "🌞"}
        </li>
      </ul>
    </nav>
  );
}
