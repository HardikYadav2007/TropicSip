import { createContext, useContext, useState, useEffect } from "react";
import { initialUsers, initialAdmins, initialSuperAdmins } from "../data/initialData";
import { registerOrUpdateCustomer } from "../data/customers";

export const AuthContext = createContext({
    currentUser: null,
    currentView: "home",
    login: () => {},
    logout: () => {},
    setCurrentView: () => {},
    signupUser: () => {},
    users: [],
    admins: [],
    superAdmins: []
});

export function AuthProvider({ children }) {
    // 1. Temporary Database State (synced with localStorage)
    const [users, setUsers] = useState(() => {
        const saved = localStorage.getItem("tropicsip_users");
        return saved ? JSON.parse(saved) : initialUsers;
    });

    const [admins, setAdmins] = useState(() => {
        const saved = localStorage.getItem("tropicsip_admins");
        return saved ? JSON.parse(saved) : initialAdmins;
    });

    const [superAdmins, setSuperAdmins] = useState(() => {
        const saved = localStorage.getItem("tropicsip_superadmins");
        return saved ? JSON.parse(saved) : initialSuperAdmins;
    });

    // 2. Current Session State
    const [currentUser, setCurrentUser] = useState(() => {
        const saved = localStorage.getItem("tropicsip_auth_user");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.role === "user") {
                    registerOrUpdateCustomer(parsed);
                }
                return parsed;
            } catch (e) {
                console.error("Failed to parse saved user", e);
            }
        }
        return null;
    });

    // 3. Current Active View ('home' | 'admin' | 'superadmin')
    const [currentView, setCurrentView] = useState(() => {
        const saved = localStorage.getItem("tropicsip_auth_user");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.role === "admin" || parsed.role === "superadmin") {
                    return "admin";
                }
            } catch (e) {
                console.error("Failed to parse saved user", e);
            }
        }
        return "home";
    });

    // Sync arrays to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("tropicsip_users", JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem("tropicsip_admins", JSON.stringify(admins));
    }, [admins]);

    useEffect(() => {
        localStorage.setItem("tropicsip_superadmins", JSON.stringify(superAdmins));
    }, [superAdmins]);

    // Login function
    const login = (identifier, password) => {
        const cleanId = (identifier || "").trim().toLowerCase();
        const cleanPass = (password || "").trim();

        if (!cleanId || !cleanPass) {
            return { success: false, error: "Please enter both username/email and password." };
        }

        // Combine all temporary database records
        const allAccounts = [...superAdmins, ...admins, ...users];

        const match = allAccounts.find(account => {
            const matchesIdentifier =
                (account.username && account.username.toLowerCase() === cleanId) ||
                (account.email && account.email.toLowerCase() === cleanId);
            return matchesIdentifier && account.password === cleanPass;
        });

        if (match) {
            setCurrentUser(match);
            localStorage.setItem("tropicsip_auth_user", JSON.stringify(match));

            // Sync with customers database if customer user
            if (match.role === "user") {
                registerOrUpdateCustomer(match);
            }

            // Role-based view redirection
            if (match.role === "admin" || match.role === "superadmin") {
                setCurrentView("admin");
            } else {
                setCurrentView("home");
            }

            return { success: true, user: match };
        }

        return {
            success: false,
            error: "Invalid username/email or password."
        };
    };

    // Logout function
    const logout = () => {
        setCurrentUser(null);
        localStorage.removeItem("tropicsip_auth_user");
        setCurrentView("home");
    };

    // Signup new customer user
    const signupUser = ({ name, username, email, password }) => {
        const cleanUsername = (username || "").trim();
        const cleanEmail = (email || "").trim().toLowerCase();

        // Check if username or email already exists
        const allAccounts = [...superAdmins, ...admins, ...users];
        const exists = allAccounts.some(
            acc => acc.username?.toLowerCase() === cleanUsername.toLowerCase() ||
                   acc.email?.toLowerCase() === cleanEmail
        );

        if (exists) {
            return { success: false, error: "Username or email is already registered." };
        }

        const newUser = {
            id: `usr_${Date.now()}`,
            name: name.trim() || cleanUsername,
            username: cleanUsername,
            email: cleanEmail,
            password: password.trim(),
            role: "user"
        };

        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        localStorage.setItem("tropicsip_auth_user", JSON.stringify(newUser));
        
        // Sync with customers data
        registerOrUpdateCustomer(newUser);

        setCurrentView("home");

        return { success: true, user: newUser };
    };

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                currentView,
                setCurrentView,
                login,
                logout,
                signupUser,
                users,
                admins,
                superAdmins
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
