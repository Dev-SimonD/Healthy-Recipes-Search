import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';


const MealPlan = ({session}) => {

/*     const [breakfastID, setBreakfastID] = useState("")
    const [launchID, setLaunchID] = useState("")
    const [dinnerID, setDinnerID] = useState("")

    const [breakfast, setBreakfast] = useState([])
    const [launch, setLaunch] = useState([])
    const [dinner, setDinner] = useState([]) */

    const [breakfast, setBreakfast] = useState([])
    const [launch, setLaunch] = useState([])
    const [dinner, setDinner] = useState([])

    /* let mealplanIds = [];
    let mealplans = [] */

    const mealURL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${process.env.REACT_APP_API_KEY}`;
   // const mealplanDetailURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;

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

  return (
      <>
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
    </>
  )
}

export default MealPlan