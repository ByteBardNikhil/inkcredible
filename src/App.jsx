import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Quotation from "./Modules/Quotation";
import Orders from "./Modules/Order";
import Production from "./Modules/Production";
import Inventory from "./Modules/Inventory";
import Quality from "./Modules/Quality";

function Dispatch() {
  return <h2>Dispatch & Delivery Page</h2>;
}
function Finance() {
  return <h2>Finance Page</h2>;
}
function Analytics() {
  return <h2>Analytics Dashboard</h2>;
}
function HR() {
  return <h2>HR Dashboard</h2>;
}

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Quotation />} />
          <Route path="/quotation" element={<Quotation />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/production" element={<Production />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/dispatch" element={<Dispatch />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/HR" element={<HR />} />
        </Routes>
      </div>
    </Router>
  );
}
