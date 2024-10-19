// src/router/Router.js
import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import RecipeDetails from '../components/RecipeDetails';
import RecipeList from '../components/RecipeList';
import RecipeContext from '../context/RecipeContext';

function Router({ searchTerm }) {
  const { showRecipe } = useContext(RecipeContext);

  return (
    <Routes>
      {showRecipe ? (
        <Route path="/recipe" element={<RecipeDetails />} />
      ) : (
        <Route path="/" element={<RecipeList searchTerm={searchTerm} />} />
      )}
    </Routes>
  );
}

export default Router;
