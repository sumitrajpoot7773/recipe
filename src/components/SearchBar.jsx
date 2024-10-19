import React, { useRef } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const searchTermRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call onSearch with the current value of searchTermRef
    onSearch(searchTermRef.current.value);
    searchTermRef.current.value = '';
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          ref={searchTermRef} // Use ref instead of value and onChange
          placeholder="Search recipes..."
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default SearchBar;
