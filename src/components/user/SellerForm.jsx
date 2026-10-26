import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { 
    addCustomerApplication, 
    getCustomerApplications, 
    findApplicationByQuery, 
    findCustomer 
} from "../../data/customers";
import "./SellerForm.css";

export default function SellerForm({ openModal }) {
    const { currentUser } = useAuth();

    // Steps: 0 = Landing, 1 = Personal Details, 2 = Crop Details, 3 = Confirmation, 'track' = Tracking Portal, 'auth-required' = Signin Gate
    const [step, setStep] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [contractNumber, setContractNumber] = useState("");

    // Tracking state
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [hasSearched, setHasSearched] = useState(false);
    const [copySuccess, setCopySuccess] = useState("");

    // Form data state
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

    // Auto-fill from logged in account if available
    useEffect(() => {
        if (currentUser) {
            const customerProfile = findCustomer(currentUser.id || currentUser.email);
            const nameParts = (currentUser.name || "").trim().split(" ");
            const first = nameParts[0] || "";
            const last = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

            setFormData(prev => ({
                ...prev,
                firstName: prev.firstName || first,
                lastName: prev.lastName || last,
                email: prev.email || currentUser.email || "",
                phone: prev.phone || customerProfile?.phone || currentUser.phone || "",
                address: prev.address || customerProfile?.address || currentUser.address || "",
                city: prev.city || customerProfile?.city || "",
                state: prev.state || customerProfile?.state || "",
                pincode: prev.pincode || customerProfile?.pincode || ""
            }));

            if (step === 'auth-required') {
                setStep(1);
            }
        }
    }, [currentUser, step]);

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

    const handleSellNowClick = () => {
        if (!currentUser) {
            setStep('auth-required');
        } else {
            setStep(1);
        }
    };

    const handleForm1Submit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleForm2Submit = (e) => {
        e.preventDefault();
        const randomDigits = Math.floor(100000 + Math.random() * 900000);
        const newContract = `TS-${randomDigits}`;
        setContractNumber(newContract);

        // Collect all selected fruits
        const activeFruits = Object.keys(selectedFruits).filter(k => selectedFruits[k]);
        if (selectedFruits.Others && formData.othersFruit) {
            activeFruits.push(formData.othersFruit.trim());
        }

        const newSubmission = {
            id: `SUB-${Date.now()}`,
            contractNumber: newContract,
            submittedAt: new Date().toISOString(),
            farmerName: `${formData.firstName} ${formData.middleName ? formData.middleName + ' ' : ''}${formData.lastName}`.trim(),
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            country: formData.country || "India",
            aadhar: formData.aadhar,
            pan: formData.pan,
            quantity: formData.quantity,
            fruits: activeFruits.length > 0 ? activeFruits : ["Mixed Fruits"],
            status: "Pending Review",
            adminNotes: "Application successfully submitted. Awaiting initial document verification."
        };

        // Save into customer profile in customers.js & sync with global submissions
        addCustomerApplication(currentUser?.id || formData.email, newSubmission);

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

    // Tracking Handlers
    const handleTrackSearch = (e) => {
        if (e) e.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults([]);
            setHasSearched(false);
            return;
        }
        const results = findApplicationByQuery(searchQuery.trim());
        setSearchResults(results);
        setHasSearched(true);
    };

    const handleCopyContract = (text) => {
        navigator.clipboard?.writeText(text);
        setCopySuccess(text);
        setTimeout(() => setCopySuccess(""), 2000);
    };

    // Applications tied to current logged in user
    const userApplications = currentUser 
        ? getCustomerApplications(currentUser.id || currentUser.email)
        : [];

    return (
        <section id="seller-form" className="seller-section">
            <div className="container">
                <div className="seller-card glass-card">
                    {/* Header Section */}
                    <div className="seller-header">
                        <span className="seller-badge">🌾 Farmers Direct Portal</span>
                        <h2 className="seller-title">Sell Your Farm Fresh Fruits To Us</h2>
                        <p className="seller-subtitle">
                            Join our trusted network of fruit growers. Sell your harvest directly to TropicSip at transparent, fair market prices with guaranteed fast payouts.
                        </p>

                        {/* Action Buttons: 3 Options as requested */}
                        {step === 0 && (
                            <div className="seller-btn-group">
                                <button className="btn btn-primary" onClick={handleSellNowClick}>
                                    Sell Now 🚀
                                </button>
                                <button 
                                    className="btn btn-secondary track-action-btn" 
                                    onClick={() => { setStep('track'); setSearchResults([]); setHasSearched(false); }}
                                >
                                    Track Application 📋
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

                    {/* Sign-in Gate View */}
                    {step === 'auth-required' && (
                        <div className="auth-gate-box">
                            <div className="auth-gate-icon">🔒</div>
                            <h3 className="auth-gate-title">Sign In Required to Apply</h3>
                            <p className="auth-gate-desc">
                                To ensure verified grower onboarding, direct bank payouts, and continuous application tracking, please sign in or register your account before submitting your harvest details.
                            </p>

                            <div className="auth-gate-actions">
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        if (openModal) openModal();
                                    }}
                                >
                                    Sign In / Register to Apply ➔
                                </button>
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={() => setStep(0)}
                                >
                                    Cancel & Return
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Progress Indicator for application workflow */}
                    {(step === 1 || step === 2 || step === 3) && (
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
                            <div className="step-header-with-badge">
                                <h3 className="form-step-title">Step 1: Contact & Address Information</h3>
                                {currentUser && (
                                    <span className="user-auto-filled-pill">
                                        ✓ Linked to account: <strong>{currentUser.email || currentUser.username}</strong>
                                    </span>
                                )}
                            </div>

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

                            <div className="form-grid-3">
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
                                Your application has been successfully recorded in your customer profile. Our procurement team will review your submission and contact you within 24–48 hours.
                            </p>

                            <div className="contract-box">
                                <span className="contract-label">Your Sourcing Contract Number</span>
                                <h3 className="contract-number">{contractNumber}</h3>
                                <button 
                                    className="btn-copy-chip" 
                                    onClick={() => handleCopyContract(contractNumber)}
                                >
                                    {copySuccess === contractNumber ? "✓ Copied to clipboard!" : "📋 Copy Contract ID"}
                                </button>
                                <p className="contract-note" style={{ marginTop: "12px" }}>
                                    💡 You can track your application, inspection schedule, and payout status anytime using this contract number.
                                </p>
                            </div>

                            <div className="thanks-actions" style={{ gap: "16px", flexWrap: "wrap" }}>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => {
                                        setStep('track');
                                        setSearchQuery(contractNumber);
                                        const res = findApplicationByQuery(contractNumber);
                                        setSearchResults(res);
                                        setHasSearched(true);
                                    }}
                                >
                                    Track This Application Now ➔
                                </button>
                                <button className="btn btn-secondary" onClick={resetForm}>
                                    Submit Another Application
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 'track': Dedicated Application Tracking Portal */}
                    {step === 'track' && (
                        <div className="track-portal-container">
                            <div className="track-portal-header">
                                <div className="track-header-left">
                                    <h3 className="track-title">📋 Track Sourcing Application</h3>
                                    <p className="track-desc">
                                        Monitor verification progress, agronomist field visits, and procurement contract status in real-time.
                                    </p>
                                </div>
                                <button 
                                    className="btn btn-secondary btn-sm" 
                                    onClick={() => setStep(0)}
                                >
                                    ← Back to Portal Home
                                </button>
                            </div>

                            {/* Search Bar */}
                            <form className="track-search-box" onSubmit={handleTrackSearch}>
                                <input 
                                    type="text" 
                                    className="track-input"
                                    placeholder="Enter your Contract Number (e.g. TS-123456) or Phone / Email..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button type="submit" className="btn btn-primary track-btn-submit">
                                    Track Now 🔍
                                </button>
                                {searchQuery && (
                                    <button 
                                        type="button" 
                                        className="btn btn-secondary"
                                        onClick={() => { setSearchQuery(""); setSearchResults([]); setHasSearched(false); }}
                                    >
                                        Clear
                                    </button>
                                )}
                            </form>

                            {/* Logged in prompt if guest */}
                            {!currentUser && (
                                <div className="track-login-banner">
                                    <span>💡 Have an account?</span>
                                    <span style={{ color: "var(--text-muted)" }}>Sign in to automatically view all your submitted applications without searching.</span>
                                    <button 
                                        className="btn-login-inline" 
                                        onClick={() => { if (openModal) openModal(); }}
                                    >
                                        Sign In Now
                                    </button>
                                </div>
                            )}

                            {/* Case A: Search Results */}
                            {hasSearched && (
                                <div className="track-results-section">
                                    <h4 className="section-heading">
                                        Search Results for "{searchQuery}" ({searchResults.length})
                                    </h4>

                                    {searchResults.length === 0 ? (
                                        <div className="no-app-found glass-card">
                                            <span style={{ fontSize: "2.5rem" }}>🔎</span>
                                            <h4>No Application Found</h4>
                                            <p>No matching record found for "{searchQuery}". Please check your contract number or registered phone number.</p>
                                        </div>
                                    ) : (
                                        searchResults.map(app => (
                                            <ApplicationCard 
                                                key={app.id || app.contractNumber} 
                                                app={app} 
                                                onCopy={handleCopyContract}
                                                copySuccess={copySuccess}
                                            />
                                        ))
                                    )}
                                </div>
                            )}

                            {/* Case B: Logged-in User's Applications */}
                            {currentUser && !hasSearched && (
                                <div className="track-user-apps-section">
                                    <div className="user-apps-header">
                                        <h4 className="section-heading">
                                            Your Submitted Applications ({userApplications.length})
                                        </h4>
                                        <span className="user-badge-mini">Account: {currentUser.name || currentUser.username}</span>
                                    </div>

                                    {userApplications.length === 0 ? (
                                        <div className="no-app-found glass-card">
                                            <span style={{ fontSize: "2.5rem" }}>🚜</span>
                                            <h4>No Applications Yet</h4>
                                            <p>You haven't submitted any farmer supply applications with this account yet.</p>
                                            <button 
                                                className="btn btn-primary" 
                                                style={{ marginTop: "12px" }}
                                                onClick={() => setStep(1)}
                                            >
                                                Submit New Application ➔
                                            </button>
                                        </div>
                                    ) : (
                                        userApplications.map(app => (
                                            <ApplicationCard 
                                                key={app.id || app.contractNumber} 
                                                app={app} 
                                                onCopy={handleCopyContract}
                                                copySuccess={copySuccess}
                                            />
                                        ))
                                    )}
                                </div>
                            )}

                        </div>
                    )}

                </div>
            </div>
        </section>
    );
}

// Sub-component for individual application card with interactive stage stepper
function ApplicationCard({ app, onCopy, copySuccess }) {
    // Stage logic
    const status = app.status || "Pending Review";
    let activeStageIndex = 0;
    if (status === "Pending Review") activeStageIndex = 1;
    else if (status === "Under Inspection") activeStageIndex = 2;
    else if (status === "Approved") activeStageIndex = 3;
    else if (status === "Contract Dispatched") activeStageIndex = 4;
    else if (status === "Delivered" || status === "Completed") activeStageIndex = 5;

    const stages = [
        { label: "Submitted", desc: "Form Received" },
        { label: "Document Verification", desc: "Aadhaar / Land Records" },
        { label: "Farm Inspection", desc: "Soil & Fruit Quality Test" },
        { label: "Contract Approved", desc: "Price & Terms Locked" },
        { label: "Harvest Pickup", desc: "Doorstep Transport & Payout" }
    ];

    const getStatusBadgeClass = () => {
        if (status === "Approved") return "badge-approved";
        if (status === "Under Inspection") return "badge-inspection";
        if (status === "Contract Dispatched") return "badge-dispatched";
        if (status === "Rejected") return "badge-rejected";
        return "badge-pending";
    };

    return (
        <div className="app-track-card glass-card">
            {/* Card Header */}
            <div className="app-card-top">
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <span className="app-contract-badge">{app.contractNumber}</span>
                        <button 
                            className="btn-mini-copy" 
                            title="Copy Contract Number"
                            onClick={() => onCopy(app.contractNumber)}
                        >
                            {copySuccess === app.contractNumber ? "✓ Copied" : "📋 Copy"}
                        </button>
                    </div>
                    <span className="app-submission-date">
                        Submitted: {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : "Recent"}
                    </span>
                </div>

                <span className={`app-status-pill ${getStatusBadgeClass()}`}>
                    ● {status}
                </span>
            </div>

            {/* Stepper Progress Bar */}
            <div className="stepper-container">
                {stages.map((stage, idx) => {
                    const isDone = idx < activeStageIndex;
                    const isCurrent = idx === activeStageIndex;
                    return (
                        <div key={idx} className="stepper-item">
                            <div className="stepper-line-container">
                                {idx > 0 && (
                                    <div className={`stepper-line ${idx <= activeStageIndex ? "line-active" : ""}`}></div>
                                )}
                                <div className={`stepper-node ${isDone ? "node-done" : isCurrent ? "node-current" : ""}`}>
                                    {isDone ? "✓" : idx + 1}
                                </div>
                                {idx < stages.length - 1 && (
                                    <div className={`stepper-line ${idx < activeStageIndex ? "line-active" : ""}`}></div>
                                )}
                            </div>
                            <span className={`stepper-title ${isCurrent ? "title-current" : ""}`}>
                                {stage.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* Crop & Farmer Details Grid */}
            <div className="app-details-grid">
                <div className="detail-field">
                    <span className="field-label">Farmer / Supplier</span>
                    <strong className="field-value">{app.farmerName}</strong>
                </div>
                <div className="detail-field">
                    <span className="field-label">Contact</span>
                    <span className="field-value">{app.phone} | {app.email}</span>
                </div>
                <div className="detail-field">
                    <span className="field-label">Crops Offered</span>
                    <div className="fruit-tags-row">
                        {(app.fruits || []).map((f, i) => (
                            <span key={i} className="crop-tag">{f}</span>
                        ))}
                    </div>
                </div>
                <div className="detail-field">
                    <span className="field-label">Estimated Supply</span>
                    <strong className="field-value" style={{ color: "var(--primary-orange)" }}>
                        {Number(app.quantity).toLocaleString()} Kgs
                    </strong>
                </div>
                <div className="detail-field full">
                    <span className="field-label">Farm Location</span>
                    <span className="field-value">
                        {app.address ? `${app.address}, ` : ""}{app.city || ""}, {app.state || ""} {app.pincode ? `- ${app.pincode}` : ""}
                    </span>
                </div>
            </div>
        </div>
    );
}
