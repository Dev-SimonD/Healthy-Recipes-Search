import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { NavLink } from 'react-router-dom';
import loadingGif from "../images/loadingGif.gif"
import  {Link} from "react-router-dom"



const MealPlan = ({session}) => {


    const [breakfastId, setBreakfastId] = useState("")
    const [launchId, setLaunchId] = useState("")
    const [dinnerId, setDinnerId] = useState("")
    const [breakfast, setBreakfast] = useState(null)
    const [launch, setLaunch] = useState(null)
    const [dinner, setDinner] = useState(null)
    const [period, setPeriod] = useState("")
    const [weightGoal, setWeightGoal] = useState("")


    const mealURL = `https://api.spoonacular.com/mealplanner/generate?timeFrame=day&apiKey=${process.env.REACT_APP_API_KEY}`;
   // const mealplanDetailURL = `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${process.env.REACT_APP_API_KEY}`;

   const [loading, setLoading] = useState(true)   
   const [updated, setUpdated] = useState(null)
   const [spoonUsername, setSpoonUsername] = useState(null)
  const [spoonPassword, setSpoonPassword] = useState(null)
  const [spoonHash, setSpoonHash] = useState(null)
  const [mealPlan, setMealPlan] = useState()
  const [mealPlanNutrients, setMealPlanNutrients] = useState(null)
  const [bmrValue, setBmrValue] = useState()
  const [coef, setCoef] = useState()
  const [tdeeValue, setTdeeValue] = useState(0)
  const [weightGoalValue, setWeightGoalValue] = useState()


   useEffect(() => {
       getProfile()
   }, [session])

   const getProfile = async () => {
       try {
         setLoading(true)
         const user = supabase.auth.user()
   
         let { data, error, status } = await supabase
           .from('profiles')
           .select(`username, updated, spoonUsername, spoonPassword, spoonHash, bmrValue, coef, tdeeValue, weightGoal `)
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
           setBmrValue(data.bmrValue)
           setCoef(data.coef)
           setTdeeValue(data.tdeeValue)
           setWeightGoal(data.weightGoal)
          
         }
          
         
         
      
       

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

  const handleClick = ((e) => {
    e.preventDefault()
    console.log("tdee on click", tdeeValue)
    getMealPlanNow()
   
  })

  /* const handlePeriod = ((e) => {
    e.preventDefault
    console.log("the value of period is",e.target.value," the weight Goal is", weightGoal)
  }) */
  
  const getMealPlanNow = async () => {
/*     console.log("tdee value before apicall",tdeeValue)
 */
   

      let tempTdeeValue = tdeeValue;
    const tempWeightGoal = weightGoal;
    if(tempWeightGoal === "lose"){
      tempTdeeValue = tempTdeeValue - 500
      setWeightGoalValue(tempTdeeValue)
    }
    else if(tempWeightGoal === "gain"){
      tempTdeeValue = tempTdeeValue + 500
      setWeightGoalValue(tempTdeeValue)

    }
    else{
      tempTdeeValue = tempTdeeValue
      setWeightGoalValue(tempTdeeValue)

    }

    console.log("Temp tdee valu is",tempTdeeValue)

    const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&targetCalories=${tempTdeeValue}&apiKey=${process.env.REACT_APP_API_KEY}`)
    const spoonData = await response.json()
    setMealPlanNutrients(spoonData.nutrients)
    console.log(spoonData.nutrients)

         const meals = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${spoonData.meals[0].id},${spoonData.meals[1].id},${spoonData.meals[2].id}&apiKey=${process.env.REACT_APP_API_KEY}`)
         const mealsData = await meals.json()
         console.log(mealsData)
        setBreakfast(mealsData[0])
        setLaunch(mealsData[1])
        setDinner(mealsData[2])
        console.log(breakfast)
    
     
  }

  return (
    <div className='container'>
      <div className='accountForm'>
      {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>):(
        <div>
    <div className={!updated ? "" : "nonDisplay" }>
    {/* <div className="modal2" id="modal2">
     <h2>Meal Plan feature require user info</h2>
     <div className="content2">For accessing meal plan feature, please fill out your profile information. After that you will be able to access the meal plan.</div>
     <div className="actions2">
       <NavLink className="linkName" to="/account">OK</NavLink>
     </div>
   </div> */}
   <div className='accountForm' id='mealPlanNotUpdated'>
     <h3 className='title has-text-centered'>Meal Plan</h3>
     <p className='has-text-justified pb-5'>To access meal planning feature, please fill out your account information first</p>
     
       <div><NavLink className="button is-primary signupBtn" to="/account">Account</NavLink></div>
     
   </div>
   </div>
        <div className={updated ? "" : "nonDisplay" }>
           <h1 className='title'>Daily meal plan for your individual goals</h1>
          
           <div className='field'>
          <label className="label" htmlFor="period">Select period</label>
          <select onChange={(e) => (setPeriod(e.target.value))} className="period" name="period"id="period" /* onChange={(e) => setExercise(e.target.value)} */>
             <option value="now">Now</option>
             <option value="day">Day</option>
             <option value="week">Week</option>
              
            </select>
          
            </div>
          <button className='button is-primary signupBtn' onClick={handleClick}>find recipe</button>
           {mealPlanNutrients ? (
             <div>
           <p className='label'>{`Your daily calorie intake to support your weight goal is ${weightGoalValue}kcal`}</p>
           <ul>
             <p>This meal plan nutrition:</p>
             <li>calories: {mealPlanNutrients ? (mealPlanNutrients.calories) : ("")}</li>
             <li>carbs: {mealPlanNutrients ? (mealPlanNutrients.carbohydrates) : ("")}</li>
             <li>fats: {mealPlanNutrients ? (mealPlanNutrients.fat) : ("")}</li>
             <li>proteins: {mealPlanNutrients ? (mealPlanNutrients.protein) : ("")}</li>
           </ul>
           <div className='mealPlanCards'>
           {breakfast ? (
           <Link to={"/recipes/" + breakfast.id}>
              <div className='accountForm p-3 m-1'>  
                  <h1 className='has-text-centered fs-1'>Breakfast</h1>   
                    {breakfast ? (<img src={breakfast.image} alt={breakfast.title}/>):("")}                           
                    <h2>{breakfast != null ? (breakfast.title) : ""}</h2>  
                </div>
                </Link>
                ):("")}
                {launch ? (
                <Link to={"/recipes/" + launch.id}>
                <div className='accountForm p-3 m-1'> 
                <h1 className='has-text-centered fs-1'>Launch</h1>
                {launch ? (<img src={launch.image} alt={launch.title}/>):("")}
                <h2>{launch != null ? (launch.title) : ""}</h2>  
              </div>
              </Link>
              ):("")}
              {dinner ? (
              <Link to={"/recipes/" + dinner.id}>
                <div className='accountForm p-3 m-1'>  
                  <h1 className='has-text-centered fs-1'>Dinner</h1>         
                  {dinner ? (<img src={dinner.image} alt={dinner.title}/>):("")}
                <h2>{dinner != null ? (dinner.title) : ""}</h2>  
              </div>
              </Link>
              ):("")}
              </div>
    </div>
    ) : ("")}
    </div>
    </div>
    )}
    </div>
    </div>
  )
}

export default MealPlan