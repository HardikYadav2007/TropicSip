import { useState } from "react";
import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import LoginModal from "../auth/LoginModal";
import Hero from "../user/Hero";
import BottleMagic from "../user/bottleMagic";
import ProductGrid from "../user/ProductGrid";
import About from "../user/About";
import SellerForm from "../user/SellerForm";
import CartPage from '../user/Cart';
import { useAuth } from "../../context/AuthContext";

export default function HomePage() {
    const { currentUser } = useAuth();
    const isAdmin = currentUser?.role === "admin" || currentUser?.role === "superadmin";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => {
        if (!isAdmin) {
            setIsCartOpen(true);
        }
    };
    const closeCart = () => setIsCartOpen(false);

    const handleAddToCart = (product, quantity) => {
        if (isAdmin) return;
        alert(`🛒 Added ${quantity} cartons of "${product.name}" to wholesale order request!`);
    };

   return (
        <div>
            {isModalOpen ? (
                /* 1. If Login is open, ONLY render the Login component (full screen) */
                <LoginModal closeModal={closeModal} />
            ) : (
                /* 2. Otherwise, render the main page */
                <>
                    <Navbar openModal={openModal} openCart={isAdmin ? null : openCart} />
                    <Hero />
                    <BottleMagic />
                    <ProductGrid onAddToCart={handleAddToCart} />
                    <About />
                    <SellerForm />
                    <Footer />

                    /* 3. Render the Cart ON TOP of the main page */
                    {(!isAdmin && isCartOpen) && (
                        <CartPage closeCart={closeCart} />
                    )}
                </>
            )}
        </div>
    );
}