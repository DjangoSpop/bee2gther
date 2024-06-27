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
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import AdminPanel from './components/AdminPanel';
import SocketManager from './components/SocketManager';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <ErrorBoundary>
          <div className="App" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Header />
            <SocketManager />
            <main className="py-3" style={{ flex: 1 }}>
              <Container>
                <Routes>
                  <Route path="/" element={<HomeScreen />} />
                  <Route path="/product/:id" element={<ProductScreen />} />
                  <Route path="/cart" element={<CartScreen />} />
                  <Route path="/cart/:id" element={<CartScreen />} />
                  <Route path="/login" element={<LoginScreen />} />
                  <Route path="/register" element={<RegisterScreen />} />
                  <Route path="/profile" element={<ProfileScreen />} />
                  <Route path="/checkout" element={<CheckoutScreen />} />
                  <Route path="/admin" element={<AdminPanel />} />
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

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Component Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

export default App;
