import React from 'react';
import AddOrder from '../Changes/AddOrder';
import DisplayOrder from '../Changes/DisplayOrder';
import './orders.css';

const Orders = () => {
  return (
    <div className="container">
      <div className="column">
        <h1>Orders Page - Place Your Order</h1>
        <AddOrder />
      </div>

      <div className="column">
        <h1>Orders Page - Display Order</h1>
        <DisplayOrder />
      </div>
    </div>
  );
};

export default Orders;
