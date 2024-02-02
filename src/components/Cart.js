import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, clearCart }) => {
  const navigate = useNavigate();

  const [quantities, setQuantities] = useState(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: item.quantity }), {})
  );

  const updateQuantity = (productId, newQuantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: newQuantity,
    }));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + quantities[item.id] * item.price, 0);
  };

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="Cart">
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length === 0 ? (
            <tr>
              <td colSpan="5">Your cart is empty.</td>
            </tr>
          ) : (
            cartItems.map((item) => (
              <tr key={item.id}>
                <td><img src={item.imageUrl} alt={item.name} /></td>
                <td>{item.name}</td>
                <td>
                  <button onClick={() => updateQuantity(item.id, quantities[item.id] - 1)}>-</button>
                  {quantities[item.id]}
                  <button onClick={() => updateQuantity(item.id, quantities[item.id] + 1)}>+</button>
                </td>
                <td>${item.price}</td>
                <td><button onClick={() => updateQuantity(item.id, 0)}>Remove</button></td>
              </tr>
            ))
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="4">Total</td>
            <td>${getTotalPrice()}</td>
          </tr>
        </tfoot>
      </table>
      <div className="CartButtons">
        <button onClick={clearCart} disabled={cartItems.length === 0}>Clear Cart</button>
        <button onClick={goToCheckout} disabled={cartItems.length === 0}>Go to Checkout</button>
      </div>
    </div>
  );
};

export default Cart;
