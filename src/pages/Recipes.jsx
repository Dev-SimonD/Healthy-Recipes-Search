import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import  {Link} from "react-router-dom"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"



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
        <h1 className='label'>
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
             <form className="field has-addons searchBar" onSubmit={handleSubmit}>
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
    <button type="submit" className="button /* is-info */" style={{"background" : "#f9f871", "color": "black"}}>
      Search
    </button>
  </div>
</form>
             
             <div className="Grid">
        {searchedRecipe.map((item) => {
            return(
                <Link to={"/recipes/" + item.id}>
                  <div className='cards' key={item.id}>
                    <img src={item.image} alt="title" />
                    <h4>{item.title}</h4>
                    </div>
                    </Link>

            )
        })}
    </div>
       <h1 className='label'>Featured recipes</h1> 
           {/*  {randomRecipe.map((recipe) => {
         return(
            <Link to={"/recipes/" + recipe.id}>

                <div className='cards'>
                    <img src={recipe.image}/>
                    <div className='cardsContent'>
                        <h1>{recipe.title}</h1>
                        <i className="fas fa-angle-right"></i> 250kcal
                    </div>
                </div>
                </Link>

                 ) })} */}
                  <Splide options={{
                      mediaQuery: 'max',
                      /* autoWidth: true, */
                        perPage: 4,
                        gap: "2rem",
                        arrows: true,
                        width: "90vw",
                        type: "loop",
                        autoplay: true,
                        lazyLoad: true,
                        pagination: "slider",
                         flickMaxPages: 1,
                        breakpoints: {
                            1000: {
                                perPage: 3,
                                gap: "2rem",

                            },
                              640: {
                                  perPage: 2,
                                gap: "1rem",
                               
                                                         
                                 },
                                 300: {
                                  destroy: true,
                                   },
                                   
                              
                        }
                      
                        
                    }}>
                    {randomRecipe.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                    <Link to={"/recipes/" + recipe.id}>
                                <div className="cards">
                                 <img className='splideImg' data-splide-lazy={recipe.image} src={recipe.image} alt={recipe.title}/>
                                 <div className='cardContent'>
                                 <p id="cardTitle"><i className="fas fa-angle-right"></i> {recipe.title}</p>
                                 <p id="cardLikes"><i className="fas fa-heart" style={{"color":"red"}}></i> {recipe.aggregateLikes}</p>
                                 </div>
                               </div>
                                </Link>
                         </SplideSlide>
                            
                        );
                    })}
                    
                    </Splide>
          </div>
  )
}

export default Recipes