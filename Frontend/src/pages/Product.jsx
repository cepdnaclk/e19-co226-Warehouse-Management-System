// import React, { useState } from 'react';
// import AddProduct from '../Changes/AddProduct';
// import DisplayProduct from '../Changes/DisplayProduct';

// const Product = () => {
//   const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

//   const handleAddProduct = () => {
//     setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
//   };

//   return (
//     <div className="container">
//       <div className="column">
//         {/* Step 3: Pass the callback to AddProduct */}
//         <AddProduct onAddProduct={handleAddProduct} />
//       </div>
//       <div className="column">
//         {/* Step 3: Pass the shouldRefresh prop to DisplayProduct */}
//         <DisplayProduct shouldRefresh={shouldRefresh} />
//       </div>
//     </div>
//   );
// };

// export default Product;



import React, { useState } from 'react';
import AddProduct from '../Changes/AddProduct';
import DisplayProduct from '../Changes/DisplayProduct';
import './addbutton.css'

const Product = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleAddProduct = () => {
    setShouldRefresh(!shouldRefresh);
  };

  const [isAddProductPopupVisible, setAddProductPopupVisibility] = useState(false);

  const toggleAddProductPopup = () => {
    setAddProductPopupVisibility(!isAddProductPopupVisible);
  };

  return (
    <div className="container">
      {isAddProductPopupVisible && (
        <div className="overlay">
            <div className="column popup">
              <AddProduct
                onClosePopup={toggleAddProductPopup}
                onAddProduct={() => {
                  handleAddProduct();
                  toggleAddProductPopup();
                }}
              />
            </div>
            </div>
      )}
      <div className="column">
        <button className='add-button' onClick={toggleAddProductPopup}>Add Product</button>
        <DisplayProduct shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
};

export default Product;
