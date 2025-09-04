import React, { useState } from "react";

export default function HR() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [attendance, setAttendance] = useState("Present");

  const addEmployee = () => {
    if (!name || !role || !salary) return;
    const newEmp = {
      id: employees.length + 1,
      name,
      role,
      salary: parseFloat(salary),
      attendance,
      doj: new Date().toLocaleDateString(),
    };
    setEmployees([...employees, newEmp]);
    setName("");
    setRole("");
    setSalary("");
    setAttendance("Present");
  };

  const updateAttendance = (id, status) => {
    setEmployees(
      employees.map((e) => (e.id === id ? { ...e, attendance: status } : e))
    );
  };

  const totalPayroll = employees.reduce((sum, e) => sum + e.salary, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>HR Management</h2>

      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Employee Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />{" "}
        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />{" "}
        <select
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
        >
          <option>Present</option>
          <option>Absent</option>
          <option>On Leave</option>
        </select>{" "}
        <button onClick={addEmployee}>Add Employee</button>
      </div>

      <h3>Total Monthly Payroll: ₹{totalPayroll}</h3>

      <table
        border="1"
        cellPadding="8"
        style={{ width: "100%", marginTop: "15px" }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Date of Joining</th>
            <th>Attendance</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {employees.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Employees Added
              </td>
            </tr>
          ) : (
            employees.map((e) => (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.role}</td>
                <td>₹{e.salary}</td>
                <td>{e.doj}</td>
                <td>{e.attendance}</td>
                <td>
                  <select
                    value={e.attendance}
                    onChange={(ev) => updateAttendance(e.id, ev.target.value)}
                  >
                    <option>Present</option>
                    <option>Absent</option>
                    <option>On Leave</option>
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
