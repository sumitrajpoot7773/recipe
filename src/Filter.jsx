// src/components/Filter.js
import React from 'react';

const Filter = ({ onFilter }) => {
  const handleCategoryChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <select onChange={handleCategoryChange}>
      <option value="">All Categories</option>
      <option value="vegetarian">Vegetarian</option>
      <option value="gluten-free">Gluten-Free</option>
      <option value="vegan">Vegan</option>
      {/* Add more categories as needed */}
    </select>
  );
};

export default Filter;
