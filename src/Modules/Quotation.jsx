import React, { useState } from "react";

export default function Quotation() {
  const [inkType, setInkType] = useState("");
  const [color, setColor] = useState("");
  const [packaging, setPackaging] = useState("Tin");
  const [qty, setQty] = useState(0);
  const [rate, setRate] = useState(0);
  const [total, setTotal] = useState(0);

  const calculate = () => {
    setTotal(qty * rate);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quotation & Estimation (Ink)</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Ink Type: </label>
        <input
          type="text"
          value={inkType}
          placeholder="e.g. Offset / Flexo"
          onChange={(e) => setInkType(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Color: </label>
        <input
          type="text"
          value={color}
          placeholder="e.g. Cyan, Magenta"
          onChange={(e) => setColor(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Packaging: </label>
        <select
          value={packaging}
          onChange={(e) => setPackaging(e.target.value)}
        >
          <option value="Tin">Tin</option>
          <option value="Drum">Drum</option>
          <option value="Bucket">Bucket</option>
        </select>
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Quantity (Kg/Ltr): </label>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Rate per unit: </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(Number(e.target.value))}
        />
      </div>

      <button onClick={calculate}>Calculate</button>

      <h3 style={{ marginTop: "15px" }}>
        Total: ₹{total} ({qty} × {rate})
      </h3>

      <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
        {inkType} Ink ({color}), Packaging: {packaging}
      </p>
    </div>
  );
}
