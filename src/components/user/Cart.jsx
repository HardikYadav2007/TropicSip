import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from "../../context/AuthContext";
import { CartContext } from "../common/CartContext";
import './cart.css';

export default function Cart({ closeCart }) {
    const { cart, updateQuantity, setCart } = useContext(CartContext);
    const { currentUser } = useAuth(); 
    
    const [view, setView] = useState('cart'); 
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');

    useEffect(() => {
        if (currentUser) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const activeCustomer = customers.find(c => c.username === currentUser.username);
            
            if (activeCustomer && activeCustomer.addresses) {
                setSavedAddresses(activeCustomer.addresses);
            } else if (activeCustomer && activeCustomer.address) {
                setSavedAddresses([activeCustomer.address]);
            }
        }
    }, [currentUser]);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handlePlaceOrder = () => {
        const finalAddress = newAddress || selectedAddress;
        if (!finalAddress) {
            alert("Please select or enter an address.");
            return;
        }

        const existingOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        const newOrder = {
            orderId: "TS-" + Math.floor(1000 + Math.random() * 9000),
            date: new Date().toLocaleString(),
            address: finalAddress,
            customerUsername: currentUser?.username || "Guest",
            items: cart,
        };

        existingOrders.push(newOrder);
        localStorage.setItem('allOrders', JSON.stringify(existingOrders));
        
        if (newAddress && currentUser) {
            const customers = JSON.parse(localStorage.getItem('customers')) || [];
            const customerIndex = customers.findIndex(c => c.username === currentUser.username);
            
            if (customerIndex !== -1) {
                if (!customers[customerIndex].addresses) {
                    customers[customerIndex].addresses = [];
                }
                customers[customerIndex].addresses.push(newAddress);
                customers[customerIndex].address = newAddress;
                localStorage.setItem('customers', JSON.stringify(customers));
            }
        }

        if (setCart) setCart([]); 
        alert("Order Placed Successfully!");
        closeCart();
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="cart-overlay" onClick={closeCart}>
            <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
                {view === 'cart' ? (
                    <>
                        <h2>My Cart</h2>
                        {cart.length === 0 ? (
                            <p className="empty-cart-msg">Your cart is empty.</p>
                        ) : (
                            <div className="cart-items">
                                {cart.map((item, index) => (
                                    <div key={index} className="cart-item">
                                        
                                        <div className="cart-item-info">
                                            <img src={item.image} alt={item.name} className="cart-item-img" />
                                            <span className="cart-item-name">{item.name}</span>
                                        </div>

                                        <div className="cart-item-actions">
                                            <button className="decrement" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                            <span className="cart-item-qty">{item.quantity}</span>
                                            <button className="increment" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {cart.length > 0 && (
                            <div className="cart-total-section">
                                <h3>Total: ₹{calculateTotal()}</h3>
                                <button className="checkout-btn" onClick={() => setView('address')}>
                                    Proceed to Checkout
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <h2>Delivery Address</h2>
                        <div className="address-container">
                            {savedAddresses.length > 0 && (
                                <div className="saved-addresses">
                                    <h4>Saved Addresses</h4>
                                    {savedAddresses.map((addr, index) => (
                                        <label key={index} className="address-label">
                                            <input 
                                                type="radio" 
                                                name="address" 
                                                value={addr} 
                                                className="address-radio"
                                                onChange={(e) => {
                                                    setSelectedAddress(e.target.value);
                                                    setNewAddress(''); 
                                                }}
                                            />
                                            {addr}
                                        </label>
                                    ))}
                                </div>
                            )}
                            
                            <div className="new-address-box">
                                <h4>Add New Address</h4>
                                <textarea 
                                    className="address-textarea"
                                    placeholder="Enter full delivery address..."
                                    value={newAddress}
                                    onChange={(e) => {
                                        setNewAddress(e.target.value);
                                        setSelectedAddress(''); 
                                    }}
                                ></textarea>
                            </div>
                            
                            <div className="address-actions">
                                <button className="back-btn" onClick={() => setView('cart')}>Back</button>
                                <button className="place-order-btn" onClick={handlePlaceOrder}>
                                    Place Order
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}