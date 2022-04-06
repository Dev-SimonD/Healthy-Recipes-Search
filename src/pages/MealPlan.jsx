import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { NavLink } from 'react-router-dom';
import loadingGif from "../images/loadingGif.gif"



const MealPlan = ({session}) => {


    const [breakfastId, setBreakfastId] = useState("")
    const [launchId, setLaunchId] = useState("")
    const [dinnerId, setDinnerId] = useState("")
    const [breakfast, setBreakfast] = useState(null)
    const [launch, setLaunch] = useState(null)
    const [dinner, setDinner] = useState(null)


    const mealURL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${process.env.REACT_APP_API_KEY}`;
   // const mealplanDetailURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;

   const [loading, setLoading] = useState(true)   
   const [updated, setUpdated] = useState(null)
   const [spoonUsername, setSpoonUsername] = useState(null)
  const [spoonPassword, setSpoonPassword] = useState(null)
  const [spoonHash, setSpoonHash] = useState(null)
  const [mealPlan, setMealPlan] = useState()
  const [mealPlanNutrients, setMealPlanNutrients] = useState()


   useEffect(() => {
       getProfile()
   }, [session])

   const getProfile = async () => {
       try {
         setLoading(true)
         const user = supabase.auth.user()
   
         let { data, error, status } = await supabase
           .from('profiles')
           .select(`username, updated, spoonUsername, spoonPassword, spoonHash`)
           .eq('id', user.id)
           .single()
   
         if (error && status !== 406) {
           throw error
         }
   
         if (data) {
           console.log(data)
           setUpdated(data.updated)
           setSpoonUsername(data.spoonUsername)
           setSpoonPassword(data.spoonPassword)
           setSpoonHash(data.spoonHash)
         }
          
        // console.log(breakfast)
        

        const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=2500&apiKey=${process.env.REACT_APP_API_KEY}`)
    const spoonData = await response.json()
    setMealPlanNutrients(spoonData.nutrients)
    console.log(spoonData.nutrients)
    //console.log(spoonData.meals[0].id);
    /* setBreakfastId(spoonData.meals[0].id)
    setLaunchId(spoonData.meals[1].id)
    setDinnerId(spoonData.meals[2].id) */
         
         const meals = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${spoonData.meals[0].id},${spoonData.meals[1].id},${spoonData.meals[2].id}&apiKey=${process.env.REACT_APP_API_KEY}`)
         const mealsData = await meals.json()
        // console.log(mealsData[2])
        setBreakfast(mealsData[0])
        setLaunch(mealsData[1])
        setDinner(mealsData[2])

       } catch (error) {
         alert(error.message)
       } finally {
         setLoading(false)
       }
            
      }

     /*  console.log("breakfast", breakfast)
      console.log("launch", launch)
      console.log("dinner", dinner) */

    /* useEffect(() => {
        getMeal()
    }, []); */

    /* const getMeal = async () => {
       const response = await fetch(`https://api.spoonacular.com/mealplanner/${spoonUsername}/day/2022-06-01?hash=${spoonHash}&apiKey=${process.env.REACT_APP_API_KEY}`)
       const data = await response.json()
       console.log(data);
       setBreakfast(data.meals[0])
       setLaunch(data.meals[1])
       setDinner(data.meals[2])
       console.log(data.meals[0])
 } */
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
           <h1>Meal plan for a day</h1>
           <ul>
             <li>calories: {mealPlanNutrients.calories}</li>
             <li>carbs: {mealPlanNutrients.carbohydrates}</li>
             <li>fats: {mealPlanNutrients.fat}</li>
             <li>proteins: {mealPlanNutrients.protein}</li>
           </ul>
    <div className='recipesCard'>     
           <h2>{`Breakfast: `} {breakfast != null ? (breakfast.title) : ""}</h2>  
{/*            <img src={breakfast.image} alt={breakfast.title}/>                           
 */}      </div>
      <div className='recipesCard'> 
      <h2>{`Launch: `} {launch != null ? (launch.title) : ""}</h2>  
{/*            <img src={launch.image} alt={launch.title}/>
 */}     </div>
      <div className='recipesCard'>           
      <h2>{`Dinnere: `} {dinner != null ? (dinner.title) : ""}</h2>  
{/*         <img src={dinner.image} alt={dinner.title}/>
 */}    </div>
    </div>
    </div>
    )}
    </div>
  )
}

export default MealPlan