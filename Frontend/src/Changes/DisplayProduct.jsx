import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(variables.API_URL + '/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleDeleteClick = (productId) => {
        setDeleteProductId(productId);
    };

    const handleDeleteConfirmation = async (productId) => {
        try {
            await axios.delete(variables.API_URL + '/api/products/' + productId);
            fetchProducts(); // Refresh the product list after deleting
        } catch (error) {
            console.error('Error deleting product:', error);
        }

        setDeleteProductId(null); // Reset deleteProductId after handling the deletion
    };

    const confirmDelete = (productId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this product?');
        if (shouldDelete) {
            handleDeleteConfirmation(productId);
        }
    };

    return (
        <div>
            <h1>Product Information</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Selling Price</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.productID}>
                            <td>{product.productID}</td>
                            <td>{product.productName}</td>
                            <td>{product.category}</td>
                            <td>{product.description}</td>
                            <td>{product.sellingPrice}</td>
                            <td>
                                <button onClick={() => confirmDelete(product.productID)}>
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

export default ProductGrid;
