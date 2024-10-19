// // src/hooks/useRecipes.js
// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useRecipes = (searchTerm, category) => {
//   const [recipes, setRecipes] = useState([]);
//   const [recipes2, setRecipes2] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         setLoading(true);
//         const url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&addRecipeInformation=true&apiKey=e36e95e0938d4b7da77ca033ed854e92`;


//         // let url = `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=d947164ca94041b1837ed692067224dd`;

//         if (category) {
//           url += `&diet=${category}`;
//         }

//         const response = await axios.get(url);
//         setRecipes(response.data.results);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching recipes:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (searchTerm) {
//       fetchRecipes();
//     }
//   }, [searchTerm, category]);


//   const getRecipe=async()=>{
//     setLoading(true);
//     const url2 = `https://api.spoonacular.com/recipes/random?apiKey=e36e95e0938d4b7da77ca033ed854e92&number=9`;
//     const response2 = await axios.get(url2);
//     setRecipes2(response2.data.recipes);
//     console.log(response2.data.recipes);
//     setLoading(false);
//   }
//   useEffect(() => {
//     getRecipe();
//   }, []);

//   return { recipes, loading ,recipes2 };
// };

// export default useRecipes;



// src/hooks/useRecipes.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useRecipes = (searchTerm, category) => {
  const [recipes, setRecipes] = useState([]);
  const [recipes2, setRecipes2] = useState([]);
  const [loading, setLoading] = useState(true);

  const EDAMAM_APP_ID = "980d02c7";  // Replace with your Edamam App ID
  const EDAMAM_APP_KEY = "61e8485fc04c257596af501dc7b6f46e"; // Replace with your Edamam App Key

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        let url = `https://api.edamam.com/search?q=${searchTerm}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&to=9`;

        if (category) {
          url += `&health=${category}`; // Edamam uses "health" for dietary restrictions
        }

        const response = await axios.get(url);
        setRecipes(response.data.hits.map(hit => hit.recipe)); // Extract recipes from response
        console.log(response.data.hits);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm) { 
      fetchRecipes();
    }
  }, [searchTerm, category]);

  const getRandomRecipes = async () => {
    try {
      setLoading(true);
     
      const randomSearchTerms = ['chicken', 'pasta', 'salad', 'soup', 'dessert'];
      const randomTerm = randomSearchTerms[Math.floor(Math.random() * randomSearchTerms.length)];
      const url2 = `https://api.edamam.com/search?q=${randomTerm}&app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&to=9`; // Limit to 9 results

      const response2 = await axios.get(url2);
      setRecipes2(response2.data.hits.map(hit => hit.recipe));
      console.log(response2.data.hits);
    } catch (error) {
      console.error("Error fetching random recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomRecipes();
  }, []);

  return { recipes, loading, recipes2 };
};

export default useRecipes;
