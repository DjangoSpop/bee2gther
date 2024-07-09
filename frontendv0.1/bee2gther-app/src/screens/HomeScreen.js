// src/screens/HomeScreen.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { fetchProducts } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, items: products } = productList || {}; // Ensure productList is not undefined

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
if(loading){
  return <div>Loading...</div>
}
if(error){
  return <div>Error: {error}</div>
}
  return (
    <div>
    <h1>Latest Products</h1>
    {products && products.length > 0 ? (
      <div className="products">
        {products.map(product => (
          <div key={product._id} className="product">
            {/* Render product details here */}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>No products found.</p>
    )}
  </div>
);
};

export default HomeScreen;
