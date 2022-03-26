import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';


const Recipes = ({session}) => {

    const randomRecipeURL = `https://api.spoonacular.com/recipes/random?number=1&tags=vegetarian,dessert&apiKey=${process.env.REACT_APP_API_KEY}`;

    const [randomRecipe, setRandomRecipe] = useState([])

    useEffect(() => {
        getRecipe()
    }, []);

    const getRecipe = async () => {
       const response = await fetch(randomRecipeURL)
       const data = await response.json()
       setRandomRecipe(data.recipes[0])
       console.log(data.recipes[0]);  
    }
  return (
    <div className='recipesCard'>
        <img src={randomRecipe.image} alt={randomRecipe.title}/>
        <h1 className='title'>{randomRecipe.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: randomRecipe.summary}}></p>
        
    </div>
  )
}

export default Recipes