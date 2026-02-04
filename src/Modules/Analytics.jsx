import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Analytics() {
  const [salesData] = useState([
    { month: "Jan", sales: 120000, expenses: 60000 },
    { month: "Feb", sales: 150000, expenses: 70000 },
    { month: "Mar", sales: 180000, expenses: 80000 },
    { month: "Apr", sales: 130000, expenses: 50000 },
    { month: "May", sales: 200000, expenses: 90000 },
  ]);

  const [productData] = useState([
    { name: "Solvent Ink", value: 40 },
    { name: "Water-based Ink", value: 30 },
    { name: "UV Ink", value: 20 },
    { name: "Packaging Ink", value: 10 },
  ]);

  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard</h2>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
      >
        <div>
          <h3>Monthly Sales vs Expenses</h3>
          <LineChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#0088FE"
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="expenses"
              stroke="#FF8042"
              strokeWidth={2}
            />
          </LineChart>
        </div>

        <div>
          <h3>Product Share</h3>
          <PieChart width={400} height={300}>
            <Pie
              data={productData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              dataKey="value"
              label
            >
              {productData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={colors[index % colors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <div>
          <h3>Sales Bar Chart</h3>
          <BarChart width={500} height={300} data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#00C49F" />
            <Bar dataKey="expenses" fill="#FF8042" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
