import Navbar from "../common/Navbar";
import LoginModal from "../auth/LoginModal";
import Hero from "../user/Hero";
import { useState } from "react";

export default function HomePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    return (
        <div>
            {isModalOpen ? (
                <LoginModal closeModal={closeModal} />
            ) : (
                <>
                    <Navbar openModal={openModal} />
                    <Hero />
                </>
            )}
        </div>
    );
}