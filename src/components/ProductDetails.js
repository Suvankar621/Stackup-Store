import React from 'react';
import { useLocation } from 'react-router-dom';

const ProductDetails = ({ addToCart }) => {
  const location = useLocation();
  const { product } = location.state || {};

  const handleAddToCart = () => {
    addToCart(product);
  };

  if (!product) {
    // Handle the case where there's no product in the location state
    return <div>No product details available</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      {/* Add more details as needed */}
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
