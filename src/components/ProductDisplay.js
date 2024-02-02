import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Filter from './Filter';
import ProductDetails from './ProductDetails';
import "./ProductDisplay.css"

const ProductDisplay = ({ addToCart }) => {
    const products = [
        { id: 1, name: 'Hoodie', price: 10, category: 'Clothing', imageUrl: 'hoodie.png' },
        { id: 2, name: 'T-Shirt1', price: 15, category: 'Clothing', imageUrl: 'tee.png' },
        { id: 3, name: 'T-Shirt', price: 15, category: 'Clothing', imageUrl: 'Shirt.png' },
        { id: 4, name: 'Cool Watch', price: 150, category: 'Watch', imageUrl: 'Watch1.png' },
        { id: 6, name: 'Future Watch', price: 1050, category: 'Watch', imageUrl: 'Watch3.png' },
        { id: 7, name: 'Ultra Laptop', price: 1050, category: 'Laptop', imageUrl: 'Laptop1.png' },
        { id: 8, name: 'Ultra Pro Laptop', price: 1050, category: 'Laptop', imageUrl: 'Laptop2.png' },

        
        // Add more products with categories
      ];
      const [selectedCategory, setSelectedCategory] = useState('');

      const categories = [...new Set(products.map(product => product.category))];
    
      const handleFilterChange = (e) => {
        setSelectedCategory(e.target.value);
      };
    
      const filteredProducts = selectedCategory
        ? products.filter(product => product.category === selectedCategory)
        : products;

  return (
    <div>
      <Filter categories={categories} handleFilterChange={handleFilterChange} />
      <div className="ProductDisplay">
        {filteredProducts.map((product) => (
          <div key={product.id} className="ProductItem">
           <Link to={`/products/${product.id}`} state={{ product }}>
                <img src={product.imageUrl} alt={product.name} />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
            </Link>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
      );
};

export default ProductDisplay;