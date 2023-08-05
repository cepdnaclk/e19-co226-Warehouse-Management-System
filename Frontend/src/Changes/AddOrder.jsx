import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { variables } from '../Variables';

const AddOrder = () => {
  const [formData, setFormData] = useState({
    customerId: '',
    products: [],
  });

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
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
      const productsWithQuantity = response.data.map((product) => ({
        ...product,
        quantity: 1,
      }));
      setProducts(productsWithQuantity);
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
    const productId = event.target.value;
    const product = products.find((p) => p.productId === parseInt(productId));
    if (product) {
      setFormData((prevData) => ({
        ...prevData,
        products: [...prevData.products, { ...product, quantity: 1 }],
      }));
    }
  };

  const handleQuantityChange = (event, productId) => {
    const quantity = parseInt(event.target.value);
    setFormData((prevData) => ({
      ...prevData,
      products: prevData.products.map((product) =>
        product.productId === productId ? { ...product, quantity } : product
      ),
    }));
  };

  useEffect(() => {
    const totalPrice = formData.products.reduce(
      (total, product) => total + product.sellingPrice * product.quantity,
      0
    );
    setTotalPrice(totalPrice);
  }, [formData.products]);

  const handleAddToTable = () => {
    setFormData((prevData) => ({
      ...prevData,
      products: [...prevData.products, ...products.filter((p) => p.quantity > 0)],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(variables.API_URL + '/api/orders', formData);
      setFormData({
        customerId: '',
        products: [],
      });
      setTotalPrice(0);
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
              <option key={customer.customerId} value={customer.customerId}>
                {customer.customerName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="productId">Select Product:</label>
          <select id="productId" name="productId" onChange={handleProductChange} required>
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.productName}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            value={products.find((p) => p.productId === parseInt(formData.productId))?.quantity || 1}
            onChange={(e) =>
              handleQuantityChange(
                { target: { value: parseInt(e.target.value) } },
                parseInt(formData.productId)
              )
            }
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
            {formData.products.map((product) => (
              <tr key={product.productId}>
                <td>{product.productName}</td>
                <td>{product.quantity}</td>
                <td>${product.sellingPrice * product.quantity}</td>
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