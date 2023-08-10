import React, { useState } from 'react';
import AddCustomer from '../Changes/AddCustomer';
import DisplayCustomer from '../Changes/DisplayCustomer';

function Customers() {
  const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

  const handleAddCustomer = () => {
    setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
  };

  return (
    <div className="container">
      <div className="column">
        {/* Step 3: Pass the callback to AddCustomer */}
        <AddCustomer onAddCustomer={handleAddCustomer} />
      </div>
      <div className="column">
        {/* Step 3: Pass the shouldRefresh prop to DisplayCustomer */}
        <DisplayCustomer shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
}

export default Customers;
