import React, { useState, useRef, useEffect } from "react";

export default function Quotation() {
  const [customer, setCustomer] = useState("");
  const [items, setItems] = useState([
    { name: "", color: "", qty: "", rate: "", amount: 0 },
    { name: "", color: "", qty: "", rate: "", amount: 0 },
    { name: "", color: "", qty: "", rate: "", amount: 0 },
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
    const q = parseFloat(newItems[index].qty) || 0;
    const r = parseFloat(newItems[index].rate) || 0;
    newItems[index].amount = q * r;
    setItems(newItems);
  };

  const addRow = () =>
    setItems([...items, { name: "", color: "", qty: "", rate: "", amount: 0 }]);

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
          body { font-family: Arial, sans-serif; margin: 20px; }
          h2, h3 { text-align: center; margin: 5px 0; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          table, th, td { border: 1px solid black; }
          th, td { padding: 8px; text-align: center; }
          p { margin: 4px 0; }
          hr { border: 1px solid #000; margin: 10px 0; }
        </style>
      </head>
      <body>
        <h2>QUOTATION</h2>
        <p>Company Name: [Your Ink Company Name]</p>
        <p>Address: [Full Address]</p>
        <p>Contact: [Phone / Email]</p>
        <p>GST No.: [Your GST No.]</p>
        <p>Quotation No.: [XXXX]</p>
        <p>Date: [DD/MM/YYYY]</p>
        <p>Valid Till: [DD/MM/YYYY]</p>
        <hr />
        <p>To,</p>
        <p>${customer || "[Customer Name / Company]"}</p>
        <p>[Address]</p>
        <hr />
        <h3>Product Details</h3>
        <table>
          <thead>
            <tr>
              <th>Sr. No.</th>
              <th>Product Description</th>
              <th>Color / Grade</th>
              <th>Qty. (Kg/Ltr)</th>
              <th>Rate (₹/Kg)</th>
              <th>Amount (₹)</th>
            </tr>
          </thead>
          <tbody>
            ${items
              .map(
                (item, i) => `
              <tr>
                <td>${i + 1}</td>
                <td>${item.name || "Printing Ink"}</td>
                <td>${item.color || "NTNK"}</td>
                <td>${parseFloat(item.qty || 0)}</td>
                <td>${parseFloat(item.rate || 0).toFixed(2)}</td>
                <td>${parseFloat(item.amount || 0).toFixed(2)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <p>Subtotal: ₹${subTotal.toFixed(2)}</p>
        <p>GST @ ${(cgst + sgst).toFixed(0)}%: ₹${(
      (subTotal * (cgst + sgst)) /
      100
    ).toFixed(2)}</p>
        <p>Total Payable: ₹${total.toFixed(2)}</p>
        <hr />
        <h3>Terms & Conditions</h3>
        <p>1. Prices are ex-factory / ex-warehouse.</p>
        <p>2. Freight, insurance, and handling charges extra (if applicable).</p>
        <p>3. Delivery: [XX days] from the date of order confirmation.</p>
        <p>4. Payment Terms: [Advance / Credit Days].</p>
        <p>5. Quotation valid till [DD/MM/YYYY].</p>
        <hr />
        <p>Authorized Signatory</p>
        <p>${preparedBy || "[Name & Designation]"}</p>
        <p>[Ink Company Name & Seal]</p>
      </body>
    </html>
  `;
    const WinPrint = window.open("", "_blank");
    WinPrint.document.write(printContent);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
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
              <th>Color / Grade</th>
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
                    value={item.color}
                    onChange={(e) =>
                      handleChange(index, "color", e.target.value)
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
                <td>{parseFloat(item.amount || 0).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeRow(index)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "20px" }}>
          <button onClick={addRow}>Add Row</button>
          <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
          <p>
            GST {cgst}% + SGST {sgst}%: ₹
            {((subTotal * (cgst + sgst)) / 100).toFixed(2)}
          </p>
          <p>Total: ₹{total.toFixed(2)}</p>
        </div>

        <p>
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
