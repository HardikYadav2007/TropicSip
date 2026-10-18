import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./components/common/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./components/Pages/HomePage";
import AdminPage from "./components/Pages/AdminPage";

function AppContent() {
  const { currentUser, currentView } = useAuth();

  // If Admin (or Superadmin) is logged in and active view is "admin", display the Admin Page
  if ((currentUser?.role === "admin" || currentUser?.role === "superadmin") && currentView === "admin") {
    return <AdminPage />;
  }

  // Default view: Customer storefront / Landing page
  return <HomePage />;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;