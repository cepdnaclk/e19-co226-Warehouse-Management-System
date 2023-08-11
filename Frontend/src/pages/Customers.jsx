import React, { useState } from 'react';
import AddCustomer from '../Changes/AddCustomer';
import DisplayCustomer from '../Changes/DisplayCustomer';
import './Customer.css';
// function Customers() {
//   const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

//   const handleAddCustomer = () => {
//     setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
//   };

//   return (
//     <div className="container">
//       <div className="column">
//         {/* Step 3: Pass the callback to AddCustomer */}
//         <AddCustomer onAddCustomer={handleAddCustomer} />
//       </div>
//       <div className="column">
//         {/* Step 3: Pass the shouldRefresh prop to DisplayCustomer */}
//         <DisplayCustomer shouldRefresh={shouldRefresh} />
//       </div>
//     </div>
//   );
// }

// export default Customers;
function Customers() {
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const [isAddCustomerPopupVisible, setAddCustomerPopupVisibility] = useState(false);

  const handleAddCustomer = () => {
    setShouldRefresh(!shouldRefresh);
  };

  const toggleAddCustomerPopup = () => {
    setAddCustomerPopupVisibility(!isAddCustomerPopupVisible);
  };

  return (
    <div className="container">
    {isAddCustomerPopupVisible && (
      <div className="overlay">
          <div className="column popup">
              <AddCustomer 
                onClosePopup={toggleAddCustomerPopup}
                onAddCustomer={() => {
                  handleAddCustomer();
                  toggleAddCustomerPopup();
                }}
              />
            
          </div>
      </div>)}
      <div className="column">
        <button onClick={toggleAddCustomerPopup}>Add Customer</button>
        <DisplayCustomer shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
}

export default Customers;
