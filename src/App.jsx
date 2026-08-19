import Navbar from "./components/common/Navbar";
import LoginModal from "./components/auth/LoginModal";
import { useState } from "react";

function App() {
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
          {/* Add main page content here */}
        </>
      )}
    </div>
  );
}

export default App;