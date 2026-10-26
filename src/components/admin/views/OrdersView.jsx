import React, { useState } from "react";

const initialDemoOrders = [
    {
        orderId: "TS-8421",
        date: "20/10/2026, 02:30 PM",
        customerName: "Rahul Sharma",
        address: "Shop 12, APMC Fruit Market, Sector 19, Vashi, Navi Mumbai",
        items: [
            { name: "Sunburst Orange Juice", qty: 2 },
            { name: "Wild Strawberry Glow", qty: 1 }
        ],
        totalAmount: 3850,
        status: "Delivered"
    },
    {
        orderId: "TS-9120",
        date: "24/10/2026, 11:15 AM",
        customerName: "Priya Nair",
        address: "74 Brigade Road, Near Metro Station, Bangalore",
        items: [
            { name: "Royal Pomegranate Ruby", qty: 2 },
            { name: "Kiwi Lime Elixir", qty: 1 }
        ],
        totalAmount: 4350,
        status: "Processing"
    }
];

export default function OrdersView() {
    const [orders, setOrders] = useState(() => {
        try {
            const stored = JSON.parse(localStorage.getItem("allOrders_v2"));
            return stored && stored.length > 0 ? stored : initialDemoOrders;
        } catch (e) {
            return initialDemoOrders;
        }
    });

    const handleStatusChange = (orderId, newStatus) => {
        const updated = orders.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o);
        setOrders(updated);
        try {
            localStorage.setItem("allOrders_v2", JSON.stringify(updated));
        } catch (e) {}
    };

    const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", boxSizing: "border-box" }}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
                <div>
                    <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0" }}>📦 Wholesale Orders Fulfillment (Demo)</h2>
                    <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                        Preview wholesale orders, consignments, and delivery statuses.
                    </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                    <div style={{ background: "#2a2a3d", padding: "8px 14px", borderRadius: "8px", fontSize: "0.85rem" }}>
                        Demo Orders: <strong style={{ color: "#ff7b00" }}>{orders.length}</strong>
                    </div>
                    <div style={{ background: "#2a2a3d", padding: "8px 14px", borderRadius: "8px", fontSize: "0.85rem" }}>
                        Revenue: <strong style={{ color: "#10b981" }}>₹{totalRevenue.toLocaleString()}</strong>
                    </div>
                </div>
            </div>

            {/* Orders Table - No Filter */}
            {orders.length === 0 ? (
                <div style={{ textAlign: "center", padding: "40px", background: "#1e1e2f", borderRadius: "12px" }}>
                    <p style={{ color: "#888", fontSize: "1.1rem" }}>No wholesale orders found.</p>
                </div>
            ) : (
                <div style={{ overflowX: "auto" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e1e2f", borderRadius: "10px", overflow: "hidden", fontSize: "0.92rem" }}>
                        <thead>
                            <tr style={{ background: "#2a2a3d", textAlign: "left", color: "#bbb" }}>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Order ID & Date</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Customer & Destination</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Items Ordered</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Total Amount</th>
                                <th style={{ padding: "14px", borderBottom: "1px solid #333" }}>Fulfillment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order.orderId} style={{ borderBottom: "1px solid #2a2a3d" }}>
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <strong style={{ color: "#ff7b00", fontSize: "1rem" }}>{order.orderId}</strong>
                                        <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "4px" }}>{order.date}</div>
                                    </td>
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <div style={{ fontWeight: 600, color: "#fff" }}>{order.customerName || "Customer"}</div>
                                        <div style={{ color: "#888", fontSize: "0.82rem", marginTop: "4px" }}>
                                            📍 {order.address || "Address on file"}
                                        </div>
                                    </td>
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                                            {(order.items || []).map((it, idx) => (
                                                <div key={idx} style={{ fontSize: "0.85rem", color: "#ddd" }}>
                                                    • {it.name} × <strong>{it.qty} cartons</strong>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <strong style={{ color: "#10b981", fontSize: "1.05rem" }}>
                                            ₹{(order.totalAmount || 0).toLocaleString()}
                                        </strong>
                                    </td>
                                    <td style={{ padding: "14px", verticalAlign: "top" }}>
                                        <select
                                            value={order.status || "Processing"}
                                            onChange={(e) => handleStatusChange(order.orderId, e.target.value)}
                                            style={{
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                border: "1px solid #444",
                                                background: "#2a2a3d",
                                                color: order.status === "Delivered" ? "#34d399" : order.status === "Dispatched" ? "#38bdf8" : "#fbbf24",
                                                fontWeight: 700,
                                                cursor: "pointer",
                                                outline: "none"
                                            }}
                                        >
                                            {["Pending", "Processing", "Dispatched", "Delivered", "Cancelled"].map(s => (
                                                <option key={s} value={s} style={{ background: "#1e1e2f", color: "#fff" }}>
                                                    {s}
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
