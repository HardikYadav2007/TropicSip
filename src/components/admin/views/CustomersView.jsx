import React, { useState, useEffect } from 'react';

export default function CustomersView() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        // Fetch customers from local storage when the component loads
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        setCustomers(storedCustomers);
    }, []);

    return (
        <div style={{ padding: '30px', color: '#fff', width: '100%' }}>
            <h2 style={{ borderBottom: '2px solid #333', paddingBottom: '10px', color: '#ff7b00' }}>
                Customer Management
            </h2>

            {customers.length === 0 ? (
                <p style={{ color: '#888', marginTop: '20px' }}>No customers have registered yet.</p>
            ) : (
                <div style={{ marginTop: '20px', overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', background: '#1e1e2f', borderRadius: '8px', overflow: 'hidden' }}>
                        <thead>
                            <tr style={{ background: '#2a2a3d', textAlign: 'left' }}>
                                <th style={{ padding: '15px', borderBottom: '1px solid #333' }}>Name</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #333' }}>Username</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #333' }}>Email</th>
                                <th style={{ padding: '15px', borderBottom: '1px solid #333' }}>Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id} style={{ borderBottom: '1px solid #333' }}>
                                    <td style={{ padding: '15px' }}>{customer.name || "N/A"}</td>
                                    <td style={{ padding: '15px', color: '#aaa' }}>@{customer.username}</td>
                                    <td style={{ padding: '15px' }}>{customer.email}</td>
                                    <td style={{ padding: '15px', color: '#888' }}>{customer.joinDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}