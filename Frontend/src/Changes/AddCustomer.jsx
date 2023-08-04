
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCustomer = () => {
    const [customers, setCustomers] = useState([]);
    const [formData, setFormData] = useState({
        customerName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        phoneNumber: '',
        email: '',
    });

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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post('/api/customers', formData);
            fetchCustomers(); // Refresh the customer list after adding
            setFormData({
                customerName: '',
                addressLine1: '',
                addressLine2: '',
                addressLine3: '',
                phoneNumber: '',
                email: '',
            });
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/customers/${id}`);
            fetchCustomers(); // Refresh the customer list after deleting
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <h1>Customers</h1>
            <form onSubmit={handleSubmit}>
    <div>
        <label htmlFor="customerName">Customer Name:</label>
        <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label htmlFor="addressLine1">Address Line 1:</label>
        <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label htmlFor="addressLine2">Address Line 2:</label>
        <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label htmlFor="addressLine3">Address Line 3:</label>
        <input
            type="text"
            id="addressLine3"
            name="addressLine3"
            value={formData.addressLine3}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
        />
    </div>
    <div>
        <label htmlFor="email">Email:</label>
        <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
        />
    </div>
    <button type="submit">Add Customer</button>
</form>

            <ul>
                {customers.map((customer) => (
                    <li key={customer.id}>
                        {customer.customerName} - {customer.email}
                        <button onClick={() => handleDelete(customer.id)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddCustomer;
