import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './contexts/UserContext';
import Header from './components/Header';
import ProductDisplay from './components/ProductDisplay';
import Modal from './components/Modal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import './App.css';
import ProductDetails from './components/ProductDetails';



function App() {
  const [userProfile, setUserProfile] = useState(null);
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = sessionStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  const [showModal, setShowModal] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      let updatedItems = [];
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        updatedItems = prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedItems = [...prevItems, { ...product, quantity: 1 }];
      }
      sessionStorage.setItem('cart', JSON.stringify(updatedItems));
      return updatedItems
    });
    setShowModal(true);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const closeModal = () => setShowModal(false);
  return (
    <UserContext.Provider value={{ profile: userProfile, setProfile: setUserProfile }}>
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <ProductDisplay addToCart={addToCart} />
                {showModal && <Modal closeModal={closeModal} />}
              </>
            } 
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} clearCart={clearCart} updateQuantity={updateQuantity} />} />
          <Route path="/checkout" element={<Checkout clearCart={clearCart}/>} />
          {/* <Route path="/products/:id" element={<ProductDetails addToCart={addToCart} /> */}
          <Route path="/products/:id" element={<>
            <ProductDetails addToCart={addToCart} updateQuantity={updateQuantity} />
            {showModal && <Modal closeModal={closeModal} />}
          </>
        } />
          
  
        </Routes>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;