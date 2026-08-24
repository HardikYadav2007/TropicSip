import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import LoginModal from "../auth/LoginModal";
import Hero from "../user/Hero";
import BottleMagic from "../user/bottleMagic";
import ProductGrid from "../user/ProductGrid";
import About from "../user/About";
import SellerForm from "../user/SellerForm";
import { useState } from "react";
import { CartProvider } from "../common/CartContext";
import CartPage from '../user/Cart'
export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const [isCartOpen,setIsCartOpen] = useState(false)
    const openCart = ()=> setIsCartOpen(true)
    const closeCart = ()=>setIsCartOpen(false)

    const handleAddToCart = (product, quantity) => {
        alert(`🛒 Added ${quantity} cartons of "${product.name}" to wholesale order request!`);
    };

    return (
        <div>

            <CartProvider>
                {isModalOpen ? (
                    <LoginModal closeModal={closeModal} />
                ) : isCartOpen ?(
                    <CartPage closeCart = {closeCart}/>
                ) :(
                    <>
                        <Navbar openModal={openModal} openCart={openCart} />
                        <Hero />
                        <BottleMagic />
                        <ProductGrid onAddToCart={handleAddToCart} />
                        <About />
                        <SellerForm/>
                        <Footer />
                    </>
                )}
            </CartProvider>
        </div>
    );
}