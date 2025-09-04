import React, { useState, useRef } from "react";

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
    const printContent = printRef.current.innerHTML;
    const WinPrint = window.open("", "", "width=900,height=650");
    WinPrint.document.write(
      `<html><head><title>Quotation</title></head><body>${printContent}</body></html>`
    );
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
  };

  const handleDownload = () => {
    calculateTotal();
    const element = document.createElement("a");
    const content = printRef.current.innerHTML;
    const file = new Blob([content], { type: "text/html" });
    element.href = URL.createObjectURL(file);
    element.download = "quotation.html";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
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
        <table
          border="1"
          cellPadding="8"
          style={{ width: "100%", marginBottom: "10px" }}
        >
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
          <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
          <p>
            GST {cgst}% + SGST {sgst}%: ₹
            {((subTotal * (cgst + sgst)) / 100).toFixed(2)}
          </p>
          <p>Total: ₹{total.toFixed(2)}</p>
          <button onClick={calculateTotal} style={{ marginLeft: "10px" }}>
            Add
          </button>
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
        <button onClick={addRow}>Add Row</button>
        <button onClick={handleDownload} style={{ marginLeft: "10px" }}>
          Download
        </button>
        <button onClick={handlePrint} style={{ marginLeft: "10px" }}>
          Print
        </button>
      </div>
    </div>
  );
}
