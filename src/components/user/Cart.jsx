import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../common/CartContext";
import { useAuth } from "../../context/AuthContext";
import { addCustomerOrder, findCustomer } from "../../data/customers";
import './cart.css';

function CartPage({ closeCart, openModal }) {
    const { cart, updateQuantity, clearCart } = useContext(CartContext);
    const { currentUser } = useAuth();
    
    const [view, setView] = useState('cart'); // 'cart' | 'address' | 'success'
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

    // Calculate Cart Totals
    const totalCartons = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const totalAmount = cart.reduce((acc, item) => acc + ((item.pricePerCarton || 1200) * (item.qty || 1)), 0);

    // Load saved addresses from customer profile & local storage
    useEffect(() => {
        let addresses = [];

        if (currentUser) {
            const customerProfile = findCustomer(currentUser.id || currentUser.email);
            if (customerProfile && customerProfile.address) {
                addresses.push(customerProfile.address);
            } else if (currentUser.address) {
                addresses.push(currentUser.address);
            }
        }

        try {
            const legacyCustomers = JSON.parse(localStorage.getItem('customers')) || [];
            legacyCustomers.forEach(c => {
                if (c.address && !addresses.includes(c.address)) {
                    addresses.push(c.address);
                }
            });
        } catch (e) {
            console.error("Error reading saved addresses:", e);
        }

        setSavedAddresses(addresses);
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
    }, [currentUser]);

    const handleProceedToCheckout = () => {
        if (!currentUser) {
            // Require login before checkout as requested
            if (openModal) {
                openModal();
            } else {
                alert("Please log in or create an account to place wholesale orders.");
            }
            return;
        }
        setView('address');
    };

    const handlePlaceOrder = () => {
        const finalAddress = newAddress.trim() || selectedAddress;
        if (!finalAddress) {
            alert("Please select or enter a delivery address.");
            return;
        }

        const newOrder = {
            orderId: "TS-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleString(),
            status: "Processing",
            address: finalAddress,
            totalAmount: totalAmount,
            totalCartons: totalCartons,
            paymentMethod: "Wholesale Net-30 / Credit Terms",
            customerName: currentUser?.name || "Wholesale Partner",
            customerEmail: currentUser?.email || "",
            customerPhone: currentUser?.phone || "",
            items: [...cart]
        };

        // Save order directly into the customer's account in customers.js
        if (currentUser) {
            addCustomerOrder(currentUser.id || currentUser.email, newOrder);
        } else {
            addCustomerOrder(null, newOrder);
        }

        // Clear cart
        if (clearCart) {
            clearCart();
        }

        setPlacedOrderInfo(newOrder);
        setView('success');
    };

    return (
        <div className="cart-overlay" onClick={closeCart}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="cart-header">
                    <h3>
                        {view === 'cart' && 'My Wholesale Cart'}
                        {view === 'address' && 'Select Delivery Address'}
                        {view === 'success' && 'Order Confirmed! 🎉'}
                    </h3>
                    <button className="close-btn" onClick={closeCart}>✕</button>
                </div>

                {/* Body Content */}
                <div className="cart-body">
                    {view === 'cart' && (
                        /* --- CART ITEMS VIEW --- */
                        cart.length === 0 ? (
                            <div className="empty-cart">
                                <span style={{ fontSize: "3rem", display: "block", marginBottom: "10px" }}>🍹</span>
                                <p style={{ fontWeight: 600, fontSize: "1.1rem", color: "var(--text-dark, #333)" }}>Your wholesale cart is empty.</p>
                                <p style={{ fontSize: "0.9rem", color: "var(--text-muted, #777)" }}>Browse our premium cold-pressed juices and add cartons to your order inquiry.</p>
                            </div>
                        ) : (
                            <>
                                <div className="cart-items-list">
                                    {cart.map((product) => (
                                        <div className="card" key={product.id}>
                                            <img src={product.image} alt={product.name} className="cart-item-image" />
                                            <div className="product-details">
                                                <p>{product.name}</p>
                                                <span style={{ fontSize: "0.85rem", color: "var(--text-muted, #666)" }}>
                                                    ₹{product.pricePerCarton || 1200} / carton (24 btls)
                                                </span>
                                                <div className="quantity-controls">
                                                    <button className="decrement" onClick={() => updateQuantity(product.id, product.qty - 1)}>-</button>
                                                    <p className="display">{product.qty} <small style={{ fontSize: "0.75rem", fontWeight: 400 }}>cartons</small></p>
                                                    <button className="increment" onClick={() => updateQuantity(product.id, product.qty + 1)}>+</button>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: "right", fontWeight: 700, color: "var(--primary-orange, #ff6b35)" }}>
                                                ₹{((product.pricePerCarton || 1200) * product.qty).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary Breakdown */}
                                <div style={{
                                    marginTop: "20px",
                                    padding: "16px",
                                    background: "rgba(255, 107, 53, 0.06)",
                                    borderRadius: "12px",
                                    border: "1px dashed var(--primary-orange, #ff6b35)"
                                }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.92rem" }}>
                                        <span>Total Cartons ({cart.length} items):</span>
                                        <strong>{totalCartons} Cartons ({totalCartons * 24} Bottles)</strong>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.92rem" }}>
                                        <span>Shipping / Transport:</span>
                                        <strong style={{ color: "#0c831f" }}>FREE Bulk Freight 🚚</strong>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.1rem", fontWeight: 800, borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: "8px" }}>
                                        <span>Estimated Total:</span>
                                        <span style={{ color: "var(--primary-orange, #ff6b35)" }}>₹{totalAmount.toLocaleString()}</span>
                                    </div>
                                </div>

                                {!currentUser && (
                                    <div style={{
                                        marginTop: "16px",
                                        padding: "12px",
                                        background: "#fffbeb",
                                        borderRadius: "10px",
                                        border: "1px solid #fde68a",
                                        fontSize: "0.88rem",
                                        color: "#92400e",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "8px"
                                    }}>
                                        <span>🔒</span>
                                        <span>Sign in required to proceed to checkout and record orders.</span>
                                    </div>
                                )}
                            </>
                        )
                    )}

                    {view === 'address' && (
                        /* --- ADDRESS SELECTION VIEW --- */
                        <div className="address-container">
                            {currentUser && (
                                <div style={{
                                    padding: "12px 16px",
                                    background: "rgba(12, 131, 31, 0.08)",
                                    border: "1px solid rgba(12, 131, 31, 0.25)",
                                    borderRadius: "10px",
                                    fontSize: "0.9rem"
                                }}>
                                    <span style={{ fontWeight: 600, color: "#0c831f" }}>Wholesale Buyer Account:</span>
                                    <div>{currentUser.name} ({currentUser.email || currentUser.username})</div>
                                </div>
                            )}

                            {savedAddresses.length > 0 && (
                                <div className="saved-addresses">
                                    <h4 style={{ marginBottom: "10px" }}>Saved Delivery Addresses</h4>
                                    {savedAddresses.map((addr, idx) => (
                                        <label key={idx} className="address-label" style={{
                                            border: selectedAddress === addr ? "2px solid #0c831f" : "1px solid var(--border-subtle, #ccc)",
                                            background: selectedAddress === addr ? "rgba(12, 131, 31, 0.05)" : "transparent"
                                        }}>
                                            <input 
                                                type="radio" 
                                                name="address" 
                                                value={addr}
                                                checked={selectedAddress === addr}
                                                onChange={(e) => { 
                                                    setSelectedAddress(e.target.value); 
                                                    setNewAddress(''); 
                                                }} 
                                            />
                                            <span className="address-text">{addr}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                            
                            <h4>Enter New Warehouse / Store Address</h4>
                            <textarea 
                                className="address-input"
                                rows="3" 
                                placeholder="Store name, Plot/Shop No, Street, City, State, Pincode..." 
                                value={newAddress} 
                                onChange={(e) => { 
                                    setNewAddress(e.target.value); 
                                    setSelectedAddress(''); 
                                }}
                            />

                            <div style={{
                                padding: "14px",
                                background: "#f8fafc",
                                borderRadius: "10px",
                                border: "1px solid #e2e8f0",
                                fontSize: "0.88rem"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                                    <span>Total Payable:</span>
                                    <strong>₹{totalAmount.toLocaleString()}</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", color: "#64748b" }}>
                                    <span>Terms:</span>
                                    <span>Wholesale Net-30 Invoice</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {view === 'success' && placedOrderInfo && (
                        /* --- ORDER SUCCESS VIEW --- */
                        <div style={{ textAlign: "center", padding: "20px 10px", animation: "fadeIn 0.3s ease" }}>
                            <div style={{
                                width: "64px",
                                height: "64px",
                                borderRadius: "50%",
                                background: "rgba(12, 131, 31, 0.15)",
                                color: "#0c831f",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "2rem",
                                margin: "0 auto 16px"
                            }}>
                                ✓
                            </div>
                            <h3 style={{ fontSize: "1.4rem", color: "var(--text-dark)", marginBottom: "8px" }}>
                                Wholesale Order Placed!
                            </h3>
                            <p style={{ color: "var(--text-muted)", fontSize: "0.92rem", marginBottom: "20px" }}>
                                Your wholesale consignment has been registered and is saved to your customer account.
                            </p>

                            <div style={{
                                background: "#f8fafc",
                                border: "1px solid #e2e8f0",
                                borderRadius: "12px",
                                padding: "16px",
                                textAlign: "left",
                                marginBottom: "20px"
                            }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Order Reference:</span>
                                    <strong style={{ color: "#0c831f" }}>{placedOrderInfo.orderId}</strong>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Total Volume:</span>
                                    <span>{placedOrderInfo.totalCartons} Cartons</span>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                                    <span style={{ color: "#64748b", fontSize: "0.85rem" }}>Amount:</span>
                                    <strong>₹{placedOrderInfo.totalAmount.toLocaleString()}</strong>
                                </div>
                                <div style={{ marginTop: "10px", paddingTop: "8px", borderTop: "1px solid #e2e8f0", fontSize: "0.82rem", color: "#64748b" }}>
                                    <strong>Delivering to:</strong> {placedOrderInfo.address}
                                </div>
                            </div>

                            <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "20px" }}>
                                💡 Our logistics coordinator will connect with your store manager to coordinate dispatch.
                            </p>

                            <button
                                className="checkout-btn"
                                onClick={closeCart}
                                style={{ justifyContent: "center" }}
                            >
                                Continue Shopping 🛒
                            </button>
                        </div>
                    )}
                </div>

                {/* Footer Action Button */}
                {view !== 'success' && (
                    <div className="cart-footer">
                        {view === 'cart' ? (
                            <button 
                                className="checkout-btn"
                                onClick={handleProceedToCheckout} 
                                disabled={cart.length === 0}
                            >
                                <span>{currentUser ? "Proceed to Checkout" : "Sign In to Checkout 🔒"}</span>
                                <span>₹{totalAmount.toLocaleString()} &gt;</span>
                            </button>
                        ) : (
                            <div className="address-actions">
                                <button className="back-btn" onClick={() => setView('cart')}>← Back to Cart</button>
                                <button className="checkout-btn" onClick={handlePlaceOrder}>Confirm & Place Order</button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default CartPage;