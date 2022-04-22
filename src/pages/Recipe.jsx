import React, {useEffect, useState} from 'react'
//import styled from 'styled-components';
import {useParams} from "react-router-dom"
import { supabase } from '../components/supabaseClient'


function Recipe({session}) {

    let params = useParams();
    const [details, setDetails] = useState({});
    //const [activeTab, setActiveTab] = useState("instructions");
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
/*         console.log(details)
 *//*         console.log("params.name is",params.name)
 */
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
/*                 console.log(data)
 */               /*  setFavorites(data.favorites) */
                setFavoritesArray(data.favoritesArray)
/*                 let myArr = favoritesArray;
 */               
              }
            } catch (error) {
              alert(error.message)
            } finally {
                  

              setLoading(false)
            }
          }

          
  const addFavorite = async () => {
/*     e.preventDefault()
 *//*     console.log(details.id)
 */    
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
          /* setFavoritesArray((prevState) =>
            prevState.filter((prevItem) => prevItem !== item)
          ); */
          const index = myArr.indexOf(item);
          if (index > -1) {
            myArr.splice(index, 1); // 2nd parameter means remove one item only
            setFavoritesArray(myArr)
          }
          console.log(myArr)
          addFavorite()
          /* console.log("in remove function", favoritesArray) */
        };

        const addItem = (item) => {
          let myArr = favoritesArray;
          /* setFavoritesArray((prevState) =>
            prevState.filter((prevItem) => prevItem !== item)
          ); */
          myArr.push(item)
          setFavoritesArray(myArr)
          console.log("myArr is ",myArr)
          addFavorite()
          /* console.log("in adding function", favoritesArray) */
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
            /* setFavoritesArray([...favoritesArray, parseInt(params.name)]) */
            addItem(parseInt(params.name))
            console.log("add to array")
            /* addFavorite() */
           return
          }
         /*  setFavorites(!favorites); */

          /* addFavorite() */
          /* setFavorites(!favorites)
            console.log("favorite clicked")
            if(favoritesArray.includes(details.id))
            return;
            
            if(favorites)
            {
                setFavoritesArray([...favoritesArray,details.id])
                console.log(favoritesArray)
                addFavorite(e)
                
            } */
        }
         /*  console.log(favoritesArray[0])
        if(favoritesArray.includes(644846)){
          console.log("INSIDE INCLUDE")
          setFavorites(true)
        }
        console.log(`includes ${params.name}? ${favorites}`) */
        


  return (
      <div className='container'>
        <div className='accountForm p-3' id='recipeCard'>
            <h2 className='title' id='recipeTitle'>
                {details.title}
            </h2>
           {/*  <p>
          {favoritesArray ? favoritesArray.includes(parseInt(params.name)) ? ("included"):("not included"):("nothing here")}
          </p> */}
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
{/*             <i className="fas fa-star" style={favoritesArray ? favoritesArray.includes(parseInt(params.name)) ? ({"cursor":"pointer","color":"gold"}):({"cursor":"pointer"}):("nothing here")} onClick={handleFavorite}></i>
 */}            <i className="fas fa-star" style={favoritesArray ? favoritesArray.includes(parseInt(params.name)) ? ({"cursor":"pointer","color":"gold"}):({"cursor":"pointer", "color":"grey"}):("nothing here")} onClick={handleFavorite}></i>
           {/* <button className='button is-primary'  onClick={handleFavorite}>favorite</button> */}
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
          <p className='accountForm' style={{"padding":"2rem"}} dangerouslySetInnerHTML={{__html: details.summary}}/>
          ) }
          {isIngredients && (
              <div className='accountForm' style={{"padding":"2rem"}}>
            <ol>
          {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>

          ))}
      </ol>
      </div>
          ) }
          {isInstructions && (
           <p className='accountForm' style={{"padding":"2rem"}} dangerouslySetInnerHTML={{__html: details.instructions}}/>
          ) }
          </div>
      </div>
   /*  <DetailWrapper>
        <div>
        <h2>
            {details.title}
        </h2>
        <img src={details.image} alt="" />
        </div>
        <Info>
            <Button
             className={activeTab === "instructions" ? "active" : ""}
             onClick={() => setActiveTab("instructions")}>
                 Instructions
                 </Button>
            <Button
             className={activeTab === "ingredients" ? "active" : ""}
              onClick={() => setActiveTab("ingredients")}>
                  Ingredients
                  </Button>
                  {activeTab === "instructions" && (
                         <div>
                         <h3 dangerouslySetInnerHTML={{__html: details.summary}}></h3>
                         <h3 dangerouslySetInnerHTML={{__html: details.instructions}}></h3>
                    </div>
                  )}
                 {activeTab === "ingredients" && (
                     <ul>
                     {details.extendedIngredients.map((ingredient) => (
                         <li key={ingredient.id}>{ingredient.original}</li>

                     ))}
                 </ul>
                 )}
                 
        </Info>
    </DetailWrapper> */
  )
}
/* 
const DetailWrapper = styled.div`
    margin-top: 10rem;
    margin-bottom: 5rem;
    display: flex;
    img{
       width: 50%;
    }
    .active{
        background: linear-gradient(35deg, #494949, #313131);
        color: white;
    }
    h3{
        margin-bottom: 2rem;
    }
    li{
        font-size: 1.2rem;
        line-height: 2.5rem;
    }
    ul{
        margin-top: 2rem;
    }
`;

const Button = styled.button`
    padding: 1rem 2rem;
    color: #313131;
    border: 2px solid black;
    background: white;
    margin-right: 2rem;
    font-weight: 600;
`;

const Info = styled.div`
    margin-left: 10rem;
`; */

export default Recipe