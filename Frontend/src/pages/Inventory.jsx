import React, { useState } from 'react';
import AddInventory from '../Changes/AddInventory';
import DisplayInventory from '../Changes/DisplayInventory';

const Inventory = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

  const handleAddInventory = () => {
    setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
  };

  return (
    <div className="container">
      <div className="column">
        {/* Step 3: Pass the callback to AddInventory */}
        <AddInventory onAddInventory={handleAddInventory} />
      </div>

      <div className="column">
        {/* Step 3: Pass the shouldRefresh prop to InventoryGrid */}
        <DisplayInventory shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
};

export default Inventory;
