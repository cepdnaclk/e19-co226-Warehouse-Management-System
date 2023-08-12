import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';
import './OrderGrid.css';

const DisplayOrder = ({ shouldRefresh }) => {
  const storedToken = JSON.parse(localStorage.getItem('token'));

  const [orders, setOrders] = useState([]);
  const [deleteOrderId, setDeleteOrderId] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(variables.API_URL + '/api/orders',{
        headers: {
            Authorization: `Bearer ${storedToken}` // Send token in the headers
        }
    });
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [shouldRefresh]);

  const handleDeleteClick = (orderId) => {
    setDeleteOrderId(orderId);
  };

  const handleDeleteConfirmation = async (orderId) => {
    try {
      await axios.delete(variables.API_URL + '/api/orders/' + orderId,{
        headers: {
            Authorization: `Bearer ${storedToken}` // Send token in the headers
        }
    });
      fetchOrders(); // Refresh the order list after deleting
    } catch (error) {
      console.error('Error deleting order:', error);
    }

    setDeleteOrderId(null); // Reset deleteOrderId after handling the deletion
  };

  const confirmDelete = (orderId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this order?');
    if (shouldDelete) {
      handleDeleteConfirmation(orderId);
    }
  };

  return (
    <div className='order-grid-container'>
      <h1>Order Information</h1>
      <table className='order-table'>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Price</th>
            <th>Order Date</th>
            <th>Customer ID</th>
            <th>Order Items</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.orderID}>
              <td>{order.orderID}</td>
              <td>{order.price}</td>
              <td>{order.orderDate}</td>
              <td>{order.customer.customerID}</td>
              <td>
                <table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderItems.map((item) => (
                      <tr key={item.orderItemId}>
                        <td>{item.product.productName}</td>
                        <td>{item.quantityOrdered}</td>
                        <td>{item.unitPrice}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
              <td>
                <button onClick={() => confirmDelete(order.orderID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DisplayOrder;
