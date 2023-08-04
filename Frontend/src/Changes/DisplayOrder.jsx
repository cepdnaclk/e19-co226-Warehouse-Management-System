import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayOrder() {
  const [orderId, setOrderId] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  const [allOrders, setAllOrders] = useState([]);

  const handleFetchOrder = (e) => {
    e.preventDefault();

    // Replace 'your-api-endpoint' with the actual API endpoint to fetch the order details.
    axios.get(`your-api-endpoint/${orderId}`)
      .then((response) => {
        setOrderDetails(response.data); // Assuming the response.data contains the order details.
      })
      .catch((error) => {
        console.error('Error fetching order:', error);
        setOrderDetails(null); // Reset order details if an error occurs.
      });
  };

  const handleFetchAllOrders = () => {
    // Replace 'your-api-endpoint' with the actual API endpoint to fetch all orders from the backend.
    axios.get('your-api-endpoint')
      .then((response) => {
        setAllOrders(response.data); // Assuming the response.data is an array of all orders.
      })
      .catch((error) => {
        console.error('Error fetching all orders:', error);
        setAllOrders([]); // Reset all orders if an error occurs.
      });
  };

  return (
    <div>
      <h2>Display Order</h2>
      <form onSubmit={handleFetchOrder}>
      <label htmlFor="orderId">Enter Order ID:</label>
        <input
          type="text"
          id="orderId"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          required
        />
        <button type="submit">Fetch Order</button>
      </form>

      {orderDetails && (
        <div>
          {/* Display the fetched order details */}
        </div>
      )}

      <h2>All Orders</h2>
      <button onClick={handleFetchAllOrders}>Fetch All Orders</button>
      {allOrders.length > 0 ? (
        <ul>
          {allOrders.map((order) => (
            <li key={order.orderId}>
              Order ID: {order.orderId}, Products: {order.productsOrdered}, Price: {order.price}
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders available. Click "Fetch All Orders" to fetch and display all orders.</p>
      )}
    </div>
  );
}

export default DisplayOrder;
