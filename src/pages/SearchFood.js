import React, { useEffect, useState } from 'react';

function SearchFood() {

  /*   useEffect(() => {
        getNutrition()
    }, [input]); */

    const [input, setInput] = useState("");
    const [query, setQuery] = useState({});
    const [queryFat, setQueryFat] = useState("");
    const [queryProtein, setQueryProtein] = useState("");
    const [queryCarbs, setQueryCarbs] = useState("");

    const submitHandler = (e) => {
        e.preventDefault();
        getNutrition(input);
        console.log(input)
    }

    const getNutrition = async (name) => {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?query=${name}&apiKey=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
        //console.log(data.results[0]);
        setQuery(data.results[0]);
        getNutritionDetail(data.results[0].id)
        
    }

    const getNutritionDetail = async (id) => {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?amount=1&apiKey=${process.env.REACT_APP_API_KEY}`);
        const data = await response.json();
       // console.log(data)
        console.log(data.nutrition.nutrients);
   
     //console.log(data.nutrition.nutrients);
     setQueryFat(data.nutrition.nutrients[0].amount);
     setQueryProtein(data.nutrition.nutrients[4].amount);
     setQueryCarbs(data.nutrition.nutrients[1].amount);
       
    }

   

  return (
    <div>
         <form onSubmit={submitHandler}>
        <div>
        <input
         type="text"
         onChange={(e) => {
             setInput(e.target.value);
         }}
         value={input}
         />
         <div>
          <h1>{query.name}</h1>
          <p>Nutrition Values</p>
              {
                (query.image)
                ?<img src={`https://spoonacular.com/cdn/ingredients_100x100/${query.image}`}
                  alt={query.name} /> : ""
              }
         </div>
         { 
        (queryFat)
          ? <div>
          <div><p>Fat </p><p>{`${queryFat}g`}</p></div>
          <div><p>Protein </p><p>{`${queryProtein}g`}</p></div>
          <div><p>Carbs </p><p>{`${queryCarbs}g`}</p></div>
           </div> : ""
          } 
        </div>
     </form>
    </div>
  )
}

export default SearchFood