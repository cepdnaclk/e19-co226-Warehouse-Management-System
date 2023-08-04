import React, { useState } from 'react';
import axios from 'axios';

function PlaceOrder() {
  const [orderId, setOrderId] = useState('');
  const [productsOrdered, setProductsOrdered] = useState('');
  const [price, setPrice] = useState('');

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    const orderData = {
      orderId,
      productsOrdered,
      price,
    };

    // Replace 'your-api-endpoint' with the actual API endpoint to save the order data.
    axios.post('your-api-endpoint', orderData)
      .then((response) => {
        console.log('Order placed successfully:', response.data);
        // You can perform any additional actions upon successful order placement.
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        // Handle errors if the order placement fails.
      });
  };

  return (
    <div>
      <h2>Place Your Order</h2>
      <form onSubmit={handlePlaceOrder}>
        <div>
          <label htmlFor="orderId">Order ID:</label>
          <input
            type="text"
            id="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productsOrdered">Products Ordered:</label>
          <input
            type="text"
            id="productsOrdered"
            value={productsOrdered}
            onChange={(e) => setProductsOrdered(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}

export default PlaceOrder;
