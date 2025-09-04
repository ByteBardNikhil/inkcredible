import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Quotation from "./Modules/Quotation";
import Orders from "./Modules/Order";
import Production from "./Modules/Production";
import Inventory from "./Modules/Inventory";
import Quality from "./Modules/Quality";
import Dispatch from "./Modules/Dispatch";
import Finance from "./Modules/Finance";
import Analytics from "./Modules/Analytics";
import HR from "./Modules/HR";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<Quotation />} />
          <Route path="/inkcredible" element={<Quotation />} />
          <Route path="/inkcredible/quotation" element={<Quotation />} />
          <Route path="/inkcredible/orders" element={<Orders />} />
          <Route path="/inkcredible/production" element={<Production />} />
          <Route path="/inkcredible/inventory" element={<Inventory />} />
          <Route path="/inkcredible/quality" element={<Quality />} />
          <Route path="/inkcredible/dispatch" element={<Dispatch />} />
          <Route path="/inkcredible/finance" element={<Finance />} />
          <Route path="/inkcredible/analytics" element={<Analytics />} />
          <Route path="/inkcredible/hr" element={<HR />} />
        </Routes>
      </div>
    </Router>
  );
}
