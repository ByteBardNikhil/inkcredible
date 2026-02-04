import React, { useState, useEffect } from "react";

export default function Inventory() {
  const sample = [
    {
      type: "RM",
      item: "Offset Black Ink",
      code: "INK-OF-BLK-1",
      qty: 120,
      pack: "Tin",
      supplier: "AcuInk",
      batch: "B-1024",
      invoice: "INV101",
    },
    {
      type: "RM",
      item: "Flexo Cyan",
      code: "INK-FX-CYN-1",
      qty: 45,
      pack: "Drum",
      supplier: "ColorPlus",
      batch: "F-874",
      invoice: "INV102",
    },
    {
      type: "RM",
      item: "Flexo Magenta",
      code: "INK-FX-MAG-1",
      qty: 60,
      pack: "Drum",
      supplier: "ColorPlus",
      batch: "F-875",
      invoice: "INV103",
    },
    {
      type: "RM",
      item: "Offset Cyan",
      code: "INK-OF-CYN-1",
      qty: 80,
      pack: "Tin",
      supplier: "AcuInk",
      batch: "B-1025",
      invoice: "INV104",
    },
    {
      type: "RM",
      item: "Offset Magenta",
      code: "INK-OF-MAG-1",
      qty: 100,
      pack: "Tin",
      supplier: "AcuInk",
      batch: "B-1026",
      invoice: "INV105",
    },
    {
      type: "RM",
      item: "Solvent (L)",
      code: "SLV-001",
      qty: 300,
      pack: "Barrel",
      supplier: "SolvCorp",
      batch: "S-550",
      invoice: "INV106",
    },
    {
      type: "RM",
      item: "Flexo Yellow",
      code: "INK-FX-YEL-1",
      qty: 55,
      pack: "Drum",
      supplier: "ColorPlus",
      batch: "F-876",
      invoice: "INV107",
    },
    {
      type: "RM",
      item: "Offset Yellow",
      code: "INK-OF-YEL-1",
      qty: 90,
      pack: "Tin",
      supplier: "AcuInk",
      batch: "B-1027",
      invoice: "INV108",
    },
    {
      type: "RM",
      item: "Cleaning Solution",
      code: "CLN-001",
      qty: 150,
      pack: "Ltr",
      supplier: "CleanCo",
      batch: "C-100",
      invoice: "INV109",
    },
    {
      type: "RM",
      item: "Thinner",
      code: "THN-001",
      qty: 200,
      pack: "Ltr",
      supplier: "ThinCo",
      batch: "T-200",
      invoice: "INV110",
    },
    {
      type: "FG",
      item: "Finished Ink Set Black",
      code: "FIN-INK-001",
      qty: 50,
      pack: "Box",
      mfgDate: "2025-08-01",
    },
    {
      type: "FG",
      item: "Finished Ink Set Cyan",
      code: "FIN-INK-002",
      qty: 40,
      pack: "Box",
      mfgDate: "2025-08-02",
    },
    {
      type: "FG",
      item: "Finished Ink Set Magenta",
      code: "FIN-INK-003",
      qty: 35,
      pack: "Box",
      mfgDate: "2025-08-03",
    },
    {
      type: "FG",
      item: "Finished Ink Set Yellow",
      code: "FIN-INK-004",
      qty: 45,
      pack: "Box",
      mfgDate: "2025-08-04",
    },
    {
      type: "FG",
      item: "Premium Flexo Ink",
      code: "FIN-INK-005",
      qty: 30,
      pack: "Box",
      mfgDate: "2025-08-05",
    },
    {
      type: "FG",
      item: "Offset Ink Combo",
      code: "FIN-INK-006",
      qty: 25,
      pack: "Box",
      mfgDate: "2025-08-06",
    },
    {
      type: "FG",
      item: "Flexo Ink Combo",
      code: "FIN-INK-007",
      qty: 20,
      pack: "Box",
      mfgDate: "2025-08-07",
    },
    {
      type: "FG",
      item: "Premium Yellow Ink",
      code: "FIN-INK-008",
      qty: 15,
      pack: "Box",
      mfgDate: "2025-08-08",
    },
    {
      type: "FG",
      item: "Premium Cyan Ink",
      code: "FIN-INK-009",
      qty: 10,
      pack: "Box",
      mfgDate: "2025-08-09",
    },
    {
      type: "FG",
      item: "Premium Magenta Ink",
      code: "FIN-INK-010",
      qty: 5,
      pack: "Box",
      mfgDate: "2025-08-10",
    },
  ];

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    type: "RM",
    item: "",
    code: "",
    qty: 0,
    pack: "",
    supplier: "",
    batch: "",
    invoice: "",
    mfgDate: "",
  });
  const [filterType, setFilterType] = useState("All");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editId, setEditId] = useState(null);

  useEffect(
    () => setItems(sample.map((i, idx) => ({ ...i, id: idx + 1 }))),
    []
  );

  const filtered = items.filter(
    (i) => filterType === "All" || i.type === filterType
  );

  const addOrUpdate = () => {
    if (
      !form.item ||
      !form.code ||
      !form.qty ||
      !form.pack ||
      (form.type === "RM" &&
        (!form.supplier || !form.batch || !form.invoice)) ||
      (form.type === "FG" && !form.mfgDate)
    )
      return;
    if (editId) {
      setItems(items.map((it) => (it.id === editId ? { ...it, ...form } : it)));
      setEditId(null);
    } else {
      const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems([{ id, ...form }, ...items]);
    }
    setForm({
      type: "RM",
      item: "",
      code: "",
      qty: 0,
      pack: "",
      supplier: "",
      batch: "",
      invoice: "",
      mfgDate: "",
    });
  };

  const startEdit = (it) => {
    setEditId(it.id);
    setForm({ ...it });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const remove = (id) => setItems(items.filter((it) => it.id !== id));

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Inventory — InkCredible ERP</h2>
      <div
        style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}
      >
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          style={{ padding: 8 }}
        >
          <option value="RM">RM</option>
          <option value="FG">FG</option>
        </select>
        <input
          placeholder="Item / Code"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          placeholder="Item Code"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          type="number"
          placeholder="Qty"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
          style={{ padding: 8 }}
        />
        <input
          placeholder="Pack"
          value={form.pack}
          onChange={(e) => setForm({ ...form, pack: e.target.value })}
          style={{ padding: 8 }}
        />
        {form.type === "RM" && (
          <>
            <input
              placeholder="Supplier"
              value={form.supplier}
              onChange={(e) => setForm({ ...form, supplier: e.target.value })}
              style={{ padding: 8 }}
            />
            <input
              placeholder="Batch Nos."
              value={form.batch}
              onChange={(e) => setForm({ ...form, batch: e.target.value })}
              style={{ padding: 8 }}
            />
            <input
              placeholder="Invoice No."
              value={form.invoice}
              onChange={(e) => setForm({ ...form, invoice: e.target.value })}
              style={{ padding: 8 }}
            />
          </>
        )}
        {form.type === "FG" && (
          <input
            type="date"
            value={form.mfgDate}
            onChange={(e) => setForm({ ...form, mfgDate: e.target.value })}
            style={{ padding: 8 }}
          />
        )}
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={addOrUpdate} style={{ padding: "8px 12px" }}>
            {editId ? "Update" : "Add"}
          </button>
          <button
            onClick={() =>
              setForm({
                type: "RM",
                item: "",
                code: "",
                qty: 0,
                pack: "",
                supplier: "",
                batch: "",
                invoice: "",
                mfgDate: "",
              })
            }
            style={{ padding: "8px 12px" }}
          >
            Reset
          </button>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        Filter:{" "}
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option>All</option>
          <option>RM</option>
          <option>FG</option>
        </select>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 8 }}>Type</th>
            <th style={{ padding: 8 }}>Item</th>
            <th style={{ padding: 8 }}>Code</th>
            <th style={{ padding: 8 }}>Qty</th>
            <th style={{ padding: 8 }}>Pack</th>
            <th style={{ padding: 8 }}>Supplier</th>
            <th style={{ padding: 8 }}>Batch</th>
            <th style={{ padding: 8 }}>Invoice</th>
            <th style={{ padding: 8 }}>MFG Date</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 && (
            <tr>
              <td colSpan="10" style={{ padding: 12, textAlign: "center" }}>
                No items
              </td>
            </tr>
          )}
          {filtered.map((it) => (
            <tr key={it.id} style={{ borderBottom: "1px solid #f0f0f0" }}>
              <td style={{ padding: 8 }}>{it.type}</td>
              <td style={{ padding: 8 }}>{it.item}</td>
              <td style={{ padding: 8 }}>{it.code}</td>
              <td style={{ padding: 8 }}>{it.qty}</td>
              <td style={{ padding: 8 }}>{it.pack}</td>
              <td style={{ padding: 8 }}>
                {it.type === "RM" ? it.supplier : ""}
              </td>
              <td style={{ padding: 8 }}>{it.type === "RM" ? it.batch : ""}</td>
              <td style={{ padding: 8 }}>
                {it.type === "RM" ? (
                  <span
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textDecoration: "underline",
                    }}
                    onClick={() => setSelectedInvoice(it)}
                  >
                    {it.invoice}
                  </span>
                ) : (
                  ""
                )}
              </td>
              <td style={{ padding: 8 }}>
                {it.type === "FG" ? it.mfgDate : ""}
              </td>
              <td style={{ padding: 8, display: "flex", gap: 6 }}>
                <button
                  onClick={() => startEdit(it)}
                  style={{ padding: "6px 8px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => remove(it.id)}
                  style={{ padding: "6px 8px" }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedInvoice && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h3>Invoice Details</h3>
            <p>
              <b>Supplier:</b> {selectedInvoice.supplier}
            </p>
            <p>
              <b>Batch Nos.:</b> {selectedInvoice.batch}
            </p>
            <p>
              <b>Invoice No.:</b> {selectedInvoice.invoice}
            </p>
            <button onClick={() => setSelectedInvoice(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
