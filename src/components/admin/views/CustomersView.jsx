import React, { useState, useEffect } from 'react';
import './CustomerView.css';
import { getCustomers } from '../../../data/customers';

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        setCustomers(getCustomers());
    }, []);

    return (
        <div className='admin-customers-container'>
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
                    <h2 className='admin-customers-title'>👥 Customer Accounts Directory</h2>
                    <p style={{ color: '#aaa', margin: 0, fontSize: '0.95rem' }}>
                        Registered customer accounts and retail partners. New user registrations automatically appear below.
                    </p>
                </div>
                <div style={{ background: '#2a2a3d', padding: '8px 16px', borderRadius: '8px', fontSize: '0.9rem' }}>
                    Total Customers: <strong style={{ color: '#ff7b00' }}>{customers.length}</strong>
                </div>
            </div>

            {customers.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px', background: '#1e1e2f', borderRadius: '12px' }}>
                    <p style={{ color: '#888', fontSize: '1.1rem' }}>No customer accounts have registered yet.</p>
                </div>
            ) : (
                <div className='admin-table-wrapper'>
                    <table className='admin-table'>
                        <thead>
                            <tr>
                                <th>Name & Business</th>
                                <th>Username</th>
                                <th>Email Address</th>
                                <th>Phone Number</th>
                                <th>Address / Location</th>
                                <th>Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <strong style={{ color: '#fff', fontSize: '0.95rem' }}>{customer.name || 'N/A'}</strong>
                                        {customer.company && (
                                            <div style={{ color: '#ff9f43', fontSize: '0.82rem', marginTop: '2px' }}>
                                                🏢 {customer.company}
                                            </div>
                                        )}
                                    </td>
                                    <td style={{ color: '#ff7b00' }}>@{customer.username}</td>
                                    <td style={{ color: '#ddd' }}>{customer.email || 'N/A'}</td>
                                    <td style={{ color: '#aaa' }}>{customer.phone || 'Not provided'}</td>
                                    <td style={{ color: '#888', maxWidth: '280px' }}>
                                        {customer.address ? `${customer.address}${customer.city ? `, ${customer.city}` : ''}` : 'Address on file'}
                                    </td>
                                    <td style={{ color: '#888' }}>{customer.joinDate || 'Recent'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}