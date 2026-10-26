import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useAdminSettings } from "../../../hooks/useAdminSettings";
import { saveAdminSettings } from "../../../data/adminSettings";

const fieldStyle = {
    width: "100%",
    boxSizing: "border-box",
    background: "#2a2a3d",
    color: "#eee",
    border: "1px solid #444",
    borderRadius: "6px",
    padding: "8px 10px",
    fontFamily: "inherit",
    fontSize: "0.8rem",
};
const cardStyle = { background: "#1e1e2f", border: "1px solid #2a2a3d", borderRadius: "10px", padding: "16px" };
const labelStyle = { display: "block", color: "#ff7b00", marginBottom: "8px", fontSize: "0.8rem", fontWeight: 700 };
const hintStyle = { color: "#aaa", margin: "8px 0 0", fontSize: "0.75rem", lineHeight: 1.6 };

export default function SettingsView() {
    const { currentUser } = useAuth();
    const settings = useAdminSettings(currentUser?.id);
    const [draft, setDraft] = useState(() => ({
        ...settings,
        displayName: settings.displayName || currentUser?.name || currentUser?.username || "Admin",
    }));
    const [feedback, setFeedback] = useState(null);

    const updateSetting = (name, value) => {
        setDraft((previous) => ({ ...previous, [name]: value }));
        setFeedback(null);
    };

    const handleSave = (event) => {
        event.preventDefault();
        if (!draft.displayName.trim()) {
            setFeedback({ error: true, message: "Enter a display name." });
            return;
        }

        try {
            const saved = saveAdminSettings(currentUser?.id, draft);
            setDraft(saved);
            setFeedback({ error: false, message: "Settings saved for this browser." });
        } catch {
            setFeedback({ error: true, message: "Settings could not be saved. Check that browser storage is available and try again." });
        }
    };

    return (
        <div style={{ padding: "24px", color: "#fff", width: "100%", maxWidth: "600px", margin: "0 auto", textAlign: "center", boxSizing: "border-box" }}>
            <div style={{ borderBottom: "2px solid #333", paddingBottom: "16px", marginBottom: "20px" }}>
                <h2 style={{ color: "#ff7b00", margin: "0 0 6px 0", fontSize: "1.05rem" }}>Settings</h2>
                <p style={{ color: "#aaa", margin: 0, fontSize: "0.75rem" }}>
                    Manage your admin profile and portal preferences.
                </p>
            </div>

            <form onSubmit={handleSave} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={cardStyle}>
                    <label htmlFor="admin-display-name" style={labelStyle}>Display Name</label>
                    <input
                        id="admin-display-name"
                        type="text"
                        required
                        maxLength={40}
                        value={draft.displayName}
                        onChange={(event) => updateSetting("displayName", event.target.value)}
                        aria-describedby="admin-display-name-hint"
                        style={fieldStyle}
                    />
                    <p id="admin-display-name-hint" style={hintStyle}>Name shown in your admin sidebar.</p>
                </div>

                <div style={cardStyle}>
                    <label htmlFor="admin-default-report" style={labelStyle}>Default Report Period</label>
                    <select
                        id="admin-default-report"
                        value={draft.defaultReportPeriod}
                        onChange={(event) => updateSetting("defaultReportPeriod", event.target.value)}
                        aria-describedby="admin-default-report-hint"
                        style={fieldStyle}
                    >
                        <option value="daily">Daily Orders</option>
                        <option value="weekly">Weekly Orders</option>
                        <option value="monthly">Monthly Orders</option>
                    </select>
                    <p id="admin-default-report-hint" style={hintStyle}>The view shown when you open Reports.</p>
                </div>

                <div style={cardStyle}>
                    <label htmlFor="admin-notification-indicator" style={{ ...labelStyle, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginBottom: 0 }}>
                        <input
                            id="admin-notification-indicator"
                            type="checkbox"
                            checked={draft.showNotificationIndicator}
                            onChange={(event) => updateSetting("showNotificationIndicator", event.target.checked)}
                            aria-describedby="admin-notification-indicator-hint"
                            style={{ accentColor: "#ff7b00", flexShrink: 0 }}
                        />
                        Show Notification Indicator
                    </label>
                    <p id="admin-notification-indicator-hint" style={hintStyle}>Show the notification dot in the sidebar.</p>
                </div>

                <button type="submit" style={{ alignSelf: "center", background: "#ff7b00", color: "#15151f", border: "none", borderRadius: "6px", padding: "9px 18px", fontFamily: "inherit", fontSize: "0.8rem", fontWeight: 700, cursor: "pointer" }}>
                    Save Settings
                </button>
                {feedback && (
                    <p role={feedback.error ? "alert" : "status"} style={{ color: feedback.error ? "#fca5a5" : "#34d399", fontSize: "0.75rem", margin: 0, lineHeight: 1.6 }}>
                        {feedback.message}
                    </p>
                )}
            </form>
        </div>
    );
}
