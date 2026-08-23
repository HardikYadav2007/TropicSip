import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import LoginModal from "../auth/LoginModal";
import Hero from "../user/Hero";
import BottleMagic from "../user/bottleMagic";
import ProductGrid from "../user/ProductGrid";
import About from "../user/About";
import { useState } from "react";

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleAddToCart = (product, quantity) => {
        alert(`🛒 Added ${quantity} cartons of "${product.name}" to wholesale order request!`);
    };

    return (
        <div>
            {isModalOpen ? (
                <LoginModal closeModal={closeModal} />
            ) : (
                <>
                    <Navbar openModal={openModal} />
                    <Hero />
                    <BottleMagic />
                    <ProductGrid onAddToCart={handleAddToCart} />
                    <About />
                    <Footer />
                </>
            )}
        </div>
    );
}