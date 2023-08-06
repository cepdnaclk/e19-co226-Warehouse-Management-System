import React, { useState } from 'react';
import AddProduct from '../Changes/AddProduct';
import DisplayProduct from '../Changes/DisplayProduct';

const Product = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

  const handleAddProduct = () => {
    setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
  };

  return (
    <div className="container">
      <div className="column">
        {/* Step 3: Pass the callback to AddProduct */}
        <AddProduct onAddProduct={handleAddProduct} />
      </div>
      <div className="column">
        {/* Step 3: Pass the shouldRefresh prop to DisplayProduct */}
        <DisplayProduct shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
};

export default Product;
