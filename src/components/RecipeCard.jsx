
// import React, { useContext } from 'react';
// import RecipeContext from '../context/RecipeContext';
// import './RecipeCard.css';
// import { Link } from 'react-router-dom';

// const HeartIcon = ({ filled }) => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//   >
//     <path d={filled 
//       ? "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
//       : "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
//     } />
//   </svg>
// );

// const RecipeCard = ({ recipe }) => {
//   const { favorites, addToFavorites, removeFromFavorites,DisplayRecipe } = useContext(RecipeContext);
//   const isFavorite = favorites.some((fav) => fav.id === recipe.id);

//   const handleFavoriteClick = () => {
//     if (isFavorite) {
//       removeFromFavorites(recipe.id);
//     } else {
//       addToFavorites(recipe);
//     }
//   };

//   return (
//     <Link to={`/recipe`} onClick={()=>{DisplayRecipe(recipe)}} className="recipe-card">
//       <div className="recipe-card-image-container">
//         <img src={recipe.image} alt={recipe.title} />
//         <button
//           className={`recipe-card-favorite ${isFavorite ? 'active' : ''}`}
//           onClick={handleFavoriteClick}
//           aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
//         >
//           <HeartIcon filled={isFavorite} />
//         </button>
//       </div>
//       <h2>{recipe.title}</h2>
//       <p>{recipe.summary}</p>
//     {/* </div> */}
//     </Link>
//   );
// };

// export default RecipeCard;



import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import './RecipeCard.css';
import { Link } from 'react-router-dom';

const HeartIcon = ({ filled }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={filled 
      ? "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      : "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
    } />
  </svg>
);

const RecipeCard = ({ recipe }) => {
  const { favorites, addToFavorites, removeFromFavorites, DisplayRecipe } = useContext(RecipeContext);

  // Check if the recipe is a favorite by comparing recipe URI
  const isFavorite = favorites.some((fav) => fav.uri === recipe.uri);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent Link navigation when clicking favorite button
    e.stopPropagation(); // Stop event from propagating to parent elements

    if (isFavorite) {
      removeFromFavorites(recipe.uri); // Use URI to remove from favorites
    } else {
      addToFavorites(recipe); // Add recipe to favorites
    }
  };

  return (
    <Link to={`/recipe`} onClick={() => { DisplayRecipe(recipe); }} className="recipe-card">
      <div className="recipe-card-image-container">
        <img src={recipe.image} alt={recipe.label} />
        <button
          className={`recipe-card-favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <h2>{recipe.label}</h2>
      <p>{recipe.ingredientLines.join(', ').substring(0, 100)}...</p> {/* Shows part of the ingredients */}
    </Link>
  );
};

export default RecipeCard;
