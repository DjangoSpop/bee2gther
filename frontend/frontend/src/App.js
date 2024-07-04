import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import store from './store';
import Header from './components/Header';
import Footer from './components/Footer';
import Notifications from './components/Notifications';
import ProductListing from './components/productlist';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AdminPanel from './components/AdminPanel';
import WebSocketManager from './components/WebSocketManager';
import ErrorBoundary from './components/ErrorBoundary';
import SellerProductForm from './components/SellerProductForm';
import OrdersScreen from './screens/OrdersScreen';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <WebSocketManager />
            <main className="py-3" style={{ flex: 1 }}>
              <Container>
                <Routes>
                  <Route path="/" element={<ProductListing />} />
                  <Route path="/product/:id" element={<ProductScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/cart/:id" element={<CartScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/checkout" element={<CheckoutScreen />} />
                  <Route path="/admin" element={<AdminPanel />} />
                  <Route path="/orders" element={<OrdersScreen />} />
                  <Route path="/seller/add-product" element={<SellerProductForm />} />
                </Routes>
              </Container>
            </main>
            <Footer />
            <Notifications />
            <ToastContainer />
          </div>
        </ErrorBoundary>
      </Router>
    </Provider>
  );
};

export default App;
