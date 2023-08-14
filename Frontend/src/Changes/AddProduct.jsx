import React, { useState } from 'react';
import axios from 'axios';
import { variables } from '../Variables';
import './Add.css';

const AddProduct = ({ onAddProduct,onClosePopup }) => {
    const [formData, setFormData] = useState({
        productName: '',
        category: '',
        description: '',
        sellingPrice: '',
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
            await axios.post(variables.API_URL + '/api/products', formData,{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
            setFormData({
                productName: '',
                category: '',
                description: '',
                sellingPrice: '',
            });
            onAddProduct();
            alert('Product successfully added!');
        } catch (error) {
            alert('Product adding failed!');
        }
    };
    const handlePopupClose = () => {
        onClosePopup();
      };

    return (
        <div className='add-any-container'>
        <div className='add-any-header'>
        <h1>Add Product</h1>
        <span className='close-icon' onClick={() => handlePopupClose()}>&times;</span>
        </div>
            <form className='any-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Product Name:</label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="sellingPrice">Selling Price:</label>
                    <input
                        type="number"
                        id="sellingPrice"
                        name="sellingPrice"
                        value={formData.sellingPrice}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <button type="submit" className='add-any-button'>Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
