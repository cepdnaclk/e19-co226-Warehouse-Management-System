import React, { useState } from 'react';
import axios from 'axios';
import { variables } from '../Variables';
import './Add.css';

const AddCustomer = ({ onAddCustomer,onClosePopup }) => {
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
            const storedToken = JSON.parse(localStorage.getItem('token'));
            alert(storedToken);
            await axios.post(variables.API_URL + '/api/customers', formData,{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
            setFormData({
                customerName: '',
                addressLine1: '',
                addressLine2: '',
                addressLine3: '',
                phoneNumber: '',
                email: '',
            });
            onAddCustomer();
            alert('Customer successfully added!');
        } catch (error) {
            alert('Customer adding failed!');
        }
    };
    const handlePopupClose = () => {
        onClosePopup();
      };

    return (
        <div className='add-any-container'>
        <div className='add-any-header'>
        <h1>Add Customer</h1>
        <span className='close-icon' onClick={() => handlePopupClose()}>&times;</span>
        </div>
            <form className='any-form' onSubmit={handleSubmit}>
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
                <button type="submit" className='add-any-button'>Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;