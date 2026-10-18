import Navbar from "../common/Navbar";
import Footer from "../common/Footer";

export default function AdminPage({ openCart }) {
    return (
        <div className="admin-page-layout">
            {/* Header Component from common folder */}
            <Navbar openCart={openCart} />

            {/* Empty Main Content Area (UI to be decided later) */}
            <main className="admin-content-area" style={{ flex: 1, minHeight: "65vh" }}>
                {/* Admin UI will be added here */}
            </main>

            {/* Footer Component from common folder */}
            <Footer />
        </div>
    );
}
