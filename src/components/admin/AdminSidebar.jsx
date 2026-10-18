import { 
    LayoutDashboard, 
    Package, 
    CreditCard, 
    Users, 
    FileText, 
    TrendingUp, 
    Bell, 
    HelpCircle, 
    Settings, 
    LogOut, 
    Store, 
    Sun, 
    Moon,
    X,
    ShieldCheck,
    Wheat
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

export default function AdminSidebar({ activeSection, onSelectSection, isOpen, onClose }) {
    const { currentUser, logout, setCurrentView } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const primaryNavItems = [
        { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
        { id: "orders", label: "Orders", icon: Package },
        { id: "payments", label: "Payments", icon: CreditCard },
        { id: "customers", label: "Customers", icon: Users },
        { id: "farmers", label: "Farmer Submissions", icon: Wheat },
        { id: "reports", label: "Reports", icon: FileText },
        { id: "statistics", label: "Statistics", icon: TrendingUp },
    ];

    const secondaryNavItems = [
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "help", label: "Help", icon: HelpCircle },
        { id: "settings", label: "Settings", icon: Settings },
    ];

    const handleItemClick = (id) => {
        onSelectSection(id);
        if (onClose) onClose();
    };

    const handleSwitchToStore = () => {
        setCurrentView("home");
    };

    return (
        <>
            {/* Mobile Backdrop overlay */}
            {isOpen && <div className="admin-sidebar-backdrop" onClick={onClose} />}

            <aside className={`admin-side-drawer ${isOpen ? "open" : ""}`}>
                {/* 1. Header / Logo Area */}
                <div className="drawer-header">
                    <div className="drawer-logo-wrap">
                        <span className="logo-icon-sparkle">🍹</span>
                        <div className="logo-text-block">
                            <h1 className="drawer-brand-title">TropicSip</h1>
                            <span className="drawer-portal-pill">ADMIN CONSOLE</span>
                        </div>
                    </div>

                    {/* Close button on mobile */}
                    <button className="drawer-close-btn" onClick={onClose} aria-label="Close menu">
                        <X size={18} />
                    </button>
                </div>

                {/* 2. Admin User Micro-profile */}
                <div className="drawer-user-card">
                    <div className="drawer-user-avatar">
                        {(currentUser?.name || currentUser?.username || "A")[0].toUpperCase()}
                    </div>
                    <div className="drawer-user-info">
                        <span className="drawer-user-name">
                            {currentUser?.name?.split(" ")[0] || currentUser?.username || "Admin"}
                        </span>
                        <span className="drawer-user-badge">
                            <ShieldCheck size={11} />
                            {currentUser?.role === "superadmin" ? "Super Admin" : "Admin"}
                        </span>
                    </div>
                </div>

                {/* 3. Navigation Links List */}
                <div className="drawer-nav-container">
                    {/* Primary Navigation Group */}
                    <div className="nav-group-section">
                        <span className="nav-group-header">MAIN MANAGEMENT</span>
                        <ul className="drawer-menu-list">
                            {primaryNavItems.map(item => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            className={`drawer-nav-btn ${isActive ? "active" : ""}`}
                                            onClick={() => handleItemClick(item.id)}
                                        >
                                            <Icon size={18} className="nav-icon" />
                                            <span className="nav-label">{item.label}</span>
                                            {isActive && <span className="active-glow-indicator" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Divider Line */}
                    <div className="drawer-divider" />

                    {/* Secondary Navigation Group */}
                    <div className="nav-group-section">
                        <span className="nav-group-header">SYSTEM & PREFERENCES</span>
                        <ul className="drawer-menu-list">
                            {secondaryNavItems.map(item => {
                                const Icon = item.icon;
                                const isActive = activeSection === item.id;
                                return (
                                    <li key={item.id}>
                                        <button
                                            type="button"
                                            className={`drawer-nav-btn ${isActive ? "active" : ""}`}
                                            onClick={() => handleItemClick(item.id)}
                                        >
                                            <Icon size={18} className="nav-icon" />
                                            <span className="nav-label">{item.label}</span>
                                            {item.id === "notifications" && (
                                                <span className="notif-badge-dot" title="No unread alerts" />
                                            )}
                                            {isActive && <span className="active-glow-indicator" />}
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                {/* 4. Bottom Utilities & Logout Section */}
                <div className="drawer-footer-actions">
                    <div className="drawer-divider" />

                    {/* Switch to Storefront Button */}
                    <button 
                        type="button"
                        className="drawer-action-btn btn-store-view"
                        onClick={handleSwitchToStore}
                        title="Visit customer store view"
                    >
                        <Store size={17} />
                        <span>Store Front View</span>
                    </button>

                    {/* Dark/Light Theme Toggle */}
                    <button
                        type="button"
                        className="drawer-action-btn btn-theme-view"
                        onClick={toggleTheme}
                        title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    >
                        {theme === "dark" ? (
                            <>
                                <Sun size={17} color="#ffa200" />
                                <span>Light Theme</span>
                            </>
                        ) : (
                            <>
                                <Moon size={17} color="#475569" />
                                <span>Dark Theme</span>
                            </>
                        )}
                    </button>

                    {/* Log Out Button */}
                    <button 
                        type="button"
                        className="drawer-action-btn btn-logout-action" 
                        onClick={logout}
                        title="Log out of administrator account"
                    >
                        <LogOut size={17} />
                        <span>Log Out</span>
                    </button>
                </div>
            </aside>
        </>
    );
}
