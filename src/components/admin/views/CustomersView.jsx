import React, { useState, useEffect } from 'react';
import './CustomerView.css'; // Import the new CSS file

export default function AdminCustomers() {
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
        setCustomers(storedCustomers);
    }, []);

    return (
        <div className="admin-customers-container">
            <h2 className="admin-customers-title">Customer Management</h2>

            {customers.length === 0 ? (
                <p className="admin-customers-empty">No customers have registered yet.</p>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Username</th>
                                <th>Email</th>
                                <th>Saved Addresses</th>
                                <th>Join Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.name || "N/A"}</td>
                                    <td className="text-muted username-col">@{customer.username}</td>
                                    <td>{customer.email}</td>
                                    <td className="address-col">
                                        {customer.addresses && customer.addresses.length > 0 ? (
                                            <ul className="address-list">
                                                {customer.addresses.map((addr, i) => (
                                                    <li key={i}>{addr}</li>
                                                ))}
                                            </ul>
                                        ) : customer.address ? (
                                            <span className="text-success">{customer.address}</span>
                                        ) : (
                                            <span className="text-muted">No address added yet</span>
                                        )}
                                    </td>
                                    <td className="text-muted">{customer.joinDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}