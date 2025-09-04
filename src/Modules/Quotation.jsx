import React, { useState } from "react";

export default function Quotation() {
  const [inkType, setInkType] = useState("");
  const [inkSubType, setInkSubType] = useState("");
  const [color, setColor] = useState("");
  const [packaging, setPackaging] = useState("Tin");
  const [qty, setQty] = useState("");
  const [rate, setRate] = useState("");
  const [cgst, setCgst] = useState("9");
  const [sgst, setSgst] = useState("9");
  const [total, setTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const calculate = () => {
    const q = parseFloat(qty) || 0;
    const r = parseFloat(rate) || 0;
    const c = parseFloat(cgst) || 0;
    const s = parseFloat(sgst) || 0;

    const subTotal = q * r;
    const tax = subTotal * ((c + s) / 100);
    setTotal(subTotal);
    setFinalAmount(subTotal + tax);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px" }}>
      <h2>Quotation & Estimation (Ink)</h2>

      <div style={{ marginBottom: "10px" }}>
        <label>Ink Type: </label>
        <input
          type="text"
          value={inkType}
          onChange={(e) => setInkType(e.target.value)}
          placeholder="e.g. Offset / Flexo"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Ink Subtype: </label>
        <input
          type="text"
          value={inkSubType}
          onChange={(e) => setInkSubType(e.target.value)}
          placeholder="e.g. Solvent / Water"
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Color: </label>
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="e.g. Cyan"
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
        <label>Quantity: </label>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>Rate per unit: </label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        />
      </div>

      <div style={{ marginBottom: "10px" }}>
        <label>CGST %: </label>
        <input
          type="number"
          value={cgst}
          onChange={(e) => setCgst(e.target.value)}
        />
        <label> SGST %: </label>
        <input
          type="number"
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
        />
      </div>

      <button onClick={calculate}>Calculate</button>

      <h3 style={{ marginTop: "15px" }}>Subtotal: ₹{total.toFixed(2)}</h3>
      <h3>Total with GST: ₹{finalAmount.toFixed(2)}</h3>

      <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
        {inkType} ({inkSubType}) Ink — Color: {color}, Packaging: {packaging}
      </p>
    </div>
  );
}
