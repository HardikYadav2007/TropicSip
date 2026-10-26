export default function StatisticsView() {
    const sampleStatistics = [
        { label: "Total Orders", value: "65" },
        { label: "Total Sales", value: "₹29,250" },
        { label: "Total Farmers", value: "2" },
        { label: "Total Customers", value: "18" },
        { label: "Delivered Orders", value: "52" },
        { label: "Pending Orders", value: "13" },
    ];
    const sampleDailyOrders = [
        { date: "20 Oct", orders: 10 },
        { date: "21 Oct", orders: 8 },
        { date: "22 Oct", orders: 15 },
        { date: "23 Oct", orders: 11 },
        { date: "24 Oct", orders: 12 },
        { date: "25 Oct", orders: 9 },
    ];

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", boxSizing: "border-box" }}>
            <div style={{ borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px" }}>
                <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0" }}>Statistics</h2>
                <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                    Sample totals for orders, sales, farmers, and customers.
                </p>
            </div>

            <dl style={{ display: "flex", flexWrap: "wrap", gap: "16px", margin: 0 }}>
                {sampleStatistics.map((statistic) => (
                    <div key={statistic.label} style={{ flex: "1 1 240px", minWidth: 0, background: "#1e1e2f", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "24px" }}>
                        <dt style={{ color: "#bbb", fontSize: "0.92rem", marginBottom: "12px" }}>
                            {statistic.label}
                        </dt>
                        <dd style={{ color: "#ff7b00", fontSize: "2rem", fontWeight: 700, margin: 0 }}>
                            {statistic.value}
                        </dd>
                    </div>
                ))}
            </dl>

            <figure style={{ margin: "24px 0 0", padding: "24px", background: "#1e1e2f", border: "1px solid #2a2a3d", borderRadius: "10px", minWidth: 0, maxWidth: "100%", boxSizing: "border-box", overflow: "hidden" }}>
                <figcaption style={{ marginBottom: "20px" }}>
                    <h3 style={{ color: "#ff7b00", margin: "0 0 6px", fontSize: "1.15rem" }}>Orders Overview</h3>
                    <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                        Sample daily orders for 20–25 Oct 2026.
                    </p>
                </figcaption>
                <div style={{ width: "100%", overflowX: "auto" }}>
                    <svg viewBox="0 0 760 300" role="img" aria-labelledby="orders-chart-title orders-chart-description" style={{ display: "block", width: "100%", minWidth: "600px", height: "auto" }}>
                        <title id="orders-chart-title">Sample daily orders for 20–25 Oct 2026</title>
                        <desc id="orders-chart-description">Bar chart with orders from zero to twenty. 20 October: 10 orders; 21 October: 8; 22 October: 15; 23 October: 11; 24 October: 12; 25 October: 9. Total: 65 orders.</desc>
                        <text x="48" y="20" fill="#bbb" fontSize="13">Orders</text>
                        {[0, 5, 10, 15, 20].map((tick) => {
                            const y = 240 - tick * 10;

                            return (
                                <g key={tick}>
                                    <line x1="48" x2="736" y1={y} y2={y} stroke={tick === 0 ? "#777" : "#343447"} />
                                    <text x="36" y={y + 5} fill="#bbb" fontSize="14" textAnchor="end">{tick}</text>
                                </g>
                            );
                        })}
                        {sampleDailyOrders.map((day, index) => {
                            const x = 86 + index * 112;
                            const height = day.orders * 10;

                            return (
                                <g key={day.date}>
                                    <rect x={x} y={240 - height} width="46" height={height} rx="4" fill="#ff7b00" />
                                    <text x={x + 23} y={228 - height} fill="#fff" fontSize="15" fontWeight="600" textAnchor="middle">{day.orders}</text>
                                    <text x={x + 23} y="269" fill="#bbb" fontSize="14" textAnchor="middle">{day.date}</text>
                                </g>
                            );
                        })}
                    </svg>
                </div>
            </figure>
        </div>
    );
}
