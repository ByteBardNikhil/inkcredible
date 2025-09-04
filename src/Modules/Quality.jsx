import React, { useState } from "react";

export default function Quality() {
  const [records, setRecords] = useState([]);
  const [batchNo, setBatchNo] = useState("");
  const [defect, setDefect] = useState("");
  const [severity, setSeverity] = useState("Minor");
  const [complaint, setComplaint] = useState("");

  const addRecord = () => {
    if (!batchNo || !defect) return;
    const newRec = {
      id: records.length + 1,
      batchNo,
      defect,
      severity,
      complaint,
      status: "Open",
    };
    setRecords([...records, newRec]);
    setBatchNo("");
    setDefect("");
    setSeverity("Minor");
    setComplaint("");
  };

  const updateStatus = (id, status) => {
    setRecords(records.map((r) => (r.id === id ? { ...r, status } : r)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quality Control</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Batch No"
          value={batchNo}
          onChange={(e) => setBatchNo(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Defect Description"
          value={defect}
          onChange={(e) => setDefect(e.target.value)}
        />{" "}
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option>Minor</option>
          <option>Major</option>
          <option>Critical</option>
        </select>{" "}
        <input
          type="text"
          placeholder="Customer Complaint"
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
        />{" "}
        <button onClick={addRecord}>Add</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Batch</th>
            <th>Defect</th>
            <th>Severity</th>
            <th>Complaint</th>
            <th>Status</th>
            <th>Action</th>
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
                <td>{r.batchNo}</td>
                <td>{r.defect}</td>
                <td>{r.severity}</td>
                <td>{r.complaint}</td>
                <td>{r.status}</td>
                <td>
                  <select
                    value={r.status}
                    onChange={(e) => updateStatus(r.id, e.target.value)}
                  >
                    <option>Open</option>
                    <option>Resolved</option>
                    <option>Rejected</option>
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
