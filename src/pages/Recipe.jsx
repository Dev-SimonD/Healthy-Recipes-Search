import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import { supabase } from '../components/supabaseClient'


function Recipe({session}) {

    let params = useParams();
    const [details, setDetails] = useState({});
    const [isSummary, setIsSummary] = useState(true)
    const [isIngredients, setIsIngredients] = useState(false)
    const [isInstructions, setIsInstructions] = useState(false)
    const [loading, setLoading] = useState(true)
    const [favorites, setFavorites] = useState(false)
    const [favoritesArray, setFavoritesArray] = useState([])

    const fetchedDetails = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const detailData = await data.json();
        setDetails(detailData);
    }

        useEffect(() => {
            fetchedDetails()
            getProfile()
        }, []);

        const getProfile = async () => {
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

                setFavoritesArray(data.favoritesArray)
               
              }
            } catch (error) {
              alert(error.message)
            } finally {
                  

              setLoading(false)
            }
          }

          
  const addFavorite = async () => {
   
    try {
      setLoading(true)
      const user = supabase.auth.user()
       const updates = {
        id: user.id,
        /* favorites: details.id, */
        favoritesArray,
         }
      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', 
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
     
    }
 }

        const summaryHandler = ((e) => {
            e.preventDefault()
            setIsSummary(true)
            setIsIngredients(false)
            setIsInstructions(false)
        })
        const ingredientsHandler = ((e) => {
            e.preventDefault()
            setIsSummary(false)
            setIsIngredients(true)
            setIsInstructions(false)
        })
        const instructionsHandler = ((e) => {
            e.preventDefault()
            setIsSummary(false)
            setIsIngredients(false)
            setIsInstructions(true)
        })
        const removeItem = (item) => {
          let myArr = favoritesArray;
          
          const index = myArr.indexOf(item);
          if (index > -1) {
            myArr.splice(index, 1); // 2nd parameter means remove one item only
            setFavoritesArray(myArr)
          }
          console.log(myArr)
          addFavorite()
        };

        const addItem = (item) => {
          let myArr = favoritesArray;
          
          myArr.push(item)
          setFavoritesArray(myArr)
          console.log("myArr is ",myArr)
          addFavorite()
        };
        
        const handleFavorite = (e) => {
          e.preventDefault()
          console.log("current array",favoritesArray)
          if(favoritesArray.includes(parseInt(params.name))){

           removeItem(parseInt(params.name))
            console.log("removing from array")
            return
           }
          else{
            addItem(parseInt(params.name))
            console.log("add to array")
           return
          }
         
        }
         
        


  return (
      <div className='container'>
        <div className='accountForm p-3' id='recipeCard'>
            <h2 className='title' id='recipeTitle'>
                {details.title}
            </h2>
      
           
             <div style={{"display": "flex", "justifyContent" : "center"}}>
            <img className="recipeImage" src={details.image} alt="" />
            </div>
            <br/>
           
        <div className='recipeIcons'>
            <div className='likes'>
            <i className="fas fa-heart" style={{"color":"red"}}></i>
            <p>{details.aggregateLikes} likes</p>
            </div>
        <div className='minutes'>
        <i className="fas fa-clock" style={{"color":"green"}}></i>
            <p>{details.readyInMinutes}m</p>
            </div>
            <div className='likes'>
            <i className="fas fa-star" style={favoritesArray ? favoritesArray.includes(parseInt(params.name)) ? ({"cursor":"pointer","color":"gold"}):({"cursor":"pointer", "color":"grey"}):("nothing here")} onClick={handleFavorite}></i>
             <p>Favorite</p>
            </div>
            </div>
            <br/>
           
            <div>
                <button className='button is-primary is-light recipeButtons' onClick={summaryHandler}>Summary</button>
                <button className='button is-primary is-light recipeButtons' onClick={ingredientsHandler}>Ingredients</button>
                <button className='button is-primary is-light recipeButtons' onClick={instructionsHandler}>Instructions</button>
            </div>
            {isSummary && (
          <p className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: details.summary}}/>
          ) }
          {isIngredients && (
              <div className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}}>
            <ol>
          {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} style={{"margin":"0 1rem"}}>{ingredient.original}</li>

          ))}
      </ol>
      </div>
          ) }
          {isInstructions && (
           <p className='accountForm has-text-justified' style={{"padding":"0.5rem 1rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: details.instructions}}/>
          ) }
          </div>
      </div>
   
  )
}


export default Recipe