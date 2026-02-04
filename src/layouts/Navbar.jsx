import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const location = useLocation();

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <nav className="navbar">
      <div className="logo">InkCredible ERP</div>
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link
            to="/inkcredible/quotation"
            className={location.pathname.includes("quotation") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Quotation
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/orders"
            className={location.pathname.includes("orders") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Orders
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/production"
            className={location.pathname.includes("production") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Production
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/inventory"
            className={location.pathname.includes("inventory") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Inventory
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/quality"
            className={location.pathname.includes("quality") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Quality
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/dispatch"
            className={location.pathname.includes("dispatch") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Dispatch
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/finance"
            className={location.pathname.includes("finance") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Finance
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/analytics"
            className={location.pathname.includes("analytics") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            Analytics
          </Link>
        </li>
        <li>
          <Link
            to="/inkcredible/hr"
            className={location.pathname.includes("hr") ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            HR
          </Link>
        </li>
        <li onClick={toggleTheme} className="theme">
          {theme === "dark" ? "🌙" : "🌞"}
        </li>
      </ul>
    </nav>
  );
}
