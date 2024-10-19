// // src/components/RecipeList.js
// import React, { useState, useContext, useEffect } from 'react';
// import RecipeCard from './RecipeCard';
// import useRecipes from '../hooks/useRecipes';
// import RecipeContext from '../context/RecipeContext';
// import './RecipeList.css';


// const RecipeList = ({ searchTerm }) => {
//   const [category, setCategory] = useState(null);
//   const [showFavorites, setShowFavorites] = useState(false);
//   const { recipes, loading ,recipes2} = useRecipes(searchTerm, category);
//   const { setRecipes, favorites } = useContext(RecipeContext);

//   useEffect(() => {
//     setRecipes(recipes);
//   }, [recipes, setRecipes]);

//   const displayedRecipes = showFavorites
//     ? favorites
//     : recipes.length > 0
//     ? recipes
//     : recipes2; 

//   return (
//     <div className="recipe-list-container">
//       <div className="filter">
//         <button className={category === null ? 'active' : ''} onClick={() => setCategory(null)}>All</button>
//         <button className={category === 'vegetarian' ? 'active' : ''} onClick={() => setCategory('vegetarian')}>Vegetarian</button>
//         <button className={category === 'gluten-free' ? 'active' : ''} onClick={() => setCategory('gluten-free')}>Gluten-Free</button>
//         <button className={showFavorites ? 'active' : ''} onClick={() => setShowFavorites((prev) => !prev)}>
//           {showFavorites ? 'Show All' : 'Show Favorites'}
//         </button>     
//       </div>     
//       <div className="recipe-list">                                      
//         {loading ? (
//           <p className="loading">Loading...</p>
//         ) : (
//           displayedRecipes.map(recipe => (
//             <RecipeCard key={recipe.id} recipe={recipe} />    
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default RecipeList;


import React, { useState, useContext, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import useRecipes from '../hooks/useRecipes';
import RecipeContext from '../context/RecipeContext';
import './RecipeList.css';

const RecipeList = ({ searchTerm }) => {
  const [category, setCategory] = useState(null);
  const [showFavorites, setShowFavorites] = useState(false);
  const { recipes, loading ,recipes2} = useRecipes(searchTerm, category);
  const { favorites } = useContext(RecipeContext);

  // Log fetched recipes for debugging
  console.log("Fetched recipes:", recipes);

  // Filter recipes based on search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.label && recipe.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedRecipes = showFavorites
    ? favorites
    : filteredRecipes.length > 0
    ? filteredRecipes
    :recipes2; // Show an empty array if no recipes found

  return (
    <div className="recipe-list-container">
      <div className="filter">
        <button className={category === null ? 'active' : ''} onClick={() => setCategory(null)}>All</button>
        <button className={category === 'vegetarian' ? 'active' : ''} onClick={() => setCategory('vegetarian')}>Vegetarian</button>
        <button className={category === 'gluten-free' ? 'active' : ''} onClick={() => setCategory('gluten-free')}>Gluten-Free</button>
        <button className={showFavorites ? 'active' : ''} onClick={() => setShowFavorites(prev => !prev)}>
          {showFavorites ? 'Show All' : 'Show Favorites'}
        </button>     
      </div>     
      <div className="recipe-list">
        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          displayedRecipes.length > 0 ? (
            displayedRecipes.map(recipe => (
              <RecipeCard key={recipe.uri} recipe={recipe} />
            ))
          ) : (
            <p>No recipes found.</p>
          )
        )}
      </div>
    </div>
  );
};

export default RecipeList;
