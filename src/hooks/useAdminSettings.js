import { useSyncExternalStore } from "react";
import { getAdminSettingsSnapshot, parseAdminSettings, subscribeAdminSettings } from "../data/adminSettings";

export function useAdminSettings(adminId) {
    const snapshot = useSyncExternalStore(
        subscribeAdminSettings,
        () => getAdminSettingsSnapshot(adminId),
        () => "{}",
    );

    return parseAdminSettings(snapshot);
}
