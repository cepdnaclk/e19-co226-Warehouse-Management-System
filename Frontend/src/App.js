import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Customers from './pages/Customers';
import Product from './pages/Product.jsx';
import Orders from './pages/Orders.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/product" element={<Product />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;