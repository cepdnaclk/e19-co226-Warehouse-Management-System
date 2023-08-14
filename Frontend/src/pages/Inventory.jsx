// import React, { useState } from 'react';
// import AddInventory from '../Changes/AddInventory';
// import DisplayInventory from '../Changes/DisplayInventory';

// const Inventory = () => {
//   const [shouldRefresh, setShouldRefresh] = useState(false); // Step 3: State to trigger refresh

//   const handleAddInventory = () => {
//     setShouldRefresh(!shouldRefresh); // Step 3: Toggle the state to trigger refresh
//   };

//   return (
//     <div className="container">
//       <div className="column">
//         {/* Step 3: Pass the callback to AddInventory */}
//         <AddInventory onAddInventory={handleAddInventory} />
//       </div>

//       <div className="column">
//         {/* Step 3: Pass the shouldRefresh prop to InventoryGrid */}
//         <DisplayInventory shouldRefresh={shouldRefresh} />
//       </div>
//     </div>
//   );
// };

// export default Inventory;


import React, { useState } from 'react';
import AddInventory from '../Changes/AddInventory';
import DisplayInventory from '../Changes/DisplayInventory';
import './addbutton.css'

const Inventory = () => {
  const [shouldRefresh, setShouldRefresh] = useState(false);

  const handleAddInventory = () => {
    setShouldRefresh(!shouldRefresh);
  };

  const [isAddInventoryPopupVisible, setAddInventoryPopupVisibility] = useState(false);

  const toggleAddInventoryPopup = () => {
    setAddInventoryPopupVisibility(!isAddInventoryPopupVisible);
  };

  return (
    <div className="container">
      {isAddInventoryPopupVisible && (
        <div className="overlay">
            <div className="column popup">
              <AddInventory
                onClosePopup={toggleAddInventoryPopup}
                onAddInventory={() => {
                  handleAddInventory();
                  toggleAddInventoryPopup();
                }}
              />
            </div>
            </div>
      )}
      <div className="column">
        <button className='add-button' onClick={toggleAddInventoryPopup}>Add Inventory</button>
        <DisplayInventory shouldRefresh={shouldRefresh} />
      </div>
    </div>
  );
};

export default Inventory;
