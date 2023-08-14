import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';
import './Add.css';

const AddInventory = ({ onAddInventory,onClosePopup}) => {
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
            const storedToken = JSON.parse(localStorage.getItem('token'));
            const response = await axios.get(variables.API_URL + '/api/products',{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
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
        const { SKU, quantityInStock, location, product } = formData;

        try {
            const storedToken = JSON.parse(localStorage.getItem('token'));
            await axios.post(variables.API_URL + `/api/inventory/${SKU}/${product}`, {
                'quantityInStock':quantityInStock,
                'location':location
            },{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
            // console.log(product);
            setFormData({
                SKU: '',
                quantityInStock: '',
                location: '',
                product: '',
            });
            onAddInventory();
            alert('Inventory successfully added!');
        } catch (error) {
            alert('Inventory adding failed!');
        }
    };
    const handlePopupClose = () => {
        onClosePopup();
      };

    return (
        <div className='add-any-container'>
        <div className='add-any-header'>
        <h1>Add Inventory</h1>
        <span className='close-icon' onClick={() => handlePopupClose()}>&times;</span>
        </div>
            <form className='any-form' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="SKU">SKU:</label>
                    <input
                        type="number"
                        id="SKU"
                        name="SKU"
                        value={formData.SKU}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="quantityInStock">Quantity in Stock:</label>
                    <input
                        type="number"
                        id="quantityInStock"
                        name="quantityInStock"
                        value={formData.quantityInStock}
                        onChange={handleInputChange}
                        required
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
                        required
                    >
                        <option value="">Select a product</option>
                        {products.map((product) => (
                            <option key={product.productID} value={product.productID}>
                                {product.productName}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className='add-any-button'>Add Inventory</button>
            </form>
        </div>
    );
};

export default AddInventory;



