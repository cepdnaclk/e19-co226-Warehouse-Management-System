// DeleteCustomer.js (Separate JSX file to search and delete a customer)

import React, { useState } from 'react';
import axios from 'axios';

const DeleteCustomer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [deleted, setDeleted] = useState(false);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`/api/customers?name=${searchTerm}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error searching for customers:', error);
        }
    };

    const handleDelete = async (customerId) => {
        try {
            await axios.delete(`/api/customers/${customerId}`);
            setSearchResults(searchResults.filter((customer) => customer.id !== customerId));
            setDeleted(true);
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    return (
        <div>
            <h1>Delete Customer</h1>
            <div>
                <label htmlFor="searchTerm">Search by Name or Customer ID:</label>
                <input
                    type="text"
                    id="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {searchResults.length > 0 ? (
                <div>
                    <h2>Search Results</h2>
                    <ul>
                        {searchResults.map((customer) => (
                            <li key={customer.id}>
                                {customer.customerName} - {customer.email}
                                <button onClick={() => handleDelete(customer.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                    {deleted ? <p>Customer deleted successfully!</p> : <p>No results found.</p>}
                </div>
            )}
        </div>
    );
};

export default DeleteCustomer;
