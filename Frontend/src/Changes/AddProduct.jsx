import React, { useState } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const AddProduct = ({ onAddProduct }) => {
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
            await axios.post(variables.API_URL + '/api/products', formData);
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

    return (
        <div>
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;
