// // src/components/RecipeDetails.js
// import React, { useContext } from 'react';
// import RecipeContext from '../context/RecipeContext';
// import './RecipeDetails.css'
// import { useNavigate } from 'react-router-dom';

// function RecipeDetails() {
//   const { recipeDetails,setShowRecipe } = useContext(RecipeContext);
//   const navigate = useNavigate();

//   // Handle the case where no recipe has been selected
//   if (!recipeDetails) {
//     return <p>No recipe selected. Please select a recipe.</p>;
//   }
//   const handleBackClick = (e) => {
//     e.preventDefault();
//     setShowRecipe(false); // Go back to recipe list
//     navigate('/');
//   };

//   return (
//     <div className='main'>
//       <button type="button" onClick={handleBackClick}>Back to Recipe List</button>
//       <h2>{recipeDetails.title}</h2>
//       <img src={recipeDetails.image} alt={recipeDetails.title} />
//       <p>{recipeDetails.summary}</p>
//       {/* Render more details like ingredients, instructions, etc. if needed */}
//       <h3>Ingredients</h3>
//       <ul>
//         {recipeDetails.extendedIngredients?.map((ingredient, index) => (
//           <li key={index}>{ingredient.original}</li>
//         ))}
//       </ul>
//       <h3>Instructions</h3>
//       <p>{recipeDetails.instructions}</p>
//     </div>
//   );
// }

// export default RecipeDetails;


import React, { useContext } from 'react';
import RecipeContext from '../context/RecipeContext';
import './RecipeDetails.css';
import {  useNavigate } from 'react-router-dom';

function RecipeDetails() {
  const { recipeDetails, setShowRecipe } = useContext(RecipeContext);
  const navigate = useNavigate();

  if (!recipeDetails) {
    return <p className="recipe-empty-state">No recipe selected. Please select a recipe.</p>;
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    setShowRecipe(false);
    navigate('/');
  };

  return (
    <div className="recipe-details-container">
      
      <button 
        type="button" 
        onClick={handleBackClick}
        className="back-button"
      >
        Back to Recipe List
      </button>
     

      <div className="recipe-header">
        <h2 className="recipe-title">{recipeDetails.label}</h2>
        <div className="recipe-image-container">
          <img 
            src={recipeDetails.image} 
            alt={recipeDetails.label} 
            className="recipe-image"
          />
        </div>
      </div>

      <div className="recipe-content">
        <section className="recipe-section">
          <h3 className="section-title">Ingredients</h3>
          <ul className="ingredients-list">
            {recipeDetails.ingredients?.map((ingredient, index) => (
              <li key={index} className="ingredient-item">
                {ingredient.text}
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h3 className="section-title">Instructions</h3>
          <div className="instructions-content">
            {recipeDetails.url ? (
              <a 
                href={recipeDetails.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="instructions-link"
              >
                Full Instructions
              </a>
            ) : (
              <p className="no-instructions">No instructions available</p>
            )}
          </div>
        </section>

        <section className="recipe-section">
          <h3 className="section-title">Nutritional Information</h3>
          <ul className="nutrients-list">
            {recipeDetails.totalNutrients &&
              Object.entries(recipeDetails.totalNutrients).map(([key, nutrient], index) => (
                <li key={index} className="nutrient-item">
                  <span className="nutrient-label">{nutrient.label}:</span>
                  <span className="nutrient-value">
                    {Math.round(nutrient.quantity)} {nutrient.unit}
                  </span>
                </li>
              ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export default RecipeDetails;

