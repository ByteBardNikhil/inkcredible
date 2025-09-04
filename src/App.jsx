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
