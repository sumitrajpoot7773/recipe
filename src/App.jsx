// src/App.js
import React, { useState } from 'react';
import RecipeProvider from './context/RecipeProvider';
import SearchBar from './components/SearchBar';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Router from './router/Router';

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <RecipeProvider>
      <BrowserRouter>
        <div className="app">
          <h1>Recipe Finder</h1>
          <SearchBar onSearch={setSearchTerm} />
          <Router searchTerm={searchTerm} />
        </div>
      </BrowserRouter>
    </RecipeProvider>
  );
};

export default App;
