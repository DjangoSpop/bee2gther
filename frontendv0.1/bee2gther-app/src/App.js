// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Container } from 'react-bootstrap';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from'./screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderScreen from './screens/OrderScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import 'bootstrap/dist/css/bootstrap.min.css';

import RegisterScreen from './screens/RegisterScreen';
import AddProductForm from './components/ProductForm';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route path="register" element={<RegisterScreen />}/>
              <Route path="login" element={<LoginScreen />}/>
              <Route path="profile" element={<ProfileScreen />}/>
              <Route path="productform" element={<AddProductForm/>}/>
              <Route path="order/:id" element={<OrderScreen/>}/>
              <Route path='Product/:id' element={<ProductScreen/>}/>
              <Route path="cart" element={<CartScreen/>}/>
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </Provider>
  );
};

export default App;
