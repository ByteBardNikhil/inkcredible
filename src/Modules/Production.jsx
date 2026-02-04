import React, { useState } from "react";

export default function Production() {
  const [jobs, setJobs] = useState([]);
  const [jobName, setJobName] = useState("");
  const [machine, setMachine] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const addJob = () => {
    if (!jobName || !machine || !startDate || !endDate) return;
    const newJob = {
      id: jobs.length + 1,
      jobName,
      machine,
      startDate,
      endDate,
      status: "Scheduled",
    };
    setJobs([...jobs, newJob]);
    setJobName("");
    setMachine("");
    setStartDate("");
    setEndDate("");
  };

  const updateStatus = (id, status) => {
    setJobs(jobs.map((j) => (j.id === id ? { ...j, status } : j)));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Production Planning</h2>

      {/* Job Form */}
      <div style={{ marginBottom: "15px" }}>
        <input
          type="text"
          placeholder="Job Name"
          value={jobName}
          onChange={(e) => setJobName(e.target.value)}
        />{" "}
        <input
          type="text"
          placeholder="Machine Name"
          value={machine}
          onChange={(e) => setMachine(e.target.value)}
        />{" "}
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />{" "}
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />{" "}
        <button onClick={addJob}>Add Job</button>
      </div>

      {/* Jobs Table */}
      <table border="1" cellPadding="8" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Name</th>
            <th>Machine</th>
            <th>Start</th>
            <th>End</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No Jobs Scheduled
              </td>
            </tr>
          ) : (
            jobs.map((j) => (
              <tr key={j.id}>
                <td>{j.id}</td>
                <td>{j.jobName}</td>
                <td>{j.machine}</td>
                <td>{j.startDate}</td>
                <td>{j.endDate}</td>
                <td>{j.status}</td>
                <td>
                  <select
                    value={j.status}
                    onChange={(e) => updateStatus(j.id, e.target.value)}
                  >
                    <option>Scheduled</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                    <option>Delayed</option>
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
