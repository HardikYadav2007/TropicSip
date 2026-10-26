import React, { useState, useEffect, useContext } from 'react';
import './cart.css';
import { useAuth } from '../../context/AuthContext';
import { CartContext } from '../common/CartContext';
import { addCustomerOrder, findCustomer } from '../../data/customers';

const formatCurrency = (value) => `₹${Number(value || 0).toLocaleString()}`;

export default function Cart({ closeCart, openModal }) {
    const { cart, updateQuantity, clearCart, setCart } = useContext(CartContext);
    const { currentUser } = useAuth();
    const [view, setView] = useState('cart');
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');
    const [newAddress, setNewAddress] = useState('');
    const [placedOrderInfo, setPlacedOrderInfo] = useState(null);

    const totalCartons = cart.reduce((sum, item) => sum + Number(item.qty || item.quantity || 1), 0);
    const totalAmount = cart.reduce((sum, item) => {
        const qty = Number(item.qty || item.quantity || 1);
        const price = Number(item.pricePerCarton || item.price || 1200);
        return sum + (price * qty);
    }, 0);

    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // Load the logged-in user's saved addresses
    useEffect(() => {
        if (currentUser) {
            // Read from your friend's new v2 database, fallback to the old one
            const customers = JSON.parse(localStorage.getItem('tropicsip_customers_v2')) || JSON.parse(localStorage.getItem('customers')) || [];
            const activeCustomer = customers.find(c => c.username === currentUser.username);
            
            if (activeCustomer && activeCustomer.addresses && activeCustomer.addresses.length > 0) {
                setSavedAddresses(activeCustomer.addresses);
            } else if (activeCustomer && activeCustomer.address) {
                setSavedAddresses([activeCustomer.address]);
            } else {
                setSavedAddresses([]); // CRITICAL: Empties the list if the user has no saved addresses
            }
        } else {
            setSavedAddresses([]);
        }
    }, [currentUser]);

    const handleProceedToCheckout = () => {
        if (!currentUser) {
            if (openModal) {
                openModal();
            } else {
                alert('Please log in or create an account to place wholesale orders.');
            }
            return;
        }

        setView('address');
    };

    const handlePlaceOrder = () => {
        const finalAddress = (newAddress.trim() || selectedAddress || '').trim();
        if (!finalAddress) {
            alert('Please select or enter a delivery address.');
            return;
        }

        const sanitizedCart = cart.map((item) => ({
            ...item,
            qty: Number(item.qty || item.quantity || 1),
            quantity: Number(item.qty || item.quantity || 1),
            price: Number(item.price || item.pricePerCarton || 1200),
            pricePerCarton: Number(item.pricePerCarton || item.price || 1200)
        }));

        const newOrder = {
            orderId: `TS-${Math.floor(1000 + Math.random() * 9000)}`,
            date: new Date().toLocaleString(),
            status: 'Processing',
            address: finalAddress,
            customerUsername: currentUser?.username || 'Guest',
            customerName: currentUser?.name || 'Wholesale Partner',
            customerEmail: currentUser?.email || '',
            customerPhone: currentUser?.phone || '',
            totalAmount,
            totalCartons,
            paymentMethod: 'Wholesale Net-30 / Credit Terms',
            items: sanitizedCart
        };

        if (currentUser) {
            addCustomerOrder(currentUser.id || currentUser.email || currentUser.username, newOrder);
        } else {
            addCustomerOrder(null, newOrder);
        }

        // Save new address to the customer's profile
        if (newAddress && currentUser) {
            const customers = JSON.parse(localStorage.getItem('tropicsip_customers_v2')) || JSON.parse(localStorage.getItem('customers')) || [];
            const customerIndex = customers.findIndex(c => c.username === currentUser.username);
            
            if (customerIndex !== -1) {
                if (!customers[customerIndex].addresses) {
                    customers[customerIndex].addresses = [];
                }
                customers[customerIndex].addresses.push(newAddress);
                customers[customerIndex].address = newAddress; // Keep legacy address string updated
                
                // Save to BOTH keys to satisfy your friend's new logic
                localStorage.setItem('tropicsip_customers_v2', JSON.stringify(customers));
                localStorage.setItem('customers', JSON.stringify(customers));
            }
        }

        if (typeof clearCart === 'function') {
            clearCart();
        }

        setPlacedOrderInfo(newOrder);
        setView('success');
    };

    return (
        <div className='cart-overlay' onClick={closeCart}>
            <div className='cart-sidebar' onClick={(event) => event.stopPropagation()}>
                <div className='cart-header'>
                    <h3>
                        {view === 'cart' && 'My Wholesale Cart'}
                        {view === 'address' && 'Select Delivery Address'}
                        {view === 'success' && 'Order Confirmed! 🎉'}
                    </h3>
                    <button className='close-btn' onClick={closeCart} type='button'>✕</button>
                </div>

                {view === 'cart' && (
                    <>
                        {cart.length === 0 ? (
                            <div className='empty-cart-state'>
                                <p className='empty-cart-msg'>Your cart is empty.</p>
                            </div>
                        ) : (
                            <>
                                <div className='cart-items'>
                                    {cart.map((item, index) => {
                                        const itemQty = Number(item.qty || item.quantity || 1);
                                        const price = Number(item.pricePerCarton || item.price || 1200);

                                        return (
                                            <div key={item.id || `${item.name}-${index}`} className='cart-item'>
                                                <div className='cart-item-info'>
                                                    {item.image ? (
                                                        <img src={item.image} alt={item.name} className='cart-item-img' />
                                                    ) : (
                                                        <div className='cart-item-placeholder'>🍊</div>
                                                    )}
                                                    <div>
                                                        <p className='cart-item-name'>{item.name}</p>
                                                        <span className='cart-item-price'>
                                                            {formatCurrency(price)} / carton
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className='cart-item-actions'>
                                                    <button
                                                        className='decrement'
                                                        type='button'
                                                        onClick={() => updateQuantity(item.id, itemQty - 1)}
                                                    >
                                                        −
                                                    </button>
                                                    <span className='cart-item-qty'>{itemQty}</span>
                                                    <button
                                                        className='increment'
                                                        type='button'
                                                        onClick={() => updateQuantity(item.id, itemQty + 1)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className='order-summary-box'>
                                    <div className='summary-row'>
                                        <span>Total Cartons:</span>
                                        <strong>{totalCartons}</strong>
                                    </div>
                                    <div className='summary-row'>
                                        <span>Shipping / Transport:</span>
                                        <strong className='summary-green'>FREE Bulk Freight 🚚</strong>
                                    </div>
                                    <div className='summary-row total-row'>
                                        <span>Estimated Total:</span>
                                        <strong className='summary-total'>{formatCurrency(totalAmount)}</strong>
                                    </div>
                                </div>

                                {!currentUser && (
                                    <div className='login-callout'>
                                        <span>🔒</span>
                                        <span>Sign in required to proceed to checkout and record orders.</span>
                                    </div>
                                )}

                                <div className='cart-total-section'>
                                    <button className='checkout-btn' type='button' onClick={handleProceedToCheckout}>
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </>
                )}

                {view === 'address' && (
                    <div className='address-container'>
                        {currentUser && (
                            <div className='account-badge'>
                                <span className='account-badge-label'>Wholesale Buyer Account:</span>
                                <div>{currentUser.name} ({currentUser.email || currentUser.username})</div>
                            </div>
                        )}

                        {savedAddresses.length > 0 && (
                            <div className='saved-addresses'>
                                <h4>Saved Delivery Addresses</h4>
                                {savedAddresses.map((address, index) => (
                                    <label key={`${address}-${index}`} className='address-label'>
                                        <input
                                            type='radio'
                                            name='address'
                                            value={address}
                                            checked={selectedAddress === address}
                                            onChange={(event) => {
                                                setSelectedAddress(event.target.value);
                                                setNewAddress('');
                                            }}
                                            className='address-radio'
                                        />
                                        <span>{address}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        <div className='address-field-group'>
                            <label htmlFor='new-address'>Add a new delivery address</label>
                            <textarea
                                id='new-address'
                                className='address-textarea'
                                value={newAddress}
                                onChange={(event) => setNewAddress(event.target.value)}
                                placeholder='Enter a delivery address for this order'
                            />
                        </div>

                        <div className='address-actions'>
                            <button className='back-btn' type='button' onClick={() => setView('cart')}>
                                Back
                            </button>
                            <button className='place-order-btn' type='button' onClick={handlePlaceOrder}>
                                Place Order
                            </button>
                        </div>
                    </div>
                )}

                {view === 'success' && placedOrderInfo && (
                    <div className='order-success'>
                        <div className='success-icon'>✓</div>
                        <h3>Order placed successfully</h3>
                        <p>
                            Your order <strong>{placedOrderInfo.orderId}</strong> has been placed for <strong>{placedOrderInfo.address}</strong>.
                        </p>
                        <div className='success-meta'>
                            <span>Status: <strong>{placedOrderInfo.status}</strong></span>
                            <span>Total: <strong>{formatCurrency(placedOrderInfo.totalAmount)}</strong></span>
                        </div>
                        <button className='place-order-btn' type='button' onClick={closeCart}>
                            Continue Shopping
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}