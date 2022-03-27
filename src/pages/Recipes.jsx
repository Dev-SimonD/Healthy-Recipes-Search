import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import  {Link} from "react-router-dom"



const Recipes = ({session}) => {

    const randomRecipeURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6&tags=vegetarian`;
    

    const [randomRecipe, setRandomRecipe] = useState([])
    const [searchedRecipe, setSearchedRecipe] = useState([])
    const [search, setSearch] = useState("")

    useEffect(() => {
        getRecipe()
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("this is submit value", search)
        getSearchedRecipe(search)
        setSearch("")
    }

    const getSearchedRecipe = async (query) => {

        const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${query}&number=2`)
        const data = await response.json()
        setSearchedRecipe(data.results)
        //console.log(data);
    }

    const getRecipe = async () => {

        const check = localStorage.getItem("random");

        if(check){
            setRandomRecipe(JSON.parse(check));
        }
        else{
            const response = await fetch(randomRecipeURL)
            const data = await response.json()
            localStorage.setItem("random", JSON.stringify(data.recipes));
           // console.log(data)
            console.log(data.recipes)
            //setRandomRecipe(data.recipes)
            setRandomRecipe(data.recipes);
           // console.log(data.recipes[0]);  
          // console.log(randomRecipe)
        }

       
      
    }
   // console.log(search)
  return (
    <div className='container'>
        <h1>
            Search Recipe
        </h1>
        {/* <form onSubmit={handleSubmit}>
        <input
             type="text"
             id='searchRecipe'
             placeholder='Search recipe...'
             className='input'
             onChange={((e) => {
                 setSearch(e.target.value)
             })}
             value={search}
             
             />
             </form> */}
             <form className="field has-addons" onSubmit={handleSubmit}>
  <div className="control">
    <input type="text"
             //id='searchRecipe'
             placeholder='Search recipe...'
             className='input'
             onChange={((e) => {
                 setSearch(e.target.value)
             })}
             value={search}/>
  </div>
  <div className="control">
    <button type="submit" className="button is-info">
      Search
    </button>
  </div>
</form>
             
             <div className="Grid">
        {searchedRecipe.map((item) => {
            return(
                <div className='searchedCard' key={item.id}>
                    <Link to={"/recipes/" + item.id}>
                    <img src={item.image} alt="title" />
                    <h4>{item.title}</h4>
                    </Link>
                    </div>
            )
        })}
    </div>
       <h1>Random recipes</h1>
        <ul>
        {randomRecipe.map((recipe) => {
         return(
               <li key={recipe.id}>{recipe.title}</li> 
               ) })}
            </ul> 
          </div>
  )
}

export default Recipes