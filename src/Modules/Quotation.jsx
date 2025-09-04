import React, { useState, useRef, useEffect } from "react";

export default function Quotation() {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { name: "", qty: "", rate: "", amount: 0 },
    { name: "", qty: "", rate: "", amount: 0 },
    { name: "", qty: "", rate: "", amount: 0 },
  ]);
  const [cgst, setCgst] = useState(9);
  const [sgst, setSgst] = useState(9);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [preparedBy, setPreparedBy] = useState("");
  const printRef = useRef();

  useEffect(() => {
    calculateTotal();
  }, [items, cgst, sgst]);

  const handleChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    if (field === "qty" || field === "rate") {
      const q = parseFloat(newItems[index].qty) || 0;
      const r = parseFloat(newItems[index].rate) || 0;
      newItems[index].amount = q * r;
    }
    setItems(newItems);
  };

  const addRow = () =>
    setItems([...items, { name: "", qty: "", rate: "", amount: 0 }]);

  const removeRow = (index) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const calculateTotal = () => {
    const sum = items.reduce((acc, i) => acc + i.amount, 0);
    setSubTotal(sum);
    const tax = sum * ((parseFloat(cgst) + parseFloat(sgst)) / 100);
    setTotal(sum + tax);
  };

  const handlePrint = () => {
    calculateTotal();
    const printContent = `
      <html>
        <head>
          <title>Quotation</title>
          <style>
            table { width: 100%; border-collapse: collapse; text-align: center; }
            table, th, td { border: 1px solid black; }
            th, td { padding: 8px; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <h2>Quotation</h2>
          <p>Customer Name: ${customer}</p>
          ${printRef.current.innerHTML}
        </body>
      </html>
    `;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(printContent);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Quotation</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>Customer Name: </label>
        <input
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div ref={printRef}>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <input
                    value={item.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleChange(index, "qty", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) =>
                      handleChange(index, "rate", e.target.value)
                    }
                  />
                </td>
                <td>{item.amount.toFixed(2)}</td>
                <td>
                  <button
                    onClick={() => removeRow(index)}
                    style={{
                      background: "red",
                      color: "#fff",
                      border: "none",
                      padding: "4px 8px",
                      borderRadius: "4px",
                    }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "20px" }}>
          <button onClick={addRow} style={{ marginTop: "10px" }}>
            Add Row
          </button>

          <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
          <p>
            GST {cgst}% + SGST {sgst}%: ₹
            {((subTotal * (cgst + sgst)) / 100).toFixed(2)}
          </p>
          <p>Total: ₹{total.toFixed(2)}</p>

          <div style={{ marginTop: "20px" }}>
            <div style={{ marginBottom: "10px" }}>
              <label>Ink Type: </label>
              <input type="text" placeholder="e.g. Offset / Flexo" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Ink Subtype: </label>
              <input
                type="text"
                placeholder="e.g. Solvent-based / Water-based"
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Color: </label>
              <input type="text" placeholder="e.g. Cyan, Magenta" />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Packaging: </label>
              <select>
                <option value="Tin">Tin</option>
                <option value="Bottle">Bottle</option>
                <option value="Drum">Drum</option>
              </select>
            </div>
          </div>
        </div>

        <p style={{ marginTop: "20px" }}>
          Prepared by:{" "}
          <input
            type="text"
            value={preparedBy}
            onChange={(e) => setPreparedBy(e.target.value)}
          />
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}
