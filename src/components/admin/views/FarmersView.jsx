import React, { useState, useEffect } from "react";
import { getFarmerApplications, updateApplicationStatus } from "../../../data/customers";

export default function FarmersView() {
    const [applications, setApplications] = useState([]);
    const [saveAlert, setSaveAlert] = useState("");

    // Load the 2 demo applications
    const loadApplications = () => {
        const apps = getFarmerApplications();
        // Ensure exactly 2 demo applications as requested
        setApplications(apps.slice(0, 2));
    };

    useEffect(() => {
        loadApplications();
    }, []);

    const handleStatusChange = (contractNumber, newStatus) => {
        updateApplicationStatus(contractNumber, newStatus);
        setApplications(prev => prev.map(a => 
            a.contractNumber === contractNumber ? { ...a, status: newStatus } : a
        ));
        setSaveAlert(`✓ Status for ${contractNumber} changed to "${newStatus}"!`);
        setTimeout(() => setSaveAlert(""), 3000);
    };

    const statusOptions = ["Pending Review", "Under Inspection", "Approved", "Contract Dispatched", "Rejected"];

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", boxSizing: "border-box" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                    <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0" }}>🌾 Direct Farmer Sourcing Applications</h2>
                    <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                        Review direct fruit grower applications and update procurement contract statuses.
                    </p>
                </div>
                <div style={{ background: "#2a2a3d", padding: "8px 16px", borderRadius: "8px", fontSize: "0.9rem" }}>
                    Demo Applications: <strong style={{ color: "#ff7b00" }}>{applications.length}</strong>
                </div>
            </div>

            {saveAlert && (
                <div style={{ background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10b981", color: "#34d399", padding: "10px 16px", borderRadius: "8px", marginBottom: "16px", fontWeight: 600 }}>
                    {saveAlert}
                </div>
            )}

            {/* Applications List Table - No Filter, No Procurement Remarks */}
            {applications.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", background: "#1e1e2f", borderRadius: "12px" }}>
                    <p style={{ color: "#888", fontSize: "1.1rem" }}>No farmer applications found.</p>
                </div>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e2f", borderRadius: "10px", overflow: "hidden", fontSize: "0.92rem" }}>
                        <thead>
                            <tr style={{ background: "#2a2a3d", textAlign: "left", color: "#bbb" }}>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Contract ID</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Farmer & Location</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Fruits & Quantity</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Status Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map((app) => (
                                <tr key={app.id || app.contractNumber} style={{ borderBottom: "1px solid #2a2a3d" }}>
                                    {/* Contract ID & Date */}
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <strong style={{ color: "#ff7b00", fontSize: "1rem" }}>{app.contractNumber}</strong>
                                        <div style={{ color: "#777", fontSize: "0.8rem", marginTop: "4px" }}>
                                            {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "Recent"}
                                        </div>
                                    </td>

                                    {/* Farmer details */}
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <div style={{ fontWeight: 600, color: "#fff" }}>{app.farmerName}</div>
                                        <div style={{ color: "#aaa", fontSize: "0.85rem" }}>📞 {app.phone}</div>
                                        <div style={{ color: "#888", fontSize: "0.82rem", marginTop: "4px" }}>
                                            📍 {app.city || ""}, {app.state || ""}
                                        </div>
                                    </td>

                                    {/* Fruits & Quantity */}
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", marginBottom: "6px" }}>
                                            {(app.fruits || []).map((fruit, idx) => (
                                                <span key={idx} style={{ background: "rgba(255, 123, 0, 0.15)", color: "#ff9f43", padding: "2px 8px", borderRadius: "4px", fontSize: "0.8rem" }}>
                                                    {fruit}
                                                </span>
                                            ))}
                                        </div>
                                        <strong style={{ color: "#fff" }}>{Number(app.quantity || 0).toLocaleString()} Kgs</strong>
                                    </td>

                                    {/* Status selection */}
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <select
                                            value={app.status || "Pending Review"}
                                            onChange={(e) => handleStatusChange(app.contractNumber, e.target.value)}
                                            style={{
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                border: "1px solid #444",
                                                background: "#2a2a3d",
                                                color: app.status === "Approved" ? "#34d399" : app.status === "Under Inspection" ? "#38bdf8" : "#fbbf24",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                outline: "none",
                                                width: "100%",
                                                maxWidth: "200px"
                                            }}
                                        >
                                            {statusOptions.map(opt => (
                                                <option key={opt} value={opt} style={{ background: "#1e1e2f", color: "#fff" }}>
                                                    {opt}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
