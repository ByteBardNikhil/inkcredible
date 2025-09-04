import React, { useState } from "react";

export default function Finance() {
  const [records, setRecords] = useState([]);
  const [type, setType] = useState("Invoice");
  const [party, setParty] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("Unpaid");

  const addRecord = () => {
    if (!party || !amount) return;
    const newRec = {
      id: records.length + 1,
      type,
      party,
      amount: parseFloat(amount),
      status,
      date: new Date().toLocaleDateString(),
    };
    setRecords([...records, newRec]);
    setParty("");
    setAmount("");
    setType("Invoice");
    setStatus("Unpaid");
  };

  const updateStatus = (id, newStatus) => {
    setRecords(
      records.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  const totalInvoice = records
    .filter((r) => r.type === "Invoice")
    .reduce((sum, r) => sum + r.amount, 0);

  const totalPayment = records
    .filter((r) => r.type === "Payment")
    .reduce((sum, r) => sum + r.amount, 0);

  const outstanding = totalInvoice - totalPayment;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Finance Management</h2>

      <div style={{ marginBottom: "15px" }}>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Invoice</option>
          <option>Payment</option>
        </select>{" "}
        <input
          type="text"
          placeholder="Party Name"
          value={party}
          onChange={(e) => setParty(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />{" "}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Unpaid</option>
          <option>Paid</option>
          <option>Overdue</option>
        </select>{" "}
        <button onClick={addRecord}>Add</button>
      </div>

      <h3>Summary</h3>
      <p>Total Invoices: ₹{totalInvoice}</p>
      <p>Total Payments: ₹{totalPayment}</p>
      <p>Outstanding: ₹{outstanding}</p>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "15px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Party</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Records
              </td>
            </tr>
          ) : (
            records.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.type}</td>
                <td>{r.party}</td>
                <td>₹{r.amount}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
                <td>
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                  >
                    <option>Unpaid</option>
                    <option>Paid</option>
                    <option>Overdue</option>
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
