import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';
import './Display.css';


const InventoryGrid = ({ shouldRefresh }) => {
    const storedToken = JSON.parse(localStorage.getItem('token'));
    const [inventory, setInventory] = useState([]);
    const [deleteInventoryId, setDeleteInventoryId] = useState(null);

    const fetchInventory = async () => {
        try {
            const response = await axios.get(variables.API_URL + '/api/inventory',{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
            setInventory(response.data);
        } catch (error) {
            console.error('Error fetching inventory:', error);
        }
    };

    useEffect(() => {
        fetchInventory();
    }, [shouldRefresh]);

    const handleDeleteClick = (inventoryId) => {
        setDeleteInventoryId(inventoryId);
    };

    const handleDeleteConfirmation = async (inventoryId) => {
        try {
            await axios.delete(variables.API_URL + '/api/inventory/' + inventoryId,{
                headers: {
                    Authorization: `Bearer ${storedToken}` // Send token in the headers
                }
            });
            fetchInventory(); // Refresh the inventory list after deleting
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }

        setDeleteInventoryId(null); // Reset deleteInventoryId after handling the deletion
    };

    const confirmDelete = (inventoryId) => {
        const shouldDelete = window.confirm('Are you sure you want to delete this inventory item?');
        if (shouldDelete) {
            handleDeleteConfirmation(inventoryId);
        }
    };

    return (
        <div>
            <h1 className='header'>Inventory Information</h1>
            <table className='table'>
                <thead>
                    <tr>
                        <th>SKU</th>
                        <th>Quantity in Stock</th>
                        <th>Location</th>
                        <th>Product</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.sku}>
                            <td>{item.sku}</td>
                            <td>{item.quantityInStock}</td>
                            <td>{item.location}</td>
                            <td>{item.product.productName}</td>
                            <td>
                                <button onClick={() => confirmDelete(item.sku)}>
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

export default InventoryGrid;
