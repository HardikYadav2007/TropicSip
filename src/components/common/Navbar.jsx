import { ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { CartContext } from "./CartContext";
function Navbar({ openModal,openCart }) {
    const {cart} = useContext(CartContext)

    const links = ["Home", "Products", "About", "Contact"];

    return (
        <nav className="NavBar">
            <h1 className="siteLogo"><a href="#home">TropicSip</a></h1>
            <ul style={{ display: "flex", gap: "1rem", alignItems: "center", listStyle: "none" }}>
                {links.map((link, index) => (
                    <li key={index}><a href={`#${link.toLowerCase()}`} className="link">{link}</a></li>
                ))}
            </ul>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <a href="#" 
                    onClick={(e)=>{
                        e.preventDefault();
                        openCart();
                    }}
                
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center",
                    cursor:"pointer",
                }}>
                    <ShoppingCart />
                    <span>Cart({cart.length})</span>
                </a>
                <button className="btn" onClick={openModal}>LogIn</button>
            </div>
        </nav>
    );
}

export default Navbar;