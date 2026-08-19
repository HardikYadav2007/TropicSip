import { ShoppingCart } from "lucide-react";
function Navbar({ openModal }) {
    const links = ["Home", "Products", "About", "Contact"];

    return (
        <nav className="NavBar">
            <h1 className="siteLogo"><a href={`${links[0]}`}>TropicSip</a></h1>
            <ul style={{ display: "flex", gap: "1rem", alignItems: "center", listStyle: "none" }}>
                {links.map((link, index) => (
                    <li key={index}><a href={`${link}`} className="link">{link}</a></li>
                ))}
            </ul>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <a href="#" style={{
                    display: "flex",
                    gap: "0.5rem",
                    alignItems: "center"
                }}>
                    <ShoppingCart />
                    <span>Cart</span>
                </a>
                <button className="btn" onClick={openModal}>LogIn</button>
            </div>
        </nav>
    );
}

export default Navbar;