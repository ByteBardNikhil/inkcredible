import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";

function Quotation() {
  return <h2>Quotation & Estimation Page</h2>;
}
function Orders() {
  return <h2>Order Management Page</h2>;
}
function Production() {
  return <h2>Production Planning Page</h2>;
}
function Inventory() {
  return <h2>Inventory Management Page</h2>;
}
function Quality() {
  return <h2>Quality Control Page</h2>;
}
function Dispatch() {
  return <h2>Dispatch & Delivery Page</h2>;
}
function Finance() {
  return <h2>Finance Page</h2>;
}
function Analytics() {
  return <h2>Analytics Dashboard</h2>;
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
        </Routes>
      </div>
    </Router>
  );
}
