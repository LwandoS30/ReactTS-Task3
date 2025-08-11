import React, { useEffect, useState } from "react";

type ApplicationStatus = "Applied" | "Interviewed" | "Rejected" | "Accepted";

interface JobFormData {
  id: number;
  jobTitle: string;
  role: string;
  duties: string;
  qualifications: string;
  experience: string;
  companyEmail: string;
  companyNumber: string;
  companyName: string;
  companyAddress: string;
  companyVision: string;
  companyMission: string;
  companyObjectives: string;
  companyCulture: string;
  status: ApplicationStatus;
  date: string; // store as ISO string
}

export const JobApp: React.FC = () => {
  const [jobs, setJobs] = useState<JobFormData[]>([]);
  const [formData, setFormData] = useState<JobFormData>({
    id: Date.now(),
    jobTitle: "",
    role: "",
    duties: "",
    qualifications: "",
    experience: "",
    companyEmail: "",
    companyNumber: "",
    companyName: "",
    companyAddress: "",
    companyVision: "",
    companyMission: "",
    companyObjectives: "",
    companyCulture: "",
    status: "Applied",
    date: new Date().toISOString(),
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Filters
  const [filterCompany, setFilterCompany] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterStatus, setFilterStatus] = useState<ApplicationStatus | "">("");

  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((data) => {
        // sort by date newest first
        const sorted = data.sort((a: JobFormData, b: JobFormData) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setJobs(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await fetch(`http://localhost:3000/jobs/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      setJobs(
        jobs
          .map((job) => (job.id === editingId ? formData : job))
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      );
      setEditingId(null);
    } else {
      const newJob = { ...formData, id: Date.now(), date: new Date().toISOString() };
      await fetch("http://localhost:3000/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJob),
      });
      setJobs([newJob, ...jobs]);
    }

    setFormData({
      id: Date.now(),
      jobTitle: "",
      role: "",
      duties: "",
      qualifications: "",
      experience: "",
      companyEmail: "",
      companyNumber: "",
      companyName: "",
      companyAddress: "",
      companyVision: "",
      companyMission: "",
      companyObjectives: "",
      companyCulture: "",
      status: "Applied",
      date: new Date().toISOString(),
    });
  };

  const handleEdit = (job: JobFormData) => {
    setFormData(job);
    setEditingId(job.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`http://localhost:3000/jobs/${id}`, { method: "DELETE" });
    setJobs(jobs.filter((job) => job.id !== id));
  };

  const statusCounts = jobs.reduce(
    (acc, job) => {
      acc[job.status]++;
      return acc;
    },
    { Applied: 0, Interviewed: 0, Rejected: 0, Accepted: 0 } as Record<ApplicationStatus, number>
  );

  const getStatusColor = (status: ApplicationStatus) => {
    switch (status) {
      case "Applied":
        return "gold";
      case "Interviewed":
        return "green";
      case "Rejected":
        return "red";
      case "Accepted":
        return "darkgreen";
      default:
        return "gray";
    }
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (filterCompany ? job.companyName.toLowerCase().includes(filterCompany.toLowerCase()) : true) &&
      (filterRole ? job.role.toLowerCase().includes(filterRole.toLowerCase()) : true) &&
      (filterStatus ? job.status === filterStatus : true)
    );
  });

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "1rem" }}>
      <h2>{editingId ? "Edit Job" : "Add Job"}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "10px" }}>
        <input name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} />
        <input name="role" placeholder="Role" value={formData.role} onChange={handleChange} />
        <textarea name="duties" placeholder="Duties" value={formData.duties} onChange={handleChange} />
        <textarea name="qualifications" placeholder="Qualifications" value={formData.qualifications} onChange={handleChange} />
        <textarea name="experience" placeholder="Experience" value={formData.experience} onChange={handleChange} />
        <input name="companyEmail" placeholder="Company Email" value={formData.companyEmail} onChange={handleChange} />
        <input name="companyNumber" placeholder="Company Number" value={formData.companyNumber} onChange={handleChange} />
        <input name="companyName" placeholder="Company Name" value={formData.companyName} onChange={handleChange} />
        <input name="companyAddress" placeholder="Company Address" value={formData.companyAddress} onChange={handleChange} />
        <textarea name="companyVision" placeholder="Company Vision" value={formData.companyVision} onChange={handleChange} />
        <textarea name="companyMission" placeholder="Company Mission" value={formData.companyMission} onChange={handleChange} />
        <textarea name="companyObjectives" placeholder="Company Objectives" value={formData.companyObjectives} onChange={handleChange} />
        <textarea name="companyCulture" placeholder="Company Culture" value={formData.companyCulture} onChange={handleChange} />

        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>

        <button type="submit">{editingId ? "Update" : "Add"}</button>
      </form>

      {/* Filters */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <input
          placeholder="Filter by company"
          value={filterCompany}
          onChange={(e) => setFilterCompany(e.target.value)}
        />
        <input
          placeholder="Filter by role"
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as ApplicationStatus | "")}>
          <option value="">All Status</option>
          <option value="Applied">Applied</option>
          <option value="Interviewed">Interviewed</option>
          <option value="Rejected">Rejected</option>
          <option value="Accepted">Accepted</option>
        </select>
      </div>

      {/* Status Bar */}
      <div style={{ marginTop: "20px", display: "flex", gap: "20px" }}>
        {(["Applied", "Interviewed", "Rejected", "Accepted"] as ApplicationStatus[]).map((status) => (
          <div
            key={status}
            style={{
              backgroundColor: getStatusColor(status),
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            {status}: {statusCounts[status]}
          </div>
        ))}
      </div>

      {/* Job List */}
      <h3 style={{ marginTop: "20px" }}>Jobs</h3>
      <table border={1} cellPadding={5} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Role</th>
            <th>Status</th>
            <th>Company</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.jobTitle}</td>
              <td>{job.role}</td>
              <td style={{ color: getStatusColor(job.status), fontWeight: "bold" }}>{job.status}</td>
              <td>{job.companyName}</td>
              <td>{new Date(job.date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => handleEdit(job)}>Edit</button>
                <button onClick={() => handleDelete(job.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobApp;
