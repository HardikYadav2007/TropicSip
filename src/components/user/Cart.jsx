import React, { useState, useEffect, useContext } from "react";
import { CartContext } from "../common/CartContext";
import './cart.css' // Importing the separate CSS file

function CartPage({ closeCart }) {
    // Assuming setCart or clearCart is available in your Context to empty the cart after ordering
    const { cart, updateQuantity, setCart } = useContext(CartContext);
    
    const [view, setView] = useState('cart'); // 'cart' or 'address'
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');

    // Load saved addresses from local storage when component mounts
    useEffect(() => {
        const customers = JSON.parse(localStorage.getItem('customers')) || [];
        const addresses = customers.map(c => c.address).filter(Boolean);
        setSavedAddresses(addresses);
    }, []);

    const handlePlaceOrder = () => {
        const finalAddress = newAddress || selectedAddress;
        if (!finalAddress) {
            alert("Please select or enter an address.");
            return;
        }

        // 1. Fetch existing orders
        const existingOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        
        // 2. Create the new order object
        const newOrder = {
            orderId: "TS-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleString(),
            address: finalAddress,
            items: cart,
        };

        // 3. Save order to local storage for the Admin Panel
        existingOrders.push(newOrder);
        localStorage.setItem('allOrders', JSON.stringify(existingOrders));
        
        // 4. Save new address to customers list if they typed a new one
        if (newAddress) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            customers.push({ id: Date.now(), name: "Guest User", address: newAddress });
            localStorage.setItem('customers', JSON.stringify(customers));
        }

        // 5. Clear cart and close
        if (setCart) setCart([]); // Clears the cart if you exported setCart from Context
        alert("Order Placed Successfully!");
        closeCart();
    };

    return (
        <div className="cart-overlay" onClick={closeCart}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                
                {/* Header */}
                <div className="cart-header">
                    <h3>{view === 'cart' ? 'My Cart' : 'Select Delivery Address'}</h3>
                    <button className="close-btn" onClick={closeCart}>✕</button>
                </div>

                {/* Body Content */}
                <div className="cart-body">
                    {view === 'cart' ? (
                        /* --- CART ITEMS VIEW --- */
                        cart.length === 0 ? (
                            <p className="empty-cart">Your cart is empty.</p>
                        ) : (
                            cart.map((product) => (
                                <div className="card" key={product.id}>
                                    <img src={product.image} alt={product.name} className="product-image" />
                                    <div className="product-details">
                                        <p>{product.name}</p>
                                        <div className="quantity-controls">
                                            <button className="decrement" onClick={() => updateQuantity(product.id, product.qty - 1)}>-</button>
                                            <p className="display">{product.qty}</p>
                                            <button className="increment" onClick={() => updateQuantity(product.id, product.qty + 1)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        /* --- ADDRESS SELECTION VIEW --- */
                        <div className="address-container">
                            {savedAddresses.length > 0 && (
                                <div className="saved-addresses">
                                    <h4>Saved Addresses</h4>
                                    {savedAddresses.map((addr, idx) => (
                                        <label key={idx} className="address-label">
                                            <input 
                                                type="radio" 
                                                name="address" 
                                                value={addr} 
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
                            
                            <h4>Add New Address</h4>
                            <textarea 
                                className="address-input"
                                rows="3" 
                                placeholder="Enter your full complete address..." 
                                value={newAddress} 
                                onChange={(e) => { 
                                    setNewAddress(e.target.value); 
                                    setSelectedAddress(''); 
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Footer Action Button */}
                <div className="cart-footer">
                    {view === 'cart' ? (
                        <button 
                            className="checkout-btn"
                            onClick={() => setView('address')} 
                            disabled={cart.length === 0}
                        >
                            Proceed to Checkout <span>&gt;</span>
                        </button>
                    ) : (
                        <div className="address-actions">
                            <button className="back-btn" onClick={() => setView('cart')}>Back to Cart</button>
                            <button className="checkout-btn" onClick={handlePlaceOrder}>Place Order</button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default CartPage;