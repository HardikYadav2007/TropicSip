function About() {
    const features = [
        { icon: "🍊", title: "100% Natural", desc: "Made from real fruits with no artificial flavors or colors." },
        { icon: "🧊", title: "Always Fresh", desc: "Cold-pressed and delivered fresh to keep all the nutrients." },
        { icon: "🚚", title: "Fast Delivery", desc: "We deliver to your doorstep within 24 hours of ordering." },
        { icon: "💚", title: "No Added Sugar", desc: "Pure fruit goodness without any extra sugar added." }
    ];

    const stats = [
        { number: "50K+", label: "Happy Customers" },
        { number: "10+", label: "Juice Flavors" },
        { number: "100%", label: "Natural Fruits" },
        { number: "4.4⭐", label: "Customer Rating" }
    ];

    return (
        <section className="about-section" id="about">
            <div className="container">

                {/* Section Heading */}
                <div className="about-header">
                    <h2 className="about-title">About TropicSip</h2>
                    <p className="about-subtitle">
                        We are passionate about bringing you the freshest tropical juices.
                        Our mission is to make healthy drinks delicious and accessible to everyone.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="about-features">
                    {features.map(function (item, index) {
                        return (
                            <div className="about-card" key={index}>
                                <span className="about-icon">{item.icon}</span>
                                <h3 className="about-card-title">{item.title}</h3>
                                <p className="about-card-desc">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Stats Bar */}
                <div className="about-stats">
                    {stats.map(function (stat, index) {
                        return (
                            <div className="about-stat" key={index}>
                                <h3 className="about-stat-number">{stat.number}</h3>
                                <p className="about-stat-label">{stat.label}</p>
                            </div>
                        );
                    })}
                </div>

                {/* Story Section */}
                <div className="about-story">
                    <h3 className="about-story-title">Our Story</h3>
                    <p className="about-story-text">
                        TropicSip started in 2024 with a simple idea — fresh juice should taste
                        like real fruit. We source the best mangoes, oranges, berries, and limes
                        from local farms across India. Every bottle is cold-pressed and packed
                        with care so you get the real taste of nature in every sip.
                    </p>
                    <p className="about-story-text">
                        From farms to your doorstep, we bring the taste of the tropics to you.
                        No preservatives, no shortcuts — just pure, fresh juice.
                    </p>
                </div>

            </div>
        </section>
    );
}

export default About;
