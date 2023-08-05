import React, { useState } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const AddCustomer = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        addressLine1: '',
        addressLine2: '',
        addressLine3: '',
        phoneNumber: '',
        email: '',
    });

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
            await axios.post(variables.API_URL + '/api/customers', formData);
            setFormData({
                customerName: '',
                addressLine1: '',
                addressLine2: '',
                addressLine3: '',
                phoneNumber: '',
                email: '',
            });
            alert('Customer successfully added!');
        } catch (error) {
            alert('Customer adding failed!');
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
                        required
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
                        required
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
        </div>
    );
};

export default AddCustomer;

