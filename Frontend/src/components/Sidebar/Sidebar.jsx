import React, { useState } from 'react'
import './Sidebar.css'
import Logo from '../../images/logo.png'
import { UilClipboardAlt, UilEstate, UilPackage, UilSignOutAlt, UilUsersAlt } from '@iconscout/react-unicons';
//import {UilUserAlt} from '@iconscout/react-unicons';
const Sidebar = () => {
  const [selectedItem,setSelectedItem] = useState('Dashboard');
  const handleMenuItemClick = (menuItem) =>{
    setSelectedItem(menuItem);
  };
  return (
    <div className='Sidebar'>
      {/* logo */}
      <div className='logo'>
        <img src={Logo} alt=""/> 
        <span>
          Warehouse Management System
        </span>
      </div>
      {/*menu*/}
      <div className='menu'>
        <div className={`menuItem ${selectedItem === 'Dashboard' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Dashboard')}>
          
              <div>
                <UilEstate/>
              </div>
              <span>
                Dashboard
              </span>
        </div>
        <div className={`menuItem ${selectedItem === 'Orders' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Orders')}>
              <div>
                <UilClipboardAlt/>
              </div>
              <span>
                Orders
              </span>
        </div>
        <div className={`menuItem ${selectedItem === 'Customers' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Customers')}>
              <div>
                <UilUsersAlt/>
              </div>
              <span>
                Customers
              </span>
        </div>
        <div className={`menuItem ${selectedItem === 'Inventory' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('Inventory')}>
              <div>
                <UilPackage/>
              </div>
              <span>
                Inventory
              </span>
        </div>
        <div className={`menuItem ${selectedItem === 'SignOut' ? 'active' : ''}`}
          onClick={() => handleMenuItemClick('SignOut')}>
          <UilSignOutAlt/>
          <span>
               Sign Out
              </span>
        </div>
      </div>
      </div>
  )
}

export default Sidebar