// CustomerGrid.js (Separate JSX file to display customer information in a grid)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerGrid = () => {
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get('/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    return (
        <div>
            <h1>Customer Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Address Line 1</th>
                        <th>Address Line 2</th>
                        <th>Address Line 3</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.customerName}</td>
                            <td>{customer.addressLine1}</td>
                            <td>{customer.addressLine2}</td>
                            <td>{customer.addressLine3}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerGrid;
