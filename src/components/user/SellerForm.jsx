import React, { useState } from "react";

export default function SellerForm() {
    const [step, setStep] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [contractNumber, setContractNumber] = useState("");

    // Form 1 data state
    const [formData, setFormData] = useState({
        firstName: "",
        middleName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        country: "India",
        aadhar: "",
        pan: "",
        quantity: "",
        othersFruit: "",
        agreed: false
    });

    // Selected fruits state
    const [selectedFruits, setSelectedFruits] = useState({
        Oranges: false,
        Apples: false,
        Mangoes: false,
        Grapes: false,
        Pomegranate: false,
        Guava: false,
        Others: false
    });

    const handleFruitChange = (fruit) => {
        setSelectedFruits(prev => ({
            ...prev,
            [fruit]: !prev[fruit]
        }));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleForm1Submit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleForm2Submit = (e) => {
        e.preventDefault();
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        setContractNumber(`TS-${randomDigits}`);
        setStep(3);
    };

    const resetForm = () => {
        setStep(0);
        setShowInfo(false);
        setFormData({
            firstName: "",
            middleName: "",
            lastName: "",
            email: "",
            phone: "",
            address: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
            aadhar: "",
            pan: "",
            quantity: "",
            othersFruit: "",
            agreed: false
        });
        setSelectedFruits({
            Oranges: false,
            Apples: false,
            Mangoes: false,
            Grapes: false,
            Pomegranate: false,
            Guava: false,
            Others: false
        });
    };

    return (
        <section id="seller-form" className="seller-section">
            <div className="container">
                <div className="seller-card glass-card">
                    {/* Header Section*/}
                    <div className="seller-header">
                        <span className="seller-badge">🌾 Farmers Direct Portal</span>
                        <h2 className="seller-title">Sell Your Farm Fresh Fruits To Us</h2>
                        <p className="seller-subtitle">
                            Join our trusted network of fruit growers. Sell your harvest directly to TropicSip at transparent, fair market prices with guaranteed fast payouts.
                        </p>

                        {/* Action Buttons */}
                        {step === 0 && (
                            <div className="seller-btn-group">
                                <button className="btn btn-primary" onClick={() => setStep(1)}>
                                    Sell Now 🚀
                                </button>
                                <button className="btn btn-secondary" onClick={() => setShowInfo(!showInfo)}>
                                    {showInfo ? "Hide Details" : "Know More ℹ️"}
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Know More Information Banner */}
                    {showInfo && step === 0 && (
                        <div className="seller-info-grid">
                            <div className="info-item">
                                <span className="info-icon">💰</span>
                                <h4>Best Market Prices</h4>
                                <p>No middlemen involved. Get maximum value for your high-quality fruit yields.</p>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🏦</span>
                                <h4>Direct Bank Payouts</h4>
                                <p>Prompt payment settlement directly into your bank account upon inspection.</p>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🚜</span>
                                <h4>Doorstep Harvest Pickup</h4>
                                <p>We arrange hassle-free transportation straight from your orchard or farm.</p>
                            </div>
                            <div className="info-item">
                                <span className="info-icon">🌿</span>
                                <h4>Long-Term Contracts</h4>
                                <p>Secure recurring supply agreements with TropicSip season after season.</p>
                            </div>
                        </div>
                    )}

                    {/* progres indicator*/}
                    {step > 0 && (
                        <div className="step-indicator-bar">
                            <div className={`step-item ${step >= 1 ? "active" : ""}`}>
                                <div className="step-number">1</div>
                                <span>Personal & Address</span>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${step >= 2 ? "active" : ""}`}>
                                <div className="step-number">2</div>
                                <span>ID & Fruit Details</span>
                            </div>
                            <div className="step-line"></div>
                            <div className={`step-item ${step >= 3 ? "active" : ""}`}>
                                <div className="step-number">3</div>
                                <span>Confirmation</span>
                            </div>
                        </div>
                    )}

                    {/* STEP 1: Personal Details & Address */}
                    {step === 1 && (
                        <form className="seller-form-step" onSubmit={handleForm1Submit}>
                            <h3 className="form-step-title">Step 1: Contact & Address Information</h3>

                            <div className="form-grid-3">
                                <div className="input-group">
                                    <label htmlFor="firstName">First Name *</label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        placeholder="e.g. Ramesh"
                                        required
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="middleName">Middle Name</label>
                                    <input
                                        id="middleName"
                                        name="middleName"
                                        type="text"
                                        placeholder="e.g. Kumar"
                                        value={formData.middleName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="lastName">Last Name *</label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        placeholder="e.g. Patel"
                                        required
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-grid-2">
                                <div className="input-group">
                                    <label htmlFor="email">Email Address *</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="ramesh@example.com"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="phone">Phone Number *</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="10-digit Mobile Number"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="input-group full-width">
                                <label htmlFor="address">Street / Farm Address *</label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="House/Plot No, Village, Landmark"
                                    required
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-grid-4">
                                <div className="input-group">
                                    <label htmlFor="city">City / District *</label>
                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        placeholder="City"
                                        required
                                        value={formData.city}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="state">State *</label>
                                    <input
                                        id="state"
                                        name="state"
                                        type="text"
                                        placeholder="State"
                                        required
                                        value={formData.state}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="pincode">Pincode *</label>
                                    <input
                                        id="pincode"
                                        name="pincode"
                                        type="text"
                                        placeholder="Pincode"
                                        required
                                        value={formData.pincode}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {/* <div className="input-group">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        id="country"
                                        name="country"
                                        type="text"
                                        value={formData.country}
                                        readOnly
                                    />
                                </div> */}
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setStep(0)}>
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Next: Fruit Details ➔
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 2: ID & Fruit Selection */}
                    {step === 2 && (
                        <form className="seller-form-step" onSubmit={handleForm2Submit}>
                            <h3 className="form-step-title">Step 2: Identification & Crop Details</h3>

                            <div className="form-grid-2">
                                <div className="input-group">
                                    <label htmlFor="aadhar">Aadhaar Number *</label>
                                    <input
                                        id="aadhar"
                                        name="aadhar"
                                        type="text"
                                        placeholder="12-digit Aadhaar Number"
                                        required
                                        value={formData.aadhar}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="pan">PAN Number *</label>
                                    <input
                                        id="pan"
                                        name="pan"
                                        type="text"
                                        placeholder="10-character PAN Number"
                                        required
                                        value={formData.pan}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="fruit-selection-section">
                                <label className="section-label">Select fruits you want to sell *</label>
                                <div className="fruit-checkbox-grid">
                                    {["Oranges", "Apples", "Mangoes", "Grapes", "Pomegranate", "Guava", "Others"].map(fruit => (
                                        <label
                                            key={fruit}
                                            className={`fruit-chip ${selectedFruits[fruit] ? "selected" : ""}`}
                                        >
                                            <input
                                                type="checkbox"
                                                checked={selectedFruits[fruit]}
                                                onChange={() => handleFruitChange(fruit)}
                                            />
                                            <span>{fruit}</span>
                                        </label>
                                    ))}
                                </div>

                                {selectedFruits.Others && (
                                    <div className="input-group margin-top">
                                        <label htmlFor="othersFruit">Specify Other Fruits</label>
                                        <input
                                            id="othersFruit"
                                            name="othersFruit"
                                            type="text"
                                            placeholder="Enter names of other fruits..."
                                            value={formData.othersFruit}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                )}
                            </div>

                            <div className="input-group margin-top">
                                <label htmlFor="quantity">Estimated Supply Quantity (in Kgs) *</label>
                                <input
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    placeholder="e.g. 500"
                                    required
                                    value={formData.quantity}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="terms-checkbox">
                                <label htmlFor="agreed" className="checkbox-label">
                                    <input
                                        id="agreed"
                                        name="agreed"
                                        type="checkbox"
                                        required
                                        checked={formData.agreed}
                                        onChange={handleInputChange}
                                    />
                                    <span>
                                        I agree to the <a href="#terms" onClick={(e) => e.preventDefault()}>Terms & Conditions</a> of TropicSip direct seller policy.
                                    </span>
                                </label>
                            </div>

                            <div className="form-actions">
                                <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>
                                    ⬅ Back
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    Submit Application 🚀
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 3: Thank You & Confirmation */}
                    {step === 3 && (
                        <div className="thanks-card">
                            <div className="thanks-icon-wrapper">
                                <span className="thanks-icon">🎉</span>
                            </div>
                            <h2 className="thanks-title">Thanks for joining TropicSip!</h2>
                            <p className="thanks-subtitle">
                                Your application has been successfully recorded. Our procurement team will review your submission and contact you within 24–48 hours.
                            </p>

                            <div className="contract-box">
                                <span className="contract-label">Your Seller Contract Number</span>
                                <h3 className="contract-number">{contractNumber}</h3>
                                <p className="contract-note">
                                    💡 Keep this number handy. You can use this contract number and your phone number to track your application status.
                                </p>
                            </div>

                            <div className="thanks-actions">
                                <button className="btn btn-primary" onClick={resetForm}>
                                    Submit Another Application
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <style>{`
                .seller-section {
                    padding: 60px 0;
                    background-color: var(--bg-main);
                }

                .seller-card {
                    padding: 40px;
                    border-radius: 24px;
                    max-width: 900px;
                    margin: 0 auto;
                    transition: all 0.3s ease;
                }

                .seller-header {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .seller-badge {
                    display: inline-block;
                    padding: 6px 16px;
                    background: rgba(255, 107, 53, 0.1);
                    color: var(--primary-orange);
                    font-size: 0.85rem;
                    font-weight: 700;
                    border-radius: 50px;
                    margin-bottom: 12px;
                    border: 1px solid var(--border-glass);
                }

                .seller-title {
                    font-size: 2.2rem;
                    font-weight: 800;
                    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-mango));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    margin-bottom: 12px;
                }

                .seller-subtitle {
                    color: var(--text-muted);
                    font-size: 1rem;
                    width:80%;
                    margin: 0 auto 24px;
                    line-height: 1.6;
                }

                .seller-btn-group {
                    display: flex;
                    justify-content: center;
                    gap: 16px;
                    margin-top: 10px;
                }

                /* Information Grid for Know More */
                .seller-info-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 20px;
                    margin: 30px 0 10px;
                    padding: 24px;
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid var(--border-glass);
                    border-radius: 16px;
                    animation: fadeIn 0.4s ease;
                }

                .info-item {
                    text-align: center;
                }

                .info-icon {
                    font-size: 2rem;
                    display: block;
                    margin-bottom: 8px;
                }

                .info-item h4 {
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--text-dark);
                    margin-bottom: 6px;
                }

                .info-item p {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    line-height: 1.4;
                    width:100%;
                }

                /* Step Indicator */
                .step-indicator-bar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 12px;
                    margin-bottom: 36px;
                    padding-bottom: 20px;
                    border-bottom: 1px solid var(--border-subtle);
                }

                .step-item {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    font-weight: 600;
                }

                .step-item.active {
                    color: var(--primary-orange);
                }

                .step-number {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    background: #e2e8f0;
                    color: var(--text-muted);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.85rem;
                    font-weight: 700;
                }

                .step-item.active .step-number {
                    background: linear-gradient(135deg, var(--primary-orange), var(--secondary-mango));
                    color: #ffffff;
                }

                .step-line {
                    width: 40px;
                    height: 2px;
                    background: #e2e8f0;
                }

                /* Form Layout */
                .seller-form-step {
                    animation: fadeIn 0.3s ease;
                }

                .form-step-title {
                    font-size: 1.3rem;
                    font-weight: 700;
                    color: var(--text-dark);
                    margin-bottom: 24px;
                    text-align: center;
                }

                .form-grid-2 {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .form-grid-3 {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .form-grid-4 {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 16px;
                    margin-bottom: 16px;
                }

                .input-group {
                    display: flex;
                    flex-direction: column;
                    gap: 6px;
                }

                .input-group.full-width {
                    margin-bottom: 16px;
                }

                .input-group.margin-top {
                    margin-top: 16px;
                }

                .input-group label {
                    font-size: 0.88rem;
                    font-weight: 600;
                    color: var(--text-main);
                }

                .input-group input {
                    padding: 12px 16px;
                    border-radius: 10px;
                    border: 1.5px solid var(--border-glass);
                    background-color: var(--bg-main);
                    color: var(--text-main);
                    font-family: var(--font-family);
                    font-size: 0.95rem;
                    outline: none;
                    transition: border-color 0.2s ease, box-shadow 0.2s ease;
                }

                .input-group input:focus {
                    border-color: var(--primary-orange);
                    box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
                    background-color: #ffffff;
                }

                /* Fruit Selection Grid */
                .fruit-selection-section {
                    margin: 24px 0;
                }

                .section-label {
                    display: block;
                    font-size: 0.95rem;
                    font-weight: 600;
                    color: var(--text-dark);
                    margin-bottom: 12px;
                }

                .fruit-checkbox-grid {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .fruit-chip {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 18px;
                    border-radius: 50px;
                    border: 1.5px solid var(--border-subtle);
                    background: #ffffff;
                    cursor: pointer;
                    font-weight: 500;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    user-select: none;
                }

                .fruit-chip input[type="checkbox"] {
                    accent-color: var(--primary-orange);
                    cursor: pointer;
                }

                .fruit-chip.selected {
                    border-color: var(--primary-orange);
                    background: rgba(255, 107, 53, 0.08);
                    color: var(--primary-orange);
                    font-weight: 600;
                }

                .terms-checkbox {
                    margin: 20px 0;
                }

                .checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    cursor: pointer;
                }

                .checkbox-label input {
                    accent-color: var(--primary-orange);
                    width: 16px;
                    height: 16px;
                }

                .checkbox-label a {
                    color: var(--primary-orange);
                    text-decoration: underline;
                }

                .form-actions {
                    display: flex;
                    justify-content: space-between;
                    gap: 16px;
                    margin-top: 30px;
                    padding-top: 20px;
                    border-top: 1px solid var(--border-subtle);
                }

                /* Thanks Screen */
                .thanks-card {
                    text-align: center;
                    padding: 20px 0;
                    animation: fadeIn 0.4s ease;
                }

                .thanks-icon-wrapper {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, rgba(255, 107, 53, 0.15), rgba(255, 162, 0, 0.2));
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                }

                .thanks-icon {
                    font-size: 2.2rem;
                }

                .thanks-title {
                    font-size: 2rem;
                    font-weight: 800;
                    color: var(--text-dark);
                    margin-bottom: 12px;
                }

                .thanks-subtitle {
                    color: var(--text-muted);
                    font-size: 0.98rem;
                    width:70%;
                    margin: 0 auto 30px;
                    line-height: 1.6;
                }

                .contract-box {
                    background: linear-gradient(135deg, rgba(255, 107, 53, 0.08), rgba(255, 162, 0, 0.12));
                    border: 1.5px dashed var(--primary-orange);
                    border-radius: 16px;
                    display:flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    padding: 24px;
                    width:70%;
                    margin: 0 auto 30px;
                }

                .contract-label {
                    display: block;
                    font-size: 0.85rem;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    color: var(--text-muted);
                    font-weight: 700;
                    margin-bottom: 8px;
                }

                .contract-number {
                    font-size: 2.2rem;
                    font-weight: 900;
                    color: var(--primary-orange);
                    letter-spacing: 2px;
                    margin-bottom: 12px;
                }

                .contract-note {
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    line-height: 1.4;
                    width:80%;
                }

                .thanks-actions {
                    display: flex;
                    justify-content: center;
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(8px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                /* Mobile Responsiveness */
                @media (max-width: 768px) {
                    .seller-card {
                        padding: 24px 16px;
                    }

                    .seller-title {
                        font-size: 1.75rem;
                    }

                    .form-grid-2, .form-grid-3, .form-grid-4 {
                        grid-template-columns: 1fr;
                    }

                    .step-indicator-bar {
                        flex-direction: column;
                        gap: 8px;
                        align-items: flex-start;
                    }

                    .step-line {
                        display: none;
                    }
                }
            `}</style>
        </section>
    );
}
