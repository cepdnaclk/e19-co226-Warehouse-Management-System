import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const CustomerGrid = ({ shouldRefresh }) => {
    const [customers, setCustomers] = useState([]);
    const [deleteCustomerId, setDeleteCustomerId] = useState(null);

    const fetchCustomers = async () => {
        try {
            const response = await axios.get(variables.API_URL + '/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [shouldRefresh]);

    const handleDeleteClick = (customerId) => {
        setDeleteCustomerId(customerId);
    };

    const handleDeleteConfirmation = async (customerId) => {
        try {
            await axios.delete(variables.API_URL + '/api/customers/' + customerId);
            fetchCustomers(); // Refresh the customer list after deleting
        } catch (error) {
            console.error('Error deleting customer:', error);
        }

        setDeleteCustomerId(null); // Reset deleteCustomerId after handling the deletion
    };

    const confirmDelete = (customerId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this customer?');
        if (shouldDelete) {
            handleDeleteConfirmation(customerId);
        }
    };

    return (
        <div>
            <h1>Customer Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Address Line 1</th>
                        <th>Address Line 2</th>
                        <th>Address Line 3</th>
                        <th>Phone Number</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerID}>
                            <td>{customer.customerID}</td>
                            <td>{customer.customerName}</td>
                            <td>{customer.addressLine1}</td>
                            <td>{customer.addressLine2}</td>
                            <td>{customer.addressLine3}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.email}</td>
                            <td>
                                <button onClick={() => confirmDelete(customer.customerID)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerGrid;
