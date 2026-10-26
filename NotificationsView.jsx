import { useEffect, useState } from "react";

const sampleNotifications = [
    { id: "new-order", title: "New order received", message: "A customer has placed a new juice order." },
    { id: "farmer-submission", title: "New farmer submission", message: "A farmer has submitted a fruit supply application." },
    { id: "payment-received", title: "Payment received", message: "A customer payment of ₹4,050 has been received." },
];
const readNotificationsKey = "tropicsip_read_notifications_v1";

export default function NotificationsView() {
    const [readIds, setReadIds] = useState(() => {
        try {
            const saved = JSON.parse(localStorage.getItem(readNotificationsKey));
            if (Array.isArray(saved)) {
                return saved.filter((id) => sampleNotifications.some((notification) => notification.id === id));
            }
        } catch {
            // Keep the sample states when browser storage is unavailable.
        }
        return ["payment-received"];
    });

    useEffect(() => {
        try {
            localStorage.setItem(readNotificationsKey, JSON.stringify(readIds));
        } catch {
            // Read states still work for the current visit.
        }
    }, [readIds]);

    const markAsRead = (id) => {
        setReadIds((previous) => previous.includes(id) ? previous : [...previous, id]);
    };

    const notificationSections = [
        {
            id: "unread",
            title: "Unread",
            isRead: false,
            notifications: sampleNotifications.filter((notification) => !readIds.includes(notification.id)),
        },
        {
            id: "read",
            title: "Read",
            isRead: true,
            notifications: sampleNotifications.filter((notification) => readIds.includes(notification.id)),
        },
    ];

    return (
        <div style={{ padding: "30px", color: "#fff", width: "100%", maxWidth: "900px", boxSizing: "border-box" }}>
            <div style={{ borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px" }}>
                <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0" }}>Notifications</h2>
                <p style={{ color: "#aaa", margin: 0, fontSize: "0.95rem" }}>
                    Sample updates for orders, farmer submissions, and payments.
                </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                {notificationSections.map((section) => (
                    <section key={section.id} aria-labelledby={`${section.id}-notifications-heading`}>
                        <h3 id={`${section.id}-notifications-heading`} style={{ color: section.isRead ? "#ccc" : "#ff7b00", margin: "0 0 12px", fontSize: "1rem" }}>
                            {section.title} ({section.notifications.length})
                        </h3>

                        {section.notifications.length === 0 ? (
                            <p style={{ color: "#aaa", background: "#181827", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "16px", margin: 0, fontSize: "0.88rem" }}>
                                {section.isRead ? "No read notifications yet." : "No unread notifications."}
                            </p>
                        ) : (
                            <ul style={{ display: "flex", flexDirection: "column", gap: "12px", listStyle: "none", padding: 0, margin: 0 }}>
                                {section.notifications.map((notification) => (
                                    <li key={notification.id} style={{ background: section.isRead ? "#181827" : "#1e1e2f", border: "1px solid #2a2a3d", borderLeft: `3px solid ${section.isRead ? "#343447" : "#ff7b00"}`, borderRadius: "10px", padding: "16px" }}>
                                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "8px" }}>
                                            <h4 style={{ color: section.isRead ? "#ccc" : "#ff7b00", margin: 0, fontSize: "0.95rem" }}>
                                                {notification.title}
                                            </h4>
                                            <span style={{ background: section.isRead ? "rgba(16, 185, 129, 0.12)" : "rgba(255, 123, 0, 0.12)", color: section.isRead ? "#34d399" : "#ff9f43", borderRadius: "20px", padding: "3px 9px", fontSize: "0.75rem", fontWeight: 600 }}>
                                                {section.title}
                                            </span>
                                        </div>
                                        <p style={{ color: "#bbb", margin: "8px 0 0", fontSize: "0.88rem", lineHeight: 1.5 }}>
                                            {notification.message}
                                        </p>
                                        {!section.isRead && (
                                            <button
                                                type="button"
                                                aria-label={`Mark ${notification.title} as read`}
                                                onClick={() => markAsRead(notification.id)}
                                                style={{ background: "transparent", color: "#ff9f43", border: "1px solid #76502b", borderRadius: "6px", padding: "6px 10px", marginTop: "12px", fontFamily: "inherit", fontSize: "0.8rem", cursor: "pointer" }}
                                            >
                                                Mark as read
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
}
