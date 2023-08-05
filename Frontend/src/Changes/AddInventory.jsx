import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const AddInventory = () => {
    const [formData, setFormData] = useState({
        SKU: '',
        quantityInStock: '',
        location: '',
        product: '',
    });

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(variables.API_URL + '/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

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
            await axios.post(variables.API_URL + '/api/inventory', formData);
            setFormData({
                SKU: '',
                quantityInStock: '',
                location: '',
                product: '',
            });
            alert('Inventory successfully added!');
        } catch (error) {
            alert('Inventory adding failed!');
        }
    };

    return (
        <div>
            <h1>Add Inventory</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="SKU">SKU:</label>
                    <input
                        type="text"
                        id="SKU"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="quantityInStock">Quantity in Stock:</label>
                    <input
                        type="text"
                        id="quantityInStock"
                        name="quantityInStock"
                        value={formData.quantityInStock}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location:</label>
                    <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label htmlFor="product">Product:</label>
                    <select
                        id="product"
                        name="product"
                        value={formData.product}
                        onChange={handleInputChange}
                    >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product.productID} value={product}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Inventory</button>
            </form>
        </div>
    );
};

export default AddInventory;
