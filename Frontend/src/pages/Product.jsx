import React from 'react';
import AddProduct from '../Changes/AddProduct';
import DisplayProduct from '../Changes/DisplayProduct';

const Product = () => {
    return (
        <div className="container">
        <div className="column">
          <AddProduct />
        </div>

        <div className="column">
          <DisplayProduct />
        </div>
      </div>
    );
};

export default Product;