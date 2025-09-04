import React, { useState, useEffect } from "react";

export default function Inventory() {
  const sample = [
    {
      id: 1,
      item: "Offset Black Ink",
      sku: "INK-OF-BLK-1",
      unit: "kg",
      qty: 120,
      min: 20,
      packaging: "Tin",
      supplier: "AcuInk",
      batch: "B-1024",
      received: "2025-08-01",
    },
    {
      id: 2,
      item: "Flexo Cyan",
      sku: "INK-FX-CYN-1",
      unit: "kg",
      qty: 45,
      min: 30,
      packaging: "Drum",
      supplier: "ColorPlus",
      batch: "F-874",
      received: "2025-08-10",
    },
    {
      id: 3,
      item: "Solvent (L)",
      sku: "SLV-001",
      unit: "ltr",
      qty: 300,
      min: 50,
      packaging: "Barrel",
      supplier: "SolvCorp",
      batch: "S-550",
      received: "2025-07-20",
    },
  ];

  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    item: "",
    sku: "",
    unit: "kg",
    qty: 0,
    min: 0,
    packaging: "Tin",
    supplier: "",
    batch: "",
    received: "",
  });
  const [query, setQuery] = useState("");
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    setItems(sample);
  }, []);

  const filtered = items
    .filter((i) =>
      [i.item, i.sku, i.supplier, i.batch]
        .join(" ")
        .toLowerCase()
        .includes(query.toLowerCase())
    )
    .sort((a, b) => a.item.localeCompare(b.item));

  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  function addOrUpdate() {
    if (!form.item || !form.sku) return;
    if (editId) {
      setItems(items.map((it) => (it.id === editId ? { ...it, ...form } : it)));
      setEditId(null);
    } else {
      const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
      setItems([{ id, ...form }, ...items]);
    }
    setForm({
      item: "",
      sku: "",
      unit: "kg",
      qty: 0,
      min: 0,
      packaging: "Tin",
      supplier: "",
      batch: "",
      received: "",
    });
  }

  function startEdit(it) {
    setEditId(it.id);
    setForm({
      item: it.item,
      sku: it.sku,
      unit: it.unit,
      qty: it.qty,
      min: it.min,
      packaging: it.packaging,
      supplier: it.supplier,
      batch: it.batch,
      received: it.received,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function adjustStock(id, delta) {
    setItems(
      items.map((it) =>
        it.id === id
          ? { ...it, qty: Math.max(0, Number(it.qty) + Number(delta)) }
          : it
      )
    );
  }

  function remove(id) {
    setItems(items.filter((it) => it.id !== id));
  }

  function exportCSV() {
    const hdr = [
      "id",
      "item",
      "sku",
      "unit",
      "qty",
      "min",
      "packaging",
      "supplier",
      "batch",
      "received",
    ].join(",");
    const rows = items.map((i) =>
      [
        i.id,
        i.item,
        i.sku,
        i.unit,
        i.qty,
        i.min,
        i.packaging,
        i.supplier,
        i.batch,
        i.received,
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [hdr, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ padding: 20, fontFamily: "Arial, sans-serif" }}>
      <h2>Inventory — InkCredible ERP</h2>

      <div
        style={{ display: "flex", gap: 12, marginBottom: 12, flexWrap: "wrap" }}
      >
        <input
          placeholder="Search item / sku / supplier"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          style={{ flex: 1, padding: 8 }}
        />
        <button
          onClick={() => {
            setQuery("");
            setPage(1);
          }}
          style={{ padding: "8px 12px" }}
        >
          Clear
        </button>
        <button onClick={exportCSV} style={{ padding: "8px 12px" }}>
          Export CSV
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <input
          placeholder="Item name"
          value={form.item}
          onChange={(e) => setForm({ ...form, item: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          placeholder="SKU"
          value={form.sku}
          onChange={(e) => setForm({ ...form, sku: e.target.value })}
          style={{ padding: 8 }}
        />
        <select
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          style={{ padding: 8 }}
        >
          <option value="kg">kg</option>
          <option value="ltr">ltr</option>
        </select>
        <input
          type="number"
          placeholder="Qty"
          value={form.qty}
          onChange={(e) => setForm({ ...form, qty: Number(e.target.value) })}
          style={{ padding: 8 }}
        />
        <input
          type="number"
          placeholder="Min Stock"
          value={form.min}
          onChange={(e) => setForm({ ...form, min: Number(e.target.value) })}
          style={{ padding: 8 }}
        />
        <select
          value={form.packaging}
          onChange={(e) => setForm({ ...form, packaging: e.target.value })}
          style={{ padding: 8 }}
        >
          <option>Tin</option>
          <option>Drum</option>
          <option>Bucket</option>
          <option>Barrel</option>
        </select>
        <input
          placeholder="Supplier"
          value={form.supplier}
          onChange={(e) => setForm({ ...form, supplier: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          placeholder="Batch"
          value={form.batch}
          onChange={(e) => setForm({ ...form, batch: e.target.value })}
          style={{ padding: 8 }}
        />
        <input
          type="date"
          value={form.received}
          onChange={(e) => setForm({ ...form, received: e.target.value })}
          style={{ padding: 8 }}
        />
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={addOrUpdate} style={{ padding: "8px 12px" }}>
            {editId ? "Update" : "Add"}
          </button>
          <button
            onClick={() => {
              setForm({
                item: "",
                sku: "",
                unit: "kg",
                qty: 0,
                min: 0,
                packaging: "Tin",
                supplier: "",
                batch: "",
                received: "",
              });
              setEditId(null);
            }}
            style={{ padding: "8px 12px" }}
          >
            Reset
          </button>
        </div>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "2px solid #ddd" }}>
            <th style={{ padding: 8 }}>Item</th>
            <th style={{ padding: 8 }}>SKU</th>
            <th style={{ padding: 8 }}>Qty</th>
            <th style={{ padding: 8 }}>Min</th>
            <th style={{ padding: 8 }}>Pack</th>
            <th style={{ padding: 8 }}>Supplier</th>
            <th style={{ padding: 8 }}>Batch</th>
            <th style={{ padding: 8 }}>Received</th>
            <th style={{ padding: 8 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pageItems.length === 0 && (
            <tr>
              <td colSpan="9" style={{ padding: 12, textAlign: "center" }}>
                No items
              </td>
            </tr>
          )}
          {pageItems.map((it) => (
            <tr
              key={it.id}
              style={{
                borderBottom: "1px solid #f0f0f0",
                background: it.qty <= it.min ? "#fff7f0" : "transparent",
              }}
            >
              <td style={{ padding: 8 }}>{it.item}</td>
              <td style={{ padding: 8 }}>{it.sku}</td>
              <td style={{ padding: 8 }}>
                {it.qty} {it.unit}
              </td>
              <td style={{ padding: 8 }}>{it.min}</td>
              <td style={{ padding: 8 }}>{it.packaging}</td>
              <td style={{ padding: 8 }}>{it.supplier}</td>
              <td style={{ padding: 8 }}>{it.batch}</td>
              <td style={{ padding: 8 }}>{it.received}</td>
              <td style={{ padding: 8, display: "flex", gap: 6 }}>
                <button
                  onClick={() => startEdit(it)}
                  style={{ padding: "6px 8px" }}
                >
                  Edit
                </button>
                <button
                  onClick={() => adjustStock(it.id, 10)}
                  style={{ padding: "6px 8px" }}
                >
                  +10
                </button>
                <button
                  onClick={() => adjustStock(it.id, -10)}
                  style={{ padding: "6px 8px" }}
                >
                  -10
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

      <div
        style={{
          marginTop: 12,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          Showing {Math.min(filtered.length, (page - 1) * perPage + 1)} -{" "}
          {Math.min(filtered.length, page * perPage)} of {filtered.length}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            style={{ padding: "6px 10px" }}
          >
            Prev
          </button>
          <button
            onClick={() =>
              setPage((p) =>
                Math.min(p + 1, Math.ceil(filtered.length / perPage))
              )
            }
            disabled={page >= Math.ceil(filtered.length / perPage)}
            style={{ padding: "6px 10px" }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
