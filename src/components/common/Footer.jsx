export default Footer;

function Footer() {
    const quickLinks = ["Home", "Products", "About", "Contact"];

    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Brand Section */}
                <div className="footer-section">
                    <h2 className="footer-logo">TropicSip</h2>
                    <p className="footer-tagline">
                        Fresh tropical juices delivered to your doorstep.
                        Made with real fruits, no added sugar.
                    </p>
                </div>

                {/* Quick Links */}
                <div className="footer-section">
                    <h3 className="footer-heading">Quick Links</h3>
                    <ul className="footer-list">
                        {quickLinks.map(function (link, index) {
                            return (
                                <li key={index}>
                                    <a href={"#" + link.toLowerCase()} className="footer-link">{link}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="footer-section">
                    <h3 className="footer-heading">Contact Us</h3>
                    <p className="footer-text">📧 TropicSip@gmail.com</p>
                    <p className="footer-text">📞 +91 72647XXXXX</p>
                    <p className="footer-text">📍 Delhi,India</p>
                </div>

            </div>

            {/* Bottom Bar */}
            <div className="footer-bottom">
                <p>© 2026 TropicSip. All rights reserved.</p>
            </div>
        </footer>
    );
}
