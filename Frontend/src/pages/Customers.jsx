import React from 'react';
import AddCustomer from '../Changes/AddCustomer';
import DisplayCustomer from '../Changes/DisplayCustomer';
import DeleteCustomer from '../Changes/DeleteCustomer';
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
      <div className="column">
        <DeleteCustomer />
      </div>
    </div>
  );
}

export default Customers;
