import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import  {Link} from "react-router-dom"
import {Splide, SplideSlide} from "@splidejs/react-splide"
import "@splidejs/splide/dist/css/splide.min.css"
import loadingGif from "../images/loadingGif.gif"
import { toBeInTheDOM } from '@testing-library/jest-dom/dist/matchers';
//import { supabase } from './supabaseClient'




const Recipes = ({session}) => {

    const randomRecipeURL = `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=6&tags=vegetarian`;
    /* const favoritesRecipeURL = `https://api.spoonacular.com/recipes/complexSearch?id=${favorite_id}?apiKey=${process.env.REACT_APP_API_KEY}`; */

    const [randomRecipe, setRandomRecipe] = useState([])
    const [searchedRecipe, setSearchedRecipe] = useState([])
    const [search, setSearch] = useState("")
    const [favoritesArray, setFavoritesArray] = useState([])
    const [favorites, setFavorites] = useState(null)
    const [favoritesRecipes, setFavoritesRecipes] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getDetails()
        getRecipe()
       /*  getFavorites() */
    }, []);

    useEffect(() => {
            getFavorites()
  }, [favoritesArray]);

    const getDetails = async () => {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, favoritesArray`)
            .eq('id', user.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            console.log(data)
           /*  setFavorites(data.favorites) */
            setFavoritesArray(data.favoritesArray)
            getFavorites()
          }
        } catch (error) {
          alert(error.message)
        } finally {
/*           getFavorites()  
 */          setLoading(false)
        }
      }

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

    
    const getFavorites = async () => {
      let favArray = favoritesArray;
      let favoritesString = favArray.join()
      /* console.log(favArray.join()) */
      const response = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${favoritesString}&apiKey=${process.env.REACT_APP_API_KEY}`)
      const favorites = await response.json()
      setFavoritesRecipes(favorites)
      console.log(favorites)
            /* setFavoritesRecipes(data); */
     }
  return (
    <div className='container'>
        {/* <h1 className='label'>
            Search Recipe
        </h1> */}
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
    <button type="submit" className="button is-primary signupBtn">
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
       <h1 className='label has-text-centered p-4'>Our Picks</h1> 
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
                 <div className='accountForm p-3'>
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
                        {/* Favorites */}
                        
                    <h1 className='label has-text-centered p-4'>Your Favorites</h1> 
                          <div className='accountForm p-3'>
                          {favoritesArray == null ? (loadingGif):(
                            <Splide options={{
                      mediaQuery: 'max',
                        perPage: 4,
                        gap: "2rem",
                        arrows: true,
                        width: "80vw",
                       /*  type: "loop",
                        autoplay: true, */
                        lazyLoad: true,
                        pagination: "slider",
                         flickMaxPages: 1,
                        breakpoints: {
                            1000: {
                              direction: "ltr",
                                perPage: 3,
                                gap: "2rem",

                            },
                              640: {
                                direction: "ltr",
                                  perPage: 3,
                                gap: "1rem",
                               
                                                         
                                 },
                                 600: {
                                  destroy: true,
                                  /* direction: "ttb",
                                  height: "auto",
                                  gap: "2rem", */
                                   },
                                   
                              
                        }
                      
                        
                    }}>
                      
                    {favoritesRecipes.map((recipe) => {
                        return(
                            <SplideSlide key={recipe.id}>
                                    <Link to={"/recipes/" + recipe.id}>
                                <div className="cards smallRecipeCard">
                                 <img className='splideImg' data-splide-lazy={recipe.image} src={recipe.image} alt={recipe.title}/>
                                 <div className='cardContent m-a'>
                                 <h1 className="cardTitle has-text-centered pb-5"><i className="fas fa-angle-right"></i> {recipe.title}</h1>
                                 <p id="cardLikes"><i className="fas fa-heart" style={{"color":"red"}}></i> {recipe.aggregateLikes}</p>
                                 </div>
                               </div>
                                </Link>
                         </SplideSlide>
                            
                        );
                    })}
                    
                    </Splide>
                    )}
                    </div>
          </div>
  )
}

export default Recipes