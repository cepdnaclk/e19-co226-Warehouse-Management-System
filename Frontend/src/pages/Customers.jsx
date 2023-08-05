import React from 'react';
import AddCustomer from '../Changes/AddCustomer';
import DisplayCustomer from '../Changes/DisplayCustomer';
import './customers.css'; 

function Customers() {
  return (
    <div className="container">
      <div className="column">
        <AddCustomer />
      </div>
      <div className="column">
        <DisplayCustomer />
      </div>
      
    </div>
  );
}

export default Customers;
