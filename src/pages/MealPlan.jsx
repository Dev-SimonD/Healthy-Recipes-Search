import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient';
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { NavLink } from 'react-router-dom';
import loadingGif from "../images/loadingGif.gif"
import  {Link} from "react-router-dom"



const MealPlan = ({session}) => {


    const [breakfastId, setBreakfastId] = useState("")
    const [lunchId, setLunchId] = useState("")
    const [dinnerId, setDinnerId] = useState("")
    const [breakfast, setBreakfast] = useState(null)
    const [lunch, setLunch] = useState(null)
    const [dinner, setDinner] = useState(null)
    const [period, setPeriod] = useState("day")
    const [weightGoal, setWeightGoal] = useState("")
    const [onlyBreakfast, setOnlyBreakfast] = useState(null)
    const [onlyLunch, setOnlyLunch] = useState(null)
    const [onlyDinner, setOnlyDinner] = useState(null)
    /* const [isSummary, setIsSummary] = useState(true)
    const [isIngredients, setIsIngredients] = useState(false)
    const [isInstructions, setIsInstructions] = useState(false) */
    const [isSummaryBreakfast, setIsBreakfastSummary] = useState(true)
    const [isIngredientsBreakfast, setIsBreakfastIngredients] = useState(false)
    const [isInstructionsBreakfast, setIsBreakfastInstructions] = useState(false)
    const [isSummaryLunch, setIsLunchSummary] = useState(true)
    const [isIngredientsLunch, setIsLunchIngredients] = useState(false)
    const [isInstructionsLunch, setIsLunchInstructions] = useState(false)
    const [isSummaryDinner, setIsDinnerSummary] = useState(true)
    const [isIngredientsDinner, setIsDinnerIngredients] = useState(false)
    const [isInstructionsDinner, setIsDinnerInstructions] = useState(false)


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
  const [vegetarian, setVegetarian] = useState(false);
  const [paleo, setPaleo] = useState(false);
  const [ketogenic, setKetogenic] = useState(false);
  const [pescaterian, setPescaterian] = useState(false);


   useEffect(() => {
       getProfile()
   }, [session])

   const getProfile = async () => {
       try {
         setLoading(true)
         const user = supabase.auth.user()
   
         let { data, error, status } = await supabase
           .from('profiles')
           .select(`username, updated, spoonUsername, spoonPassword, spoonHash, bmrValue, coef, tdeeValue, weightGoal,
           vegetarian, paleo, ketogenic, pescaterian `)
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
           setVegetarian(data.vegetarian)
           setPaleo(data.paleo)
           setKetogenic(data.ketogenic)
           setPescaterian(data.pescaterian)
          
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

 /*  const changeHandler = ((e) => {
    e.preventDefault()
    console.log(e.target.value)
    setPeriod(e.target.value)
    
  }) */

  const clickHandler = ((e) => {
    e.preventDefault()
    console.log("clicked")
  
  })

  const handleClick = ((e) => {
    /* e.preventDefault() */
    console.log("tdee on click", tdeeValue)
    getMealPlanNow()
   
  })

  const summaryHandlerBreakfast = ((e) => {
    e.preventDefault()
    setIsBreakfastSummary(true)
    setIsBreakfastIngredients(false)
    setIsBreakfastInstructions(false)
})
const ingredientsHandlerBreakfast = ((e) => {
    e.preventDefault()
    setIsBreakfastSummary(false)
    setIsBreakfastIngredients(true)
    setIsBreakfastInstructions(false)
})
const instructionsHandlerBreakfast = ((e) => {
    e.preventDefault()
    setIsBreakfastSummary(false)
    setIsBreakfastIngredients(false)
    setIsBreakfastInstructions(true)
})
const summaryHandlerLunch = ((e) => {
  e.preventDefault()
  setIsLunchSummary(true)
  setIsLunchIngredients(false)
  setIsLunchInstructions(false)
})
const ingredientsHandlerLunch = ((e) => {
  e.preventDefault()
  setIsLunchSummary(false)
  setIsLunchIngredients(true)
  setIsLunchInstructions(false)
})
const instructionsHandlerLunch = ((e) => {
  e.preventDefault()
  setIsLunchSummary(false)
  setIsLunchIngredients(false)
  setIsLunchInstructions(true)
})
const summaryHandlerDinner = ((e) => {
  e.preventDefault()
  setIsDinnerSummary(true)
  setIsDinnerIngredients(false)
  setIsDinnerInstructions(false)
})
const ingredientsHandlerDinner = ((e) => {
  e.preventDefault()
  setIsDinnerSummary(false)
  setIsDinnerIngredients(true)
  setIsDinnerInstructions(false)
})
const instructionsHandlerDinner = ((e) => {
  e.preventDefault()
  setIsDinnerSummary(false)
  setIsDinnerIngredients(false)
  setIsDinnerInstructions(true)
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

    let tempPeriod = period;

    if(tempPeriod === "day"){
      let dietVeg = "";
      let dietPal = "";
      let dietKet = "";
      let dietPes = "";
      if (vegetarian){
        dietVeg = "diet=vegetarian&"
      }
      if (paleo){
        dietPal = "diet=paleo&"
      }
      if (ketogenic){
        dietKet = "diet=ketogenic&"
      }
      if (pescaterian){
        dietPes = "diet=pescaterian&"
      }
    const response = await fetch(`https://api.spoonacular.com/mealplanner/generate?timeFrame=day&${dietVeg}${dietPal}${dietPes}${dietKet}targetCalories=${tempTdeeValue}&apiKey=${process.env.REACT_APP_API_KEY}`)
    const spoonData = await response.json()
    setMealPlanNutrients(spoonData.nutrients)
    console.log(spoonData.nutrients)

         const meals = await fetch(`https://api.spoonacular.com/recipes/informationBulk?ids=${spoonData.meals[0].id},${spoonData.meals[1].id},${spoonData.meals[2].id}&apiKey=${process.env.REACT_APP_API_KEY}`)
         const mealsData = await meals.json()
         console.log(mealsData)
        setBreakfast(mealsData[0])
        setLunch(mealsData[1])
        setDinner(mealsData[2])
        setOnlyBreakfast()
        setOnlyLunch()
        setOnlyDinner()
        console.log(breakfast)
        /* setPeriod("") */
    }
    if(tempPeriod === "breakfast"){
      console.log("get Breakfast")
      let dietVeg = "";
      let dietPal = "";
      let dietKet = "";
      let dietPes = "";
      if (vegetarian){
        dietVeg = "diet=vegetarian&"
      }
      if (paleo){
        dietPal = "diet=paleo&"
      }
      if (ketogenic){
        dietKet = "diet=ketogenic&"
      }
      if (pescaterian){
        dietPes = "diet=pescaterian&"
      }
      let minBreakfast = ((tempTdeeValue/100)*22).toFixed();
      let maxBreakfast = ((tempTdeeValue/100)*35).toFixed();
      /* console.log("min bre:", minBreakfast)
      console.log("max bre:", maxBreakfast) */
      const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeNutrition=true&${dietVeg}${dietPal}${dietPes}${dietKet}instructionsRequired=true&sort=random&type=breakfast&minCalories=${minBreakfast}&maxCalories=${maxBreakfast}&apiKey=${process.env.REACT_APP_API_KEY}&&number=1`)
      const data = await response.json()
      setOnlyBreakfast(data.results)
      setBreakfast()
        setLunch()
        setDinner()
        setOnlyLunch()
        setOnlyDinner()
        setMealPlanNutrients()
      console.log(data.results)
      /* setPeriod("") */
  }
  if(tempPeriod === "lunch"){
    console.log("get Lunch")
    let dietVeg = "";
      let dietPal = "";
      let dietKet = "";
      let dietPes = "";
      if (vegetarian){
        dietVeg = "diet=vegetarian&"
      }
      if (paleo){
        dietPal = "diet=paleo&"
      }
      if (ketogenic){
        dietKet = "diet=ketogenic&"
      }
      if (pescaterian){
        dietPes = "diet=pescaterian&"
      }
      let minLunch = ((tempTdeeValue/100)*35).toFixed();
      let maxLunch = ((tempTdeeValue/100)*40).toFixed();
    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeNutrition=true&${dietVeg}${dietPal}${dietPes}${dietKet}instructionsRequired=true&sort=random&type=lunch&minCalories=${minLunch}&maxCalories=${maxLunch}&apiKey=${process.env.REACT_APP_API_KEY}&&number=1`)
    const data = await response.json()
    setOnlyLunch(data.results)
    setBreakfast()
        setLunch()
        setDinner()
        setOnlyBreakfast()
        setOnlyDinner()
        setMealPlanNutrients()
    console.log(data.results)
   /*  setPeriod("") */
}
if(tempPeriod === "dinner"){
  console.log("get Dinner")
  let dietVeg = "";
      let dietPal = "";
      let dietKet = "";
      let dietPes = "";
      if (vegetarian){
        dietVeg = "diet=vegetarian&"
      }
      if (paleo){
        dietPal = "diet=paleo&"
      }
      if (ketogenic){
        dietKet = "diet=ketogenic&"
      }
      if (pescaterian){
        dietPes = "diet=pescaterian&"
      }
      let minDinner = ((tempTdeeValue/100)*25).toFixed();
      let maxDinner = ((tempTdeeValue/100)*30).toFixed();
  const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&addRecipeNutrition=true&${dietVeg}${dietPal}${dietPes}${dietKet}instructionsRequired=true&sort=random&type=dinner&minCalories=${minDinner}&maxCalories=${maxDinner}&apiKey=${process.env.REACT_APP_API_KEY}&&number=1`)
  const data = await response.json()
  setOnlyDinner(data.results)
  setBreakfast()
        setLunch()
        setDinner()
        setOnlyBreakfast()
        setOnlyLunch()
        setMealPlanNutrients()
  console.log(data.results)
  /* setPeriod("") */
}
console.log(onlyBreakfast)
  }

  return (
    <div className='container'>
      <div className='accountForm' id="mealPlanAccountForm">
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
           <h1 className='title has-text-centered'>Meal Plan</h1>
           {weightGoal === "lose" ?(<p className='has-text-centered'>All recipes for your weight loss journey.</p>):("")}
           {weightGoal === "gain" ?(<p className='has-text-centered'>All recipes for your weigh gain journey</p>):("")}
           {weightGoal === "keep" ?(<p className='has-text-centered'>All recipes to fit your goals.</p>):("")}
           {vegetarian || paleo || ketogenic || pescaterian ? (<div><p className='has-text-centered'>All recipes fit your 
             {vegetarian?(" vegeterian "):("")}{ketogenic?(" ketogenic "):("")}{paleo?(" paleo "):("")}{pescaterian?(" pescaterian "):("")}
             diet.</p></div>):("")}
           <div id='mealPlanSearchForm'>
            <div className='field'>
          <label className="label" htmlFor="period">Select meal plan</label>
          <select onChange={(e) => (setPeriod(e.target.value))} className="period" name="period"id="period" /* onChange={(e) => setExercise(e.target.value)} */>
             <option value="day">Day plan</option>
             <option value="breakfast">Breakfast</option>
             <option value="lunch">Lunch</option>
             <option value="dinner">Dinner</option>
              
            </select>
          
            </div>
          <button className='button is-primary signupBtn' style={{"maxWidth":"300px"}} onClick={handleClick}>Search</button>
          </div>
          
           {mealPlanNutrients ? (
             <div style={{"margin":"1rem"}}>
           <p className='label'>{`Your daily calorie intake to support your weight goal is ${weightGoalValue}kcal`}</p>
           <ul>
             <p>This meal plan nutrition includes:</p>
             <li>calories: {mealPlanNutrients ? (mealPlanNutrients.calories) : ("")}</li>
             <li>carbs: {mealPlanNutrients ? (mealPlanNutrients.carbohydrates) : ("")}</li>
             <li>fats: {mealPlanNutrients ? (mealPlanNutrients.fat) : ("")}</li>
             <li>proteins: {mealPlanNutrients ? (mealPlanNutrients.protein) : ("")}</li>
           </ul> </div>):("")}
           <div className='mealPlanCards'>
              {/*  period === "breakfast" &&  */onlyBreakfast ? (
              <div>
                
                <div className='accountForm mealPlanCardFlex' style={{"marginTop":"0"}}>
      <img style={{"borderRadius":"2rem"}} src={onlyBreakfast[0].image} alt={onlyBreakfast[0].title}/>
        <div className='displayFlex'>
        <h1 className='title'>{onlyBreakfast[0].title}</h1>
        <p className='mb-3'>Calories: {onlyBreakfast[0].nutrition.nutrients[0].amount}{onlyBreakfast[0].nutrition.nutrients[0].unit}</p>
        <Link to={"/recipes/" + onlyBreakfast[0].id}><button className='button is-primary signupBtn tryMeBtn'>Try It</button></Link>
        </div>
        </div>
        <div>
        <p className='accountForm p-3 m-1 has-text-justified' style={{"marginTop":"0"}} dangerouslySetInnerHTML={{__html: onlyBreakfast[0].summary}}/> 
         </div>
         </div>)
        :("")}
        { /* period === "lunch" &&  */onlyLunch ? (<div><div className='accountForm mealPlanCardFlex' style={{"marginTop":"0"}}>
      <img style={{"borderRadius":"2rem"}} src={onlyLunch[0].image} alt={onlyLunch[0].title}/>
       <div className='displayFlex'>
        <h1 className='title'>{onlyLunch[0].title}</h1>
        <p className='mb-3'>Calories: {onlyLunch[0].nutrition.nutrients[0].amount}{onlyLunch[0].nutrition.nutrients[0].unit}</p>
        <Link to={"/recipes/" + onlyLunch[0].id}><button className='button is-primary signupBtn tryMeBtn'>Try It</button></Link>
        </div>
        </div>
        <div>
        <p className='accountForm p-3 m-1 has-text-justified' style={{"marginTop":"0"}} dangerouslySetInnerHTML={{__html: onlyLunch[0].summary}}/>
        
        </div>
        </div>
        )
        :("")}
        {/*  period === "dinner" &&  */onlyDinner ? (<div><div className='accountForm mealPlanCardFlex'style={{"marginTop":"0"}}>
      <img style={{"borderRadius":"2rem"}} src={onlyDinner[0].image} alt={onlyDinner[0].title}/>
       <div className='displayFlex'>
        <h1 className='title'>{onlyDinner[0].title}</h1>
        <p className='mb-3'>Calories: {onlyDinner[0].nutrition.nutrients[0].amount}{onlyDinner[0].nutrition.nutrients[0].unit}</p>
        <Link to={"/recipes/" + onlyDinner[0].id}><button className='button is-primary signupBtn tryMeBtn'>Try It</button></Link>
        </div>
        </div>
        <div>
        <p className='accountForm p-3 m-1 has-text-justified'style={{"marginTop":"0"}} dangerouslySetInnerHTML={{__html: onlyDinner[0].summary}}/>
        </div>
        </div>)
        :("")}
          
          
           {/* period === "day" && */ breakfast ?  (
           <div>
             
              <div className='accountForm p-3 m-1 mealPlanAccountImage' >  
                  <h1 className='fs-1 pb-4'>Breakfast:</h1>   
                    <h2 className='has-text-justified' style={{"fontSize":"1.5rem"}}>{breakfast != null ? (breakfast.title) : ""}</h2>  
           <Link to={"/recipes/" + breakfast.id}>
                    {breakfast ? (<img src={breakfast.image} alt={breakfast.title} />):("")}                           
                </Link>
                </div>
                <div>
                <button className='button is-primary is-light recipeButtons' onClick={summaryHandlerBreakfast}>Summary</button>
                <button className='button is-primary is-light recipeButtons' onClick={ingredientsHandlerBreakfast}>Ingredients</button>
                <button className='button is-primary is-light recipeButtons' onClick={instructionsHandlerBreakfast}>Instructions</button>
            </div>
                   {/*  {breakfast != null ? (<p className='accountForm has-text-justified' style={{"padding":"2rem", "marginTop":"0", "marginBottom":"2rem"}} dangerouslySetInnerHTML={{__html: breakfast.summary}}/>) : ("")}   */}
                   {isSummaryBreakfast && (
          <p className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: breakfast.summary}}/>
          ) }
          {isIngredientsBreakfast && (
              <div className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}}>
            <ol>
          {breakfast.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} style={{"margin":"0 1rem"}}>{ingredient.original}</li>

          ))}
      </ol>
      </div>
          ) }
          {isInstructionsBreakfast && (
           <p className='accountForm has-text-justified' style={{"padding":"0.5rem 1rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: breakfast.instructions}}/>
          ) }
                </div>
                ):("")}
                {/* period === "day" && */ lunch ? (
                  <div>
                    
                <div className='accountForm p-3 m-1 mealPlanAccountImage'> 
                <h1 className='fs-1 pb-4'>Lunch:</h1>
                <h2 className='has-text-justified' style={{"fontSize":"1.5rem"}}>{lunch != null ? (lunch.title) : ""}</h2>  
                <Link to={"/recipes/" + lunch.id}>
                {lunch ? (<img src={lunch.image} alt={lunch.title}/>):("")}
              </Link>
              </div>
              <div>
                <button className='button is-primary is-light recipeButtons' onClick={summaryHandlerLunch}>Summary</button>
                <button className='button is-primary is-light recipeButtons' onClick={ingredientsHandlerLunch}>Ingredients</button>
                <button className='button is-primary is-light recipeButtons' onClick={instructionsHandlerLunch}>Instructions</button>
            </div>
                {/* {lunch != null ? (<p className='accountForm has-text-justified' style={{"padding":"2rem", "marginTop":"0", "marginBottom":"2rem"}} dangerouslySetInnerHTML={{__html: lunch.summary}}/>) : ("")} */}
                {isSummaryLunch && (
          <p className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: lunch.summary}}/>
          ) }
          {isIngredientsLunch && (
              <div className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}}>
            <ol>
          {lunch.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} style={{"margin":"0 1rem"}}>{ingredient.original}</li>

          ))}
      </ol>
      </div>
          ) }
          {isInstructionsLunch && (
           <p className='accountForm has-text-justified' style={{"padding":"0.5rem 1rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: lunch.instructions}}/>
          ) }  
             </div>
              ):("")}
              {/* period === "day" &&  */dinner ? (
                <div>
                  
                <div className='accountForm p-3 m-1 mealPlanAccountImage'>  
                  <h1 className='fs-1 pb-4'>Dinner:</h1>         
                <h2 className='has-text-justified' style={{"fontSize":"1.5rem"}}>{dinner != null ? (dinner.title) : ""}</h2>  
              <Link to={"/recipes/" + dinner.id}>
                  {dinner ? (<img src={dinner.image} alt={dinner.title} />):("")}

              </Link>
              </div>
              <div>
                <button className='button is-primary is-light recipeButtons' onClick={summaryHandlerDinner}>Summary</button>
                <button className='button is-primary is-light recipeButtons' onClick={ingredientsHandlerDinner}>Ingredients</button>
                <button className='button is-primary is-light recipeButtons' onClick={instructionsHandlerDinner}>Instructions</button>
            </div>
                {/* {dinner != null ? (<p className='accountForm has-text-justified' style={{"padding":"2rem", "marginTop":"0", "marginBottom":"2rem"}} dangerouslySetInnerHTML={{__html: dinner.summary}}/>) : ("")} */}
                {isSummaryDinner && (
          <p className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: dinner.summary}}/>
          ) }
          {isIngredientsDinner && (
              <div className='accountForm has-text-justified' style={{"padding":"0.5rem", "marginTop":"0"}}>
            <ol>
          {dinner.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} style={{"margin":"0 1rem"}}>{ingredient.original}</li>

          ))}
      </ol>
      </div>
          ) }
          {isInstructionsDinner && (
           <p className='accountForm has-text-justified' style={{"padding":"0.5rem 1rem", "marginTop":"0"}} dangerouslySetInnerHTML={{__html: dinner.instructions}}/>
          ) }  
             </div>
             ):("")}

              {/* {onlyBreakfast? (
                
                
                  onlyBreakfast.map((recipe) => {
                               <Link to={"/recipes/" + recipe.id}>
                                <div className="cards smallRecipeCard">
                                 <img className='splideImg' src={recipe.image} alt={recipe.title}/>
                                 <div className='cardContent m-a'>
                                 <h1 className="cardTitle has-text-centered pb-5"><i className="fas fa-angle-right"></i> {recipe.title}</h1>
                                 <p id="cardLikes"><i className="fas fa-heart" style={{"color":"red"}}></i> {recipe.aggregateLikes}</p>
                                 </div>
                               </div>
                                </Link>})                             
                    ):("")}
              {onlyLunch? (
                onlyLunch.map((recipe) => {
                  <Link to={"/recipes/" + recipe.id}>
                   <div className="cards smallRecipeCard">
                    <img className='splideImg' src={recipe.image} alt={recipe.title}/>
                    <div className='cardContent m-a'>
                    <h1 className="cardTitle has-text-centered pb-5"><i className="fas fa-angle-right"></i> {recipe.title}</h1>
                    <p id="cardLikes"><i className="fas fa-heart" style={{"color":"red"}}></i> {recipe.aggregateLikes}</p>
                    </div>
                  </div>
                   </Link>}) 
              ):("")}
              {onlyDinner? (
                onlyDinner.map((recipe) => {
                  <Link to={"/recipes/" + recipe.id}>
                   <div className="cards smallRecipeCard">
                    <img className='splideImg' src={recipe.image} alt={recipe.title}/>
                    <div className='cardContent m-a'>
                    <h1 className="cardTitle has-text-centered pb-5"><i className="fas fa-angle-right"></i> {recipe.title}</h1>
                    <p id="cardLikes"><i className="fas fa-heart" style={{"color":"red"}}></i> {recipe.aggregateLikes}</p>
                    </div>
                  </div>
                   </Link>}) 
              ):("")} */}
              </div>
    {/* </div>
    ) : ("")} */}





    </div>
    </div>
    )}

   {/*  {onlyBreakfast ? (<div className='accountForm'>
      <img style={{"borderRadius":"2rem"}} src={onlyBreakfast[0].image} alt={onlyBreakfast[0].title}/>
        <h1>{onlyBreakfast[0].title}</h1>
        <p>{onlyBreakfast[0].nutrition.nutrients[0].amount}{onlyBreakfast[0].nutrition.nutrients[0].unit}</p></div>)
        :("")} */}
    </div>
    </div>
  )
}

export default MealPlan