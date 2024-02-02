// Create Filter.js
import React from 'react';

const Filter = ({ categories, handleFilterChange }) => {
  return (
    <div>
      <label htmlFor="category">Filter by Category:</label>
      <select id="category" onChange={handleFilterChange}>
        <option value="">All Categories</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
