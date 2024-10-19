// // // src/context/RecipeProvider.js
// // import React, { useState, useEffect } from 'react';
// // import RecipeContext from './RecipeContext';

// // const RecipeProvider = ({ children }) => {
// //   const [recipes, setRecipes] = useState([]);
// //   const [favorites, setFavorites] = useState([]);

// //   // Load favorites from local storage
// //   useEffect(() => {
// //     const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
// //     setFavorites(savedFavorites);
// //   }, []);

// //   // Save favorites to local storage
// //   useEffect(() => {
// //     localStorage.setItem('favorites', JSON.stringify(favorites));
// //   }, [favorites]);

// //   const addToFavorites = (recipe) => {
// //     setFavorites((prevFavorites) => [...prevFavorites, recipe]);
// //   };

// //   const removeFromFavorites = (id) => {
// //     setFavorites((prevFavorites) =>
// //       prevFavorites.filter((recipe) => recipe.id !== id)
// //     );
// //   };

// //   return (
// //     <RecipeContext.Provider
// //       value={{ recipes, setRecipes, favorites, addToFavorites, removeFromFavorites }}
// //     >
// //       {children}
// //     </RecipeContext.Provider>
// //   );
// // };

// // export default RecipeProvider;



// // src/context/RecipeProvider.js
// import React, { useState, useEffect } from 'react';
// import RecipeContext from './RecipeContext';

// const RecipeProvider = ({ children }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [recipeDetails, setRecipeDetails]=useState([]);
//  const  [showRecipe, setShowRecipe] = useState(false);


//   // Fetch recipes from an API (you can adjust this as per your API)
//   useEffect(() => {
//     if (recipes.length === 0) {
//       const fetchRecipes = async () => {
//         try {
//           const response = await fetch(
//             `https://api.spoonacular.com/recipes/random?apiKey=d947164ca94041b1837ed692067224dd&number=10`
//           );
//           const data = await response.json();
//           setRecipes(data.recipes); // Assuming the API returns an array of recipes
//         } catch (error) {
//           console.error('Failed to fetch recipes:', error);
//         }
//       };

//       fetchRecipes();
//     }
//   }, [recipes]);

//   function DisplayRecipe(recipe) {
//     setRecipeDetails(recipe);
//     setShowRecipe(true);
    
//   }

//   // Load favorites from local storage
//   useEffect(() => {
//     const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     setFavorites(savedFavorites);
//   }, []);

//   // Save favorites to local storage
//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites));
//   }, [favorites]);

//   const addToFavorites = (recipe) => {
//     setFavorites((prevFavorites) => [...prevFavorites, recipe]);
//   };

//   const removeFromFavorites = (id) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.filter((recipe) => recipe.id !== id)
//     );
//   };

//   return (
//     <RecipeContext.Provider
//       value={{ recipes, setRecipes, favorites, addToFavorites, removeFromFavorites,recipeDetails,DisplayRecipe,showRecipe,setShowRecipe}}
//     >
//       {children}
//     </RecipeContext.Provider>
//   );
// };

// export default RecipeProvider;


import React, { useState, useEffect } from 'react';
import RecipeContext from './RecipeContext';
import axios from 'axios';

const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [recipeDetails, setRecipeDetails] = useState([]);
  const [showRecipe, setShowRecipe] = useState(false);

  // Fetch recipes from Edamam API
  useEffect(() => {
    if (recipes.length === 0) {
      const fetchRecipes = async () => {
        try {
          const appId = '980d02c7'; // Replace with your Edamam App ID
          const appKey = '61e8485fc04c257596af501dc7b6f46e'; // Replace with your Edamam App Key
          const response = await axios.get(
            `https://api.edamam.com/search?q=chicken&app_id=${appId}&app_key=${appKey}&from=0&to=9`
          );

          const fetchedRecipes = response.data.hits.map((hit) => hit.recipe); // Extract recipes
          setRecipes(fetchedRecipes); // Set recipes
        } catch (error) {
          console.error('Failed to fetch recipes:', error);
        }
      };

      fetchRecipes();
    }
  }, [recipes]);

  function DisplayRecipe(recipe) {
    setRecipeDetails(recipe);
    setShowRecipe(true);
  }

  // Load favorites from local storage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to local storage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (recipe) => {
    setFavorites((prevFavorites) => [...prevFavorites, recipe]);
  };

  const removeFromFavorites = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((recipe) => recipe.uri !== id) // Using "uri" as unique id for Edamam API
    );
  };

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        favorites,
        addToFavorites,
        removeFromFavorites,
        recipeDetails,
        DisplayRecipe,
        showRecipe,
        setShowRecipe,
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export default RecipeProvider;
