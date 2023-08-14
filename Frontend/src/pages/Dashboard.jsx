import React, { useState } from 'react';
import DisplayCustomer from '../Changes/DisplayCustomer';
import DisplayInventory from '../Changes/DisplayInventory';

function Dashboard() {
    const [shouldRefresh, setShouldRefresh] = useState(false);
  return (
    <div><div>
        <DisplayInventory shouldRefresh={shouldRefresh} />
        </div>
        </div>
  )
}

export default Dashboard