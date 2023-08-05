import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const AddOrder = ({ onAddOrder }) => {
  const [formData, setFormData] = useState({
    customerId: '',
    productID: '',
    quantity: 1,
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Fetch customers and products on component mount
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);

  // Fetch list of customers from API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(variables.API_URL + '/api/customers');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(variables.API_URL + '/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleCustomerChange = (event) => {
    setFormData({
      ...formData,
      customerId: event.target.value,
    });
  };

  const handleProductChange = (event) => {
    const productID = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      productID,
    }));
  };

  const handleQuantityChange = (event) => {
    const quantity = parseInt(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      quantity,
    }));
  };


  const calculateProductPrice = (product, quantity) => {
    return product.sellingPrice * quantity;
  };

  const handleAddToTable = () => {

    const selectedProduct = products.find(
      // (p) => console.log( formData.productID));

      (p) => p.productID=== parseInt(formData.productID));
    if (selectedProduct) {
      const newOrderItem = { product: selectedProduct, quantity: formData.quantity };
      setOrderItems((prevItems) => [...prevItems, newOrderItem]);
      setTotalPrice((prevTotal) => prevTotal + calculateProductPrice(selectedProduct, formData.quantity));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const customerOrder = {
        price:totalPrice,
        customer:customers.find(
          // (p) => console.log(p.customerID)),
    
          (p) => p.customerID=== parseInt(formData.customerId)),
        orderItems: orderItems.map((item) => ({
          product: item.product,
          quantityOrdered: item.quantity,
          unitPrice: item.product.sellingPrice,
        })),
      };
      await axios.post(variables.API_URL + '/api/orders', customerOrder);
      setFormData({
        customerId: '',
        productID: '',
        quantity: 1,
      });
      setOrderItems([]);
      setTotalPrice(0);
      onAddOrder();
      alert('Order successfully added!');
    } catch (error) {
      alert('Order adding failed!');
    }
  };

  return (
    <div>
      <h1>Add Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerId">Select Customer:</label>
          <select
            id="customerId"
            name="customerId"
            value={formData.customerId}
            onChange={handleCustomerChange}
            required
          >
            <option value="">Select a customer</option>
            {customers.map((customer) => (
              <option key={customer.customerID} value={customer.customerID}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productID">Select Product:</label>
          <select id="productID" name="productID" onChange={handleProductChange} required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.productID} value={product.productID}>
                {product.productName}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleQuantityChange}
            min="1"
            required
          />
          <button type="button" onClick={handleAddToTable}>
            Add to Table
          </button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orderItems.map((item) => (
              <tr key={item.product.productID}>
                <td>{item.product.productName}</td>
                <td>{item.quantity}</td>
                <td>${calculateProductPrice(item.product, item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <strong>Total Price: ${totalPrice}</strong>
        </div>
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
};

export default AddOrder;
