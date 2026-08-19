
function Navbar({ openModal }) {
    const links = ["Home", "Products", "About", "Contact"];

    return (
        <nav className="NavBar">
            <h1 className="siteLogo">TropicSip</h1>
            <ul style={{ display: "flex", gap: "1rem", alignItems: "center", listStyle: "none" }}>
                {links.map((link, index) => (
                    <li key={index}>{link}</li>
                ))}
            </ul>
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <a href="">Cart</a>
                <button className="btn" onClick={openModal}>LogIn</button>
            </div>
        </nav>
    );
}

export default Navbar;