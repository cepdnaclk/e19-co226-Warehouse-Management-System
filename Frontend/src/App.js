import React, { useState,useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers';
import Product from './pages/Product.jsx';
import Orders from './pages/Orders.jsx';
import Inventory from './pages/Inventory';
import SignIn from './pages/SignIn'; // Import your Login component
import SignUp from './pages/SignUp'; // Import your Register component

const App = () => {
  const storedToken = localStorage.getItem('token'); // Retrieve token from localStorage
  const [token, setToken] = useState(storedToken);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token); // Save token to localStorage
    } else {
      localStorage.removeItem('token'); // Remove token from localStorage
    }
  }, [token]);

  return (
    <BrowserRouter>
      {token ? ( // If token exists (user is authenticated)
        <Sidebar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/product" element={<Product />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </Sidebar>
      ) : ( // If token doesn't exist (user is not authenticated)
        <Routes>
          <Route path="/" element={<SignIn setToken={setToken} />} />
          <Route path="/register" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
