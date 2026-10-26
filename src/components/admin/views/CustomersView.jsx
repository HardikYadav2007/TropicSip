import React, { useState, useEffect } from 'react';
import { getCustomers } from '../../../data/customers';

export default function CustomersView() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch registered customer accounts
        const list = getCustomers();
        setCustomers(list);
    }, []);

    return (
        <div style={{ padding: '30px', color: '#fff', width: '100%', boxSizing: 'border-box' }}>
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #333', paddingBottom: '16px', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
                <div>
                    <h2 style={{ color: '#ff7b00', margin: '0 0 6px 0' }}>👥 Customer Accounts Directory</h2>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '0.95rem' }}>
                        Registered customer accounts and retail partners. New user registrations automatically appear below.
                    </p>
                </div>
                <div style={{ background: '#2a2a3d', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}>
                    Total Customers: <strong style={{ color: '#ff7b00' }}>{customers.length}</strong>
                </div>
            </div>

            {/* Customers Table showing only their personal/account details */}
            {customers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#1e1e2f', borderRadius: '12px' }}>
                    <p style={{ color: '#888', fontSize: '1.1rem' }}>No customer accounts have registered yet.</p>
                </div>
            ) : (
                <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1e1e2f', borderRadius: '10px', overflow: 'hidden', fontSize: '0.92rem' }}>
                        <thead>
                            <tr style={{ background: '#2a2a3d', textAlign: 'left', color: '#bbb' }}>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Name & Business</th>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Username</th>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Email Address</th>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Phone Number</th>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Address / Location</th>
                                <th style={{ padding: '14px', borderBottom: '1px solid #333' }}>Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} style={{ borderBottom: '1px solid #2a2a3d' }}>
                                    <td style={{ padding: '14px' }}>
                                        <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{customer.name || "N/A"}</strong>
                                        {customer.company && (
                                            <div style={{ color: '#ff9f43', fontSize: '0.82rem', marginTop: '2px' }}>
                                                🏢 {customer.company}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ padding: '14px', color: '#ff7b00' }}>@{customer.username}</td>
                                    <td style={{ padding: '14px', color: '#ddd' }}>{customer.email || "N/A"}</td>
                                    <td style={{ padding: '14px', color: '#aaa' }}>{customer.phone || "Not provided"}</td>
                                    <td style={{ padding: '14px', color: '#888', maxWidth: '280px' }}>
                                        {customer.address ? `${customer.address}${customer.city ? `, ${customer.city}` : ""}` : "Address on file"}
                                    </td>
                                    <td style={{ padding: '14px', color: '#888' }}>{customer.joinDate || "Recent"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}