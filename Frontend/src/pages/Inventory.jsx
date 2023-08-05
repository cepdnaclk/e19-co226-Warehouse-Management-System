import React from 'react';
import AddInventory from '../Changes/AddInventory';
import DisplayInventory from '../Changes/DisplayInventory';

const Inventory = () => {
    return (
        <div className="container">
        <div className="column">
          <AddInventory />
        </div>

        <div className="column">
          <DisplayInventory />
        </div>
        </div>
    );
};

export default Inventory;