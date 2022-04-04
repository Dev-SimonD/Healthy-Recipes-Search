import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { NavLink } from 'react-router-dom';
import loadingGif from "../images/loadingGif.gif"



const MealPlan = ({session}) => {

    const [breakfast, setBreakfast] = useState([])
    const [launch, setLaunch] = useState([])
    const [dinner, setDinner] = useState([])


    const mealURL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${process.env.REACT_APP_API_KEY}`;
   // const mealplanDetailURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;

   const [loading, setLoading] = useState(true)   
   const [updated, setUpdated] = useState(null)


   useEffect(() => {
       getProfile()
   }, [session])

   const getProfile = async () => {
       try {
         setLoading(true)
         const user = supabase.auth.user()
   
         let { data, error, status } = await supabase
           .from('profiles')
           .select(`updated`)
           .eq('id', user.id)
           .single()
   
         if (error && status !== 406) {
           throw error
         }
   
         if (data) {
           console.log(data)
           setUpdated(data.updated)
         }
       } catch (error) {
         alert(error.message)
       } finally {
         setLoading(false)
       }
     }

    useEffect(() => {
        getMeal()
    }, []);

    const getMeal = async () => {
       const response = await fetch(mealURL)
       const data = await response.json()
       //console.log(data);
       setBreakfast(data.meals[0])
       setLaunch(data.meals[1])
       setDinner(data.meals[2])
      // console.log(data.meals[0])
 }
 //console.log(meal)
/* 
 const getMealplanDetails = async (id) => {
    const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`)
    const data = await response.json()
    setMealplanstate(data)

} */
  const clickHandler = ((e) => {
    e.preventDefault()
    console.log("clicked")
  
  })
  

  return (
    <div>
      {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>):(
        <div>
    <div className={!updated ? "" : "nonDisplay" }>
    <div className="modal2" id="modal2">
     <h2>Meal Plan feature require user info</h2>
     <div className="content2">For accessing meal plan feature, please fill out your profile information. After that you will be able to access the meal plan.</div>
     <div className="actions2">
       <NavLink className="linkName" to="/account">OK</NavLink>
     </div>
   </div>
   </div>
        <div className={updated ? "" : "nonDisplay" }>
           
    <div className='recipesCard'>     
           <h2> {breakfast.title} </h2>  
           <img src={breakfast.image} alt={breakfast.title}/>                           
      </div>
      <div className='recipesCard'> 
           <h2>  {launch.title} </h2>
           <img src={launch.image} alt={launch.title}/>
     </div>
      <div className='recipesCard'>           
        <h2>  {dinner.title}</h2>
        <img src={dinner.image} alt={dinner.title}/>
    </div>
    </div>
    </div>
    )}
    </div>
  )
}

export default MealPlan