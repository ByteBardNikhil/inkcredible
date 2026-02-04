import React, { useState } from "react";

export default function Dispatch() {
  const [dispatches, setDispatches] = useState([]);
  const [orderNo, setOrderNo] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [driver, setDriver] = useState("");
  const [destination, setDestination] = useState("");
  const [status, setStatus] = useState("Pending");

  const addDispatch = () => {
    if (!orderNo || !vehicleNo || !driver || !destination) return;
    const newDispatch = {
      id: dispatches.length + 1,
      orderNo,
      vehicleNo,
      driver,
      destination,
      status,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    setDispatches([...dispatches, newDispatch]);
    setOrderNo("");
    setVehicleNo("");
    setDriver("");
    setDestination("");
    setStatus("Pending");
  };

  const updateStatus = (id, newStatus) => {
    setDispatches(
      dispatches.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dispatch & Delivery</h2>
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Order No"
          value={orderNo}
          onChange={(e) => setOrderNo(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Vehicle No"
          value={vehicleNo}
          onChange={(e) => setVehicleNo(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Driver Name"
          value={driver}
          onChange={(e) => setDriver(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />{" "}
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>In Transit</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>{" "}
        <button onClick={addDispatch}>Add Dispatch</button>
      </div>

      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Order No</th>
            <th>Vehicle</th>
            <th>Driver</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {dispatches.length === 0 ? (
            <tr>
              <td colSpan="9" style={{ textAlign: "center" }}>
                No Dispatch Records
              </td>
            </tr>
          ) : (
            dispatches.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.orderNo}</td>
                <td>{d.vehicleNo}</td>
                <td>{d.driver}</td>
                <td>{d.destination}</td>
                <td>{d.date}</td>
                <td>{d.time}</td>
                <td>{d.status}</td>
                <td>
                  <select
                    value={d.status}
                    onChange={(e) => updateStatus(d.id, e.target.value)}
                  >
                    <option>Pending</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
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
