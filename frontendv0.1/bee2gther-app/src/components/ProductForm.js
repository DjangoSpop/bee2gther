import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../actions/productActions';

const AddProductForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.product);

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    min_quantity: '',
    discounted_price: '',
    buy_now_price: '',
    category: '',
    size: '',
    stock: '',
    images: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setProductData(prevData => ({
      ...prevData,
      images: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addProduct(productData))
      .then(() => {
        // Reset form or navigate to product list
        alert('Product added successfully!');
      })
      .catch(() => {
        // Handle error
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Add New Product</h2>
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block mb-1">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="min_quantity" className="block mb-1">Minimum Quantity</label>
          <input
            type="number"
            id="min_quantity"
            name="min_quantity"
            value={productData.min_quantity}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="discounted_price" className="block mb-1">Discounted Price</label>
          <input
            type="number"
            id="discounted_price"
            name="discounted_price"
            value={productData.discounted_price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="buy_now_price" className="block mb-1">Buy Now Price</label>
          <input
            type="number"
            id="buy_now_price"
            name="buy_now_price"
            value={productData.buy_now_price}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="category" className="block mb-1">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="size" className="block mb-1">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            value={productData.size}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="stock" className="block mb-1">Stock</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="images" className="block mb-1">Product Image</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
