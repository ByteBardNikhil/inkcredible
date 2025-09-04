import React, { useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [customer, setCustomer] = useState("");
  const [product, setProduct] = useState("");
  const [qty, setQty] = useState("");
  const [dueDate, setDueDate] = useState("");

  const addOrder = () => {
    if (!customer || !product || !qty || !dueDate) return;
    const newOrder = {
      id: orders.length + 1,
      customer,
      product,
      qty,
      dueDate,
      status: "Pending",
    };
    setOrders([...orders, newOrder]);
    setCustomer("");
    setProduct("");
    setQty("");
    setDueDate("");
  };

  const updateStatus = (id, status) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Order Management</h2>

      {/* Add Order Form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Customer Name"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Ink Product (e.g. Flexo Cyan)"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Quantity"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />{" "}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />{" "}
        <button onClick={addOrder}>Add Order</button>
      </div>

      {/* Orders Table */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {orders.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Orders Yet
              </td>
            </tr>
          ) : (
            orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>{o.product}</td>
                <td>{o.qty}</td>
                <td>{o.dueDate}</td>
                <td>{o.status}</td>
                <td>
                  <select
                    value={o.status}
                    onChange={(e) => updateStatus(o.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Production</option>
                    <option>Completed</option>
                    <option>Dispatched</option>
                  </select>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
