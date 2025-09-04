import React, { useState } from "react";

export default function Quotation() {
  const [inkType, setInkType] = useState("");
  const [inkSubType, setInkSubType] = useState("");
  const [color, setColor] = useState("");
  const [packaging, setPackaging] = useState("Tin");
  const [qty, setQty] = useState(""); // string
  const [rate, setRate] = useState(""); // string
  const [cgst, setCgst] = useState("9"); // string
  const [sgst, setSgst] = useState("9"); // string
  const [total, setTotal] = useState(0);
  const [finalAmount, setFinalAmount] = useState(0);

  const calculate = () => {
    const q = Number(qty) || 0;
    const r = Number(rate) || 0;
    const c = Number(cgst) || 0;
    const s = Number(sgst) || 0;

    const subTotal = q * r;
    const tax = subTotal * ((c + s) / 100);
    setTotal(subTotal);
    setFinalAmount(subTotal + tax);
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
        <label>Ink Subtype: </label>
        <input
          type="text"
          value={inkSubType}
          placeholder="e.g. Solvent-based / Water-based"
          onChange={(e) => setInkSubType(e.target.value)}
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
        />{" "}
        <label>SGST %: </label>
        <input
          type="number"
          value={sgst}
          onChange={(e) => setSgst(e.target.value)}
        />
      </div>

      <button onClick={calculate}>Calculate</button>

      <h3 style={{ marginTop: "15px" }}>
        Subtotal: ₹{total} ({qty || 0} × {rate || 0})
      </h3>
      <h3>Total with GST: ₹{finalAmount.toFixed(2)}</h3>

      <p style={{ marginTop: "10px", fontStyle: "italic", color: "gray" }}>
        {inkType} ({inkSubType}) Ink — Color: {color}, Packaging: {packaging}
      </p>
    </div>
  );
}
