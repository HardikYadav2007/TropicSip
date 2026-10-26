import React, { useState, useEffect } from 'react';
import './OrderView.css';

const initialDemoOrders = [
    {
        orderId: 'TS-8421',
        date: '20/10/2026, 02:30 PM',
        customerName: 'Rahul Sharma',
        customerUsername: '@rahulsharma',
        address: 'Shop 12, APMC Fruit Market, Sector 19, Vashi, Navi Mumbai',
        items: [
            { name: 'Sunburst Orange Juice', quantity: 2, qty: 2, price: 1200 },
            { name: 'Wild Strawberry Glow', quantity: 1, qty: 1, price: 1450 }
        ],
        totalAmount: 3850,
        status: 'Delivered'
    },
    {
        orderId: 'TS-9120',
        date: '24/10/2026, 11:15 AM',
        customerName: 'Priya Nair',
        customerUsername: '@priyanair',
        address: '74 Brigade Road, Near Metro Station, Bangalore',
        items: [
            { name: 'Royal Pomegranate Ruby', quantity: 2, qty: 2, price: 1700 },
            { name: 'Kiwi Lime Elixir', quantity: 1, qty: 1, price: 950 }
        ],
        totalAmount: 4350,
        status: 'Processing'
    }
];

const normalizeOrder = (order, index) => {
    const orderItems = Array.isArray(order.items) ? order.items.map((item, itemIndex) => ({
        id: item.id || `${order.orderId || `TS-${index + 1}`}-${itemIndex}`,
        name: item.name || 'Unnamed Item',
        quantity: Number(item.quantity ?? item.qty ?? 1),
        qty: Number(item.qty ?? item.quantity ?? 1),
        price: Number(item.price ?? 0)
    })) : [];

    return {
        orderId: order.orderId || `TS-${String(index + 1).padStart(4, '0')}`,
        date: order.date || new Date().toLocaleString(),
        customerName: order.customerName || order.customerUsername || 'Customer',
        customerUsername: order.customerUsername || order.customerName || '@customer',
        address: order.address || 'Address on file',
        items: orderItems,
        totalAmount: Number(order.totalAmount ?? orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)),
        status: order.status || 'Processing'
    };
};

const getStoredOrders = () => {
    try {
        const storedValue = localStorage.getItem('allOrders_v2') || localStorage.getItem('allOrders');

        if (!storedValue) {
            return initialDemoOrders;
        }

        const parsed = JSON.parse(storedValue);
        if (!Array.isArray(parsed) || parsed.length === 0) {
            return initialDemoOrders;
        }

        return [...parsed].reverse().map(normalizeOrder);
    } catch (error) {
        return initialDemoOrders;
    }
};

const calculateOrderTotal = (items = []) => items.reduce((total, item) => {
    const quantity = Number(item.quantity ?? item.qty ?? 1);
    const price = Number(item.price ?? 0);
    return total + (price * quantity);
}, 0);

export default function OrdersView() {
    const [orders, setOrders] = useState(() => getStoredOrders());

    useEffect(() => {
        try {
            localStorage.setItem('allOrders_v2', JSON.stringify(orders));
        } catch (error) {
            // Ignore storage errors in restricted browsing contexts.
        }
    }, [orders]);

    const handleStatusChange = (orderId, newStatus) => {
        const updatedOrders = orders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
        );

        setOrders(updatedOrders);

        try {
            localStorage.setItem('allOrders_v2', JSON.stringify(updatedOrders));
        } catch (error) {
            // Ignore storage errors in restricted browsing contexts.
        }
    };

    const totalRevenue = orders.reduce((sum, order) => {
        const value = Number(order.totalAmount ?? calculateOrderTotal(order.items || []));
        return sum + value;
    }, 0);

    return (
        <div className="orders-view-container">
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '2px solid #333',
                    paddingBottom: '16px',
                    marginBottom: '20px',
                    flexWrap: 'wrap',
                    gap: '10px'
                }}
            >
                <div>
                    <h2 className="orders-view-title">📦 Wholesale Orders Fulfillment</h2>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '0.95rem' }}>
                        Preview wholesale orders, consignments, and delivery statuses.
                    </p>
                </div>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <div style={{ background: '#2a2a3d', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
                        Demo Orders: <strong style={{ color: '#ff7b00' }}>{orders.length}</strong>
                    </div>
                    <div style={{ background: '#2a2a3d', padding: '8px 14px', borderRadius: '8px', fontSize: '0.85rem' }}>
                        Revenue: <strong style={{ color: '#10b981' }}>₹{totalRevenue.toLocaleString()}</strong>
                    </div>
                </div>
            </div>

            {orders.length === 0 ? (
                <p className="orders-view-empty">No wholesale orders found.</p>
            ) : (
                <div className="orders-table-wrapper">
                    <table className="orders-table">
                        <thead>
                            <tr>
                                <th>Order ID & Date</th>
                                <th>Customer & Destination</th>
                                <th>Items Ordered</th>
                                <th>Total Amount</th>
                                <th>Fulfillment Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={order.orderId || index}>
                                    <td className="order-id-col">
                                        <div>{order.orderId}</div>
                                        <div className="date-col">{order.date}</div>
                                    </td>
                                    <td>
                                        <div style={{ fontWeight: 600, color: '#fff' }}>
                                            {order.customerName || order.customerUsername || 'Customer'}
                                        </div>
                                        <div style={{ color: '#aaa', fontSize: '0.82rem', marginTop: '4px' }}>
                                            {order.customerUsername ? `@${order.customerUsername.replace('@', '')}` : '@customer'}
                                        </div>
                                        <div className="address-col" style={{ marginTop: '6px' }}>
                                            📍 {order.address || 'Address on file'}
                                        </div>
                                    </td>
                                    <td>
                                        <ul className="items-list">
                                            {(order.items || []).map((item, i) => (
                                                <li key={`${order.orderId || index}-${i}`}>
                                                    {item.name} (x{Number(item.quantity ?? item.qty ?? 1)})
                                                </li>
                                            ))}
                                        </ul>
                                    </td>
                                    <td className="total-col">
                                        ₹{(Number(order.totalAmount ?? calculateOrderTotal(order.items || []))).toLocaleString()}
                                    </td>
                                    <td>
                                        <select
                                            value={order.status || 'Processing'}
                                            onChange={(event) => handleStatusChange(order.orderId, event.target.value)}
                                            style={{
                                                padding: '8px 12px',
                                                borderRadius: '6px',
                                                border: '1px solid #444',
                                                background: '#2a2a3d',
                                                color: order.status === 'Delivered' ? '#34d399' : order.status === 'Dispatched' ? '#38bdf8' : '#fbbf24',
                                                fontWeight: 700,
                                                cursor: 'pointer',
                                                outline: 'none'
                                            }}
                                        >
                                            {['Pending', 'Processing', 'Dispatched', 'Delivered', 'Cancelled'].map((status) => (
                                                <option key={status} value={status} style={{ background: '#1e1e2f', color: '#fff' }}>
                                                    {status}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}