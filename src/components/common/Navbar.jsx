import { ShoppingCart, ShieldCheck, User, LogOut, Store, LayoutDashboard, Sun, Moon } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

function Navbar({ openModal, openCart }) {
    const { cart } = useContext(CartContext);
    const { currentUser, currentView, setCurrentView, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();

    const links = ["Home", "Products", "About", "Contact"];
    const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superadmin";

    return (
        <nav className="NavBar">
            <h1 className="siteLogo">
                <a 
                    href={currentView === "admin" ? "#" : "#home"} 
                    onClick={(e) => {
                        if (currentView === "admin") {
                            e.preventDefault();
                        }
                    }}
                >
                    TropicSip
                </a>
            </h1>

            {/* Navigation links - hidden in Admin portal */}
            {currentView !== "admin" && (
                <ul style={{ display: "flex", gap: "1rem", alignItems: "center", listStyle: "none" }}>
                    {links.map((link, index) => (
                        <li key={index}>
                            <a 
                                href={`#${link.toLowerCase()}`} 
                                className="link"
                            >
                                {link}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <div style={{ display: "flex", gap: "0.85rem", alignItems: "center" }}>
                {/* Dark/Light Mode Theme Toggle Button */}
                <button 
                    className="btn-theme-toggle" 
                    onClick={toggleTheme}
                    title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
                    aria-label="Toggle theme"
                >
                    {theme === "dark" ? (
                        <Sun size={18} color="#ffa200" />
                    ) : (
                        <Moon size={18} color="#475569" />
                    )}
                </button>

                {/* Cart Icon - NOT visible to admin or inside admin portal */}
                {!isAdmin && currentView !== "admin" && (
                    <a 
                        href="#" 
                        onClick={(e) => {
                            e.preventDefault();
                            if (openCart) openCart();
                        }}
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            alignItems: "center",
                            cursor: "pointer",
                            fontWeight: 500
                        }}
                    >
                        <ShoppingCart size={18} />
                        <span>Cart({cart?.length || 0})</span>
                    </a>
                )}

                {/* Authentication & Role Controls */}
                {currentUser ? (
                    <div style={{ display: "flex", gap: "0.6rem", alignItems: "center" }}>
                        {/* Admin Role Controls */}
                        {currentUser.role === "admin" || currentUser.role === "superadmin" ? (
                            <>
                                <span className="nav-admin-badge" title={`Logged in as ${currentUser.name}`}>
                                    <ShieldCheck size={14} />
                                    {currentUser.role === "superadmin" ? "Super Admin" : "Admin"}
                                </span>

                                {currentView === "admin" ? (
                                    <button 
                                        className="btn-nav-switch" 
                                        onClick={() => setCurrentView("home")}
                                        title="Preview Customer Storefront"
                                    >
                                        <Store size={15} />
                                        <span>Store View</span>
                                    </button>
                                ) : (
                                    <button 
                                        className="btn-nav-switch btn-nav-admin" 
                                        onClick={() => setCurrentView("admin")}
                                        title="Go to Admin Portal"
                                    >
                                        <LayoutDashboard size={15} />
                                        <span>Admin Portal</span>
                                    </button>
                                )}
                            </>
                        ) : (
                            <span className="nav-user-greeting">
                                <User size={14} />
                                <span>Hi, {currentUser.name?.split(" ")[0] || currentUser.username}</span>
                            </span>
                        )}

                        {/* Logout Button */}
                        <button 
                            className="btn-nav-logout" 
                            onClick={logout}
                            title="Log out of account"
                        >
                            <LogOut size={14} />
                            <span>Log Out</span>
                        </button>
                    </div>
                ) : (
                    <button className="btn" onClick={openModal}>LogIn</button>
                )}
            </div>
        </nav>
    );
}

export default Navbar;