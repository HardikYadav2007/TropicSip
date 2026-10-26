const settingsChangedEvent = "tropicsip-admin-settings-changed";
const defaultSettings = {
    displayName: "",
    defaultReportPeriod: "daily",
    showNotificationIndicator: true,
};

const settingsKey = (adminId) => `tropicsip_admin_settings_v1:${adminId || "admin"}`;

export function getAdminSettingsSnapshot(adminId) {
    try {
        return localStorage.getItem(settingsKey(adminId)) || "{}";
    } catch {
        return "{}";
    }
}

export function parseAdminSettings(snapshot) {
    let saved;
    try {
        saved = JSON.parse(snapshot);
    } catch {
        return { ...defaultSettings };
    }

    if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
        return { ...defaultSettings };
    }

    return {
        displayName: typeof saved.displayName === "string" ? saved.displayName.trim().slice(0, 40) : "",
        defaultReportPeriod: ["daily", "weekly", "monthly"].includes(saved.defaultReportPeriod) ? saved.defaultReportPeriod : "daily",
        showNotificationIndicator: typeof saved.showNotificationIndicator === "boolean" ? saved.showNotificationIndicator : true,
    };
}

export function saveAdminSettings(adminId, settings) {
    const saved = parseAdminSettings(JSON.stringify(settings));
    localStorage.setItem(settingsKey(adminId), JSON.stringify(saved));
    window.dispatchEvent(new Event(settingsChangedEvent));
    return saved;
}

export function subscribeAdminSettings(listener) {
    window.addEventListener(settingsChangedEvent, listener);
    window.addEventListener("storage", listener);
    return () => {
        window.removeEventListener(settingsChangedEvent, listener);
        window.removeEventListener("storage", listener);
    };
}
