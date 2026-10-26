import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAdminSettings } from "../../../hooks/useAdminSettings";

const reportPeriods = {
    daily: {
        label: "Daily Orders",
        column: "Date",
        description: "Sample data for 20–25 Oct 2026.",
        rows: [
            { date: "20 Oct 2026", totalOrders: 10, totalSales: 4500 },
            { date: "21 Oct 2026", totalOrders: 8, totalSales: 3600 },
            { date: "22 Oct 2026", totalOrders: 15, totalSales: 6750 },
            { date: "23 Oct 2026", totalOrders: 11, totalSales: 4950 },
            { date: "24 Oct 2026", totalOrders: 12, totalSales: 5400 },
            { date: "25 Oct 2026", totalOrders: 9, totalSales: 4050 },
        ],
    },
    weekly: {
        label: "Weekly Orders",
        column: "Week",
        description: "Sample data for 1–25 Oct 2026.",
        rows: [
            { date: "1–4 Oct 2026", totalOrders: 6, totalSales: 2700 },
            { date: "5–11 Oct 2026", totalOrders: 14, totalSales: 6300 },
            { date: "12–18 Oct 2026", totalOrders: 24, totalSales: 10800 },
            { date: "19–25 Oct 2026", totalOrders: 65, totalSales: 29250 },
        ],
    },
    monthly: {
        label: "Monthly Orders",
        column: "Month",
        description: "Sample data for Jul–Oct 2026. October includes orders through 25 Oct.",
        rows: [
            { date: "Jul 2026", totalOrders: 80, totalSales: 36000 },
            { date: "Aug 2026", totalOrders: 92, totalSales: 41400 },
            { date: "Sep 2026", totalOrders: 104, totalSales: 46800 },
            { date: "Oct 2026", totalOrders: 109, totalSales: 49050 },
        ],
    },
};

export default function ReportsView() {
    const { currentUser } = useAuth();
    const { defaultReportPeriod } = useAdminSettings(currentUser?.id);
    const [period, setPeriod] = useState(defaultReportPeriod);
    const selectedReport = reportPeriods[period];
    const sampleReports = selectedReport.rows;
    const totalOrders = sampleReports.reduce((total, report) => total + report.totalOrders, 0);
    const totalSales = sampleReports.reduce((total, report) => total + report.totalSales, 0);

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", boxSizing: "border-box" }}>
            <div style={{ borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px" }}>
                <h2 style={{ color: "#ff7b00", margin: "0 0 12px 0" }}>Reports</h2>
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "12px" }}>
                    <label htmlFor="report-period" style={{ color: "#bbb", fontSize: "0.95rem" }}>Report period</label>
                    <select
                        id="report-period"
                        value={period}
                        onChange={(event) => setPeriod(event.target.value)}
                        style={{ background: "#2a2a3d", color: "#ff7b00", border: "1px solid #444", borderRadius: "6px", padding: "10px 12px", fontFamily: "inherit", fontSize: "0.92rem", fontWeight: 600, cursor: "pointer", maxWidth: "100%" }}
                    >
                        {Object.entries(reportPeriods).map(([value, report]) => (
                            <option key={value} value={value}>{report.label}</option>
                        ))}
                    </select>
                </div>
                <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                    {selectedReport.description}
                </p>
            </div>

            <div style={{ overflowX: "auto" }}>
                <table aria-label={`${selectedReport.label} (sample data)`} style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e2f", borderRadius: "10px", overflow: "hidden", fontSize: "0.92rem" }}>
                    <thead>
                        <tr style={{ background: "#2a2a3d", textAlign: "left", color: "#bbb" }}>
                            <th scope="col" style={{ padding: "14px", borderBottom: "1px solid #333" }}>{selectedReport.column}</th>
                            <th scope="col" style={{ padding: "14px", borderBottom: "1px solid #333" }}>Total Orders</th>
                            <th scope="col" style={{ padding: "14px", borderBottom: "1px solid #333" }}>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sampleReports.map((report) => (
                            <tr key={report.date} style={{ borderBottom: "1px solid #2a2a3d" }}>
                                <td style={{ padding: "14px", color: "#ddd" }}>{report.date}</td>
                                <td style={{ padding: "14px" }}>{report.totalOrders}</td>
                                <td style={{ padding: "14px", color: "#34d399", fontWeight: 600 }}>₹{report.totalSales.toLocaleString("en-IN")}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr style={{ background: "#2a2a3d", textAlign: "left", fontWeight: 700 }}>
                            <th scope="row" style={{ padding: "14px", color: "#ff7b00" }}>Total</th>
                            <td style={{ padding: "14px" }}>{totalOrders}</td>
                            <td style={{ padding: "14px", color: "#34d399" }}>₹{totalSales.toLocaleString("en-IN")}</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
