// import React, { useState } from 'react';
// import AddOrder from '../Changes/AddOrder';
// import DisplayOrder from '../Changes/DisplayOrder';
// import './orders.css';

// const Orders = () => {
//   const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

//   const handleAddOrder = () => {
//     setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
//   };

//   return (
//     <div className="container">
//       <div className="column">
//         {/* Step 3: Pass the callback to AddOrder */}
//         <AddOrder onAddOrder={handleAddOrder} />
//       </div>
//       <div className="column">
//         {/* Step 3: Pass the shouldRefresh prop to DisplayOrder */}
//         <DisplayOrder shouldRefresh={shouldRefresh} />
//       </div>
//     </div>
//   );
// };

// export default Orders;


import React, { useState } from 'react';
import AddOrder from '../Changes/AddOrder';
import DisplayOrder from '../Changes/DisplayOrder';
import './orders.css';
import './addbutton.css'

const Orders = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleAddOrder = () => {
    setShouldRefresh(!shouldRefresh);
  };

  const [isAddOrderPopupVisible, setAddOrderPopupVisibility] = useState(false);

  const toggleAddOrderPopup = () => {
    setAddOrderPopupVisibility(!isAddOrderPopupVisible);
  };

  return (
    <div className="container">
      {isAddOrderPopupVisible && (
        <div className="overlay">
            <div className="column popup">
              <AddOrder
                onClosePopup={toggleAddOrderPopup}
                onAddOrder={() => {
                  handleAddOrder();
                  toggleAddOrderPopup();
                }}
              />
            </div>
            </div>
      )}
      <div className="column">
        <button className='add-button' onClick={toggleAddOrderPopup}>Add Order</button>
        <DisplayOrder shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
};

export default Orders;
