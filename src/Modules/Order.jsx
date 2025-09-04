import React, { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([
    {
      date: "2025-09-04",
      customer: "ABC Printworks",
      poNumber: "PO101",
      poDate: "2025-09-01",
      qty: 500,
      edd: "2025-09-10",
      status: "Pending",
    },
    {
      date: "2025-09-04",
      customer: "InkMasters",
      poNumber: "PO102",
      poDate: "2025-09-02",
      qty: 300,
      edd: "2025-09-12",
      status: "In Production",
    },
    {
      date: "2025-09-04",
      customer: "Flexo Solutions",
      poNumber: "PO103",
      poDate: "2025-09-03",
      qty: 200,
      edd: "2025-09-11",
      status: "Completed",
    },
    {
      date: "2025-09-04",
      customer: "ColorTech",
      poNumber: "PO104",
      poDate: "2025-09-01",
      qty: 450,
      edd: "2025-09-09",
      status: "Dispatched",
    },
    {
      date: "2025-09-04",
      customer: "PrintHub",
      poNumber: "PO105",
      poDate: "2025-09-02",
      qty: 350,
      edd: "2025-09-13",
      status: "Pending",
    },
    {
      date: "2025-09-04",
      customer: "InkCraft",
      poNumber: "PO106",
      poDate: "2025-09-03",
      qty: 600,
      edd: "2025-09-15",
      status: "In Production",
    },
    {
      date: "2025-09-04",
      customer: "FlexPrint",
      poNumber: "PO107",
      poDate: "2025-09-04",
      qty: 250,
      edd: "2025-09-14",
      status: "Completed",
    },
    {
      date: "2025-09-04",
      customer: "PrintWorks",
      poNumber: "PO108",
      poDate: "2025-09-01",
      qty: 400,
      edd: "2025-09-12",
      status: "Dispatched",
    },
    {
      date: "2025-09-04",
      customer: "ColorWave",
      poNumber: "PO109",
      poDate: "2025-09-02",
      qty: 550,
      edd: "2025-09-16",
      status: "Pending",
    },
    {
      date: "2025-09-04",
      customer: "InkSphere",
      poNumber: "PO110",
      poDate: "2025-09-03",
      qty: 300,
      edd: "2025-09-13",
      status: "In Production",
    },
  ]);

  const [selectedPO, setSelectedPO] = useState(null);
  const [customer, setCustomer] = useState("");
  const [poNumber, setPoNumber] = useState("");
  const [poDate, setPoDate] = useState("");
  const [qty, setQty] = useState("");
  const [edd, setEdd] = useState("");

  const addOrder = () => {
    if (!customer || !poNumber || !poDate || !qty || !edd) return;
    const newOrder = {
      date: new Date().toLocaleDateString(),
      customer,
      poNumber,
      poDate,
      qty,
      edd,
      status: "Pending",
    };
    setOrders([...orders, newOrder]);
    setCustomer("");
    setPoNumber("");
    setPoDate("");
    setQty("");
    setEdd("");
  };

  const updateStatus = (index, status) => {
    setOrders(orders.map((o, i) => (i === index ? { ...o, status } : o)));
  };

  const removeOrder = (index) => {
    setOrders(orders.filter((_, i) => i !== index));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Management</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="PO Number"
          value={poNumber}
          onChange={(e) => setPoNumber(e.target.value)}
        />{" "}
        <input
          type="date"
          value={poDate}
          onChange={(e) => setPoDate(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="PO Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />{" "}
        <input
          type="date"
          value={edd}
          onChange={(e) => setEdd(e.target.value)}
        />{" "}
        <button onClick={addOrder}>Add Order</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer Name</th>
            <th>PO Number</th>
            <th>PO Date</th>
            <th>PO Quantity</th>
            <th>EDD</th>
            <th>Status</th>
            <th>Update</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Orders Yet
              </td>
            </tr>
          ) : (
            orders.map((o, index) => (
              <tr key={index}>
                <td>{o.date}</td>
                <td>{o.customer}</td>
                <td
                  style={{
                    color: "blue",
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                  onClick={() => setSelectedPO(o)}
                >
                  {o.poNumber}
                </td>
                <td>{o.poDate}</td>
                <td>{o.qty}</td>
                <td>{o.edd}</td>
                <td>{o.status}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(index, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Production</option>
                    <option>Completed</option>
                    <option>Dispatched</option>
                  </select>
                </td>
                <td>
                  <button onClick={() => removeOrder(index)}>Remove</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {selectedPO && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3>PO Details</h3>
            <p>
              <b>Customer:</b> {selectedPO.customer}
            </p>
            <p>
              <b>PO Number:</b> {selectedPO.poNumber}
            </p>
            <p>
              <b>PO Date:</b> {selectedPO.poDate}
            </p>
            <p>
              <b>Quantity:</b> {selectedPO.qty}
            </p>
            <p>
              <b>EDD:</b> {selectedPO.edd}
            </p>
            <p>
              <b>Status:</b> {selectedPO.status}
            </p>
            <button onClick={() => setSelectedPO(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
