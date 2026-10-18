import { useState } from "react";
import AdminSidebar from "../admin/AdminSidebar";
import DashboardView from "../admin/views/DashboardView";
import OrdersView from "../admin/views/OrdersView";
import PaymentsView from "../admin/views/PaymentsView";
import CustomersView from "../admin/views/CustomersView";
import ReportsView from "../admin/views/ReportsView";
import StatisticsView from "../admin/views/StatisticsView";
import NotificationsView from "../admin/views/NotificationsView";
import HelpView from "../admin/views/HelpView";
import SettingsView from "../admin/views/SettingsView";
import { Menu } from "lucide-react";
import "../admin/AdminPortal.css";

export default function AdminPage() {
    // Current active drawer section ('dashboard' by default)
    const [activeSection, setActiveSection] = useState("dashboard");
    const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

    // Map section IDs to their corresponding modular view components
    const renderActiveView = () => {
        switch (activeSection) {
            case "dashboard":
                return <DashboardView />;
            case "orders":
                return <OrdersView />;
            case "payments":
                return <PaymentsView />;
            case "customers":
                return <CustomersView />;
            case "reports":
                return <ReportsView />;
            case "statistics":
                return <StatisticsView />;
            case "notifications":
                return <NotificationsView />;
            case "help":
                return <HelpView />;
            case "settings":
                return <SettingsView />;
            default:
                return <DashboardView />;
        }
    };

    return (
        <div className="admin-portal-wrapper">
            {/* 1. Left Side Drawer Navigation */}
            <AdminSidebar
                activeSection={activeSection}
                onSelectSection={setActiveSection}
                isOpen={isMobileDrawerOpen}
                onClose={() => setIsMobileDrawerOpen(false)}
            />

            {/* 2. Main Viewport Area */}
            <main className="admin-main-viewport">
                {/* Mobile Top Header (only visible on small mobile screens to trigger drawer) */}
                <div className="admin-mobile-topbar">
                    <button
                        type="button"
                        className="mobile-menu-trigger"
                        onClick={() => setIsMobileDrawerOpen(true)}
                        aria-label="Open navigation drawer"
                    >
                        <Menu size={22} />
                    </button>
                    <span style={{ fontWeight: 700, fontSize: "1.1rem" }}>
                        TropicSip <span style={{ color: "var(--primary-orange)" }}>Admin</span>
                    </span>
                    <div style={{ width: 22 }} />
                </div>

                {/* Dynamic Content Component according to selected Drawer item */}
                {renderActiveView()}
            </main>
        </div>
    );
}
