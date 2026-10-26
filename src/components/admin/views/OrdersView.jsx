import React, { useState, useEffect } from 'react';
import './OrderView.css';

export default function OrdersView() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('allOrders')) || [];
        setOrders(storedOrders.reverse());
    }, []);

    const calculateOrderTotal = (items) => {
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    return (
        <div className="orders-view-container">
            <h2 className="orders-view-title">Order Management</h2>

            {orders.length === 0 ? (
                <p className="orders-view-empty">No orders have been placed yet.</p>
            ) : (
                <div className="orders-table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Date</th>
                                <th>Customer</th>
                                <th>Delivery Address</th>
                                <th>Items Summary</th>
                                <th>Total Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td className="order-id-col">{order.orderId}</td>
                                    <td className="date-col">{order.date}</td>
                                    <td>@{order.customerUsername}</td>
                                    <td className="address-col">{order.address}</td>
                                    <td>
                                        <ul className="items-list">
                                            {order.items.map((item, i) => (
                                                <li key={i}>{item.name} (x{item.quantity})</li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="total-col">₹{calculateOrderTotal(order.items)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}