import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient'
import GaugeChart from 'react-gauge-chart'
import loadingGif from "../images/loadingGif.gif"
import RecipesLogo from "../images/RecipesLogo.png"
import StatisticsLogo from "../images/statistics.png"





const Dashboard = ({session}) => {

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [gender, setGender] = useState(true)
    const [sex, setSex] = useState(null)
    const [age, setAge] = useState(null)
    const [exercise, setExercise] = useState(null)
    const [updated, setUpdated] = useState(false)
    const [bmiValue, setBmiValue] = useState(0)
    const [bmrValue, setBmrValue] = useState(0)
    const [lbmValue, setLbmValue] = useState(0)
    const [weightGoal, setWeightGoal] = useState("")

    useEffect(() => {
        getProfile()
    }, [session])

    let bmiStatus;
  const bmiStats = ["underweight", "healthy weight", "overweight", "obese", "severly obese"]
  if(bmiValue < 18.5){
    bmiStatus = bmiStats[0]
  }
  else if(bmiValue < 24.9 && bmiValue > 18.5){
    bmiStatus = bmiStats[1]
  }
  else if(bmiValue < 29.9 && bmiValue > 25){
    bmiStatus = bmiStats[2]
  }
  else if(bmiValue < 34.9 && bmiValue > 30){
    bmiStatus = bmiStats[3]
  }
  else{
    bmiStatus = bmiStats[4]
  }


    const getProfile = async () => {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, weight, height, age, gender, sex,updated, bmiValue, exercise, bmrValue, lbmValue, weightGoal`)
            .eq('id', user.id)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
            console.log(data)
            setUsername(data.username)
            setWeight(data.weight)
            setHeight(data.height)
            setGender(data.gender)
            setAge(data.age)
            setSex(data.sex)
            setBmiValue(data.bmiValue)
            setExercise(data.exercise)
            setBmrValue(data.bmrValue)
            setLbmValue(data.lbmValue)
            setUpdated(data.updated)
            setWeightGoal(data.weightGoal)
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

      let TDEE;
      if(exercise){
      let exerciseCoef;
      if(exercise === 1)
        {
          exerciseCoef = 1.2;
        }
      if(exercise === 2)
        {
          exerciseCoef = 1.375;
        }  
        if(exercise === 3)
        {
          exerciseCoef = 1.55;
        }
        if(exercise === 4)
        {
          exerciseCoef = 1.725;
        } 
        if(exercise === 5)
        {
          exerciseCoef = 1.9;
        }     

     TDEE = (exerciseCoef * bmrValue).toFixed();
     console.log("bmi value is", bmiValue)
    }
    else{
      TDEE=0;
    }
    let IdealCalorieValue;
    if(weightGoal === "keep")
    {
    IdealCalorieValue = TDEE;
    }
    if(weightGoal === "gain"){
      IdealCalorieValue = +TDEE+500
    }
    if(weightGoal === "lose"){
      IdealCalorieValue = parseInt(TDEE - 500)
    }
   
    
    console.log("IdealCalorieValue:", IdealCalorieValue)
    console.log("TDEE:", TDEE)
    


     
     
      
  return (
<div >
          {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>):(
             
             <div>
                 <div>
                   <div id='homePageImage' className='display-flex-center'>
                     <h1 className='has-text-centered title' id="homePageTitle">Healthy Recipes</h1>
                     <h1 className='has-text-centered title' id="homePageDescription">Find the recipe for <span style={{"color": "gold"}}> YOU</span></h1>
                   </div>
               {!updated ? (""): (
                   <div className='container'>
                     
            <div className='accountForm' id='statistics'>
            <h1 className='title' style={{"textAlign": "center"}}>{`Hello ${username}, Your Stats:`}</h1>
          <div className="statisticsGauge">
            <div><p>{`Your BMI value is ${bmiValue}`}</p></div>
        <div className='bmiChart'><GaugeChart 
        id="gauge-chart5"
         nrOfLevels={100}
         arcsLength={[0.915, 0.315, 0.25, 0.25, 0.75]}
         colors={[ '#33caff', '#33fe3a', '#fdfb08', '#fb8502', '#fe3135']}
         percent={bmiValue/50}
         formatTextValue={ bmiValue => bmiStatus }
         textColor={"#000000"}
         arcPadding={0.02} />
           </div>
           </div>
           <div className="statisticsGauge">
            <p>Your basal metabolic rate:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{`${bmrValue}kcal`}</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p>Your lean body mass:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{`${lbmValue}kg`}</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p className='has-text-centered'>Your Total daily energy expenditure:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{`${TDEE}kcal`}</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p className='has-text-centered'>Your weight goal is to:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{`${weightGoal} weight`}</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p className='has-text-centered'>Your ideal daily calorie intake is:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{`${IdealCalorieValue}kcal`}</p></div>
           </div>
           </div>
           <div id='accordeon'>
               <div className='accordeonItemA'>
                <h1>BMI</h1>
                <p>Body Mass Index is a measure that uses your height and weight to work out if your weight is healthy
                  </p>
              </div>
              <div className='accordeonItemB'>
                <h1>BMR</h1>
                <p>Basal Metabolic Rate is the amount of calories your body burns performing basic life-sustaining funcitons</p>
              </div>
              <div className='accordeonItemA'>
                <h1>LBM</h1>
                <p>Lean Body Mass is your lean body weight, without your the body fat</p>
              </div>
              <div className='accordeonItemB'>
                <h1>TDEE</h1>
                <p>Total Daily Energy Expenditure is the amounto of calories your body burns per day, including exercising</p>
              </div>
           </div>
                </div>
                </div>
                    )}
                </div>
            
              {updated ? (""):(  
               <div className='accountForm homeCards' id='homePageNotUpdatedWelcome'>
               <h1 className='title has-text-centered'>Welcome to healthy recipes</h1>
               <p className='has-text-justified'>Healthy recipes will help you to search for recipes for your specific needs. To find the suitable recipes, please 
               fill in the profile page, which will give us an idea about how many calories per day you should consume. </p>
               </div>
               )}
               <div className='accountForm homeCards' id='homePageNotUpdatedRecipes'>
                 <div>
               <h1 className='title has-text-centered'>Recipes</h1>
               <p className='has-text-justified'>If you want to search for any recipes, you can do that without filling out your profile page. 
               There are over 80.000 recipes in the database. You can use the filter function to help you find what you're looking for.  
                 Have you found something special? Add it to your favourites list!</p>  
                  </div>
                  <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>
                    <img id="recipesLogo" src={RecipesLogo} alt="RecipesLogo"/>
                </div>
               </div>
           
                 <div className='accountForm homeCards' id='homePageNotUpdatedStatistics'>
                   
                  
             <div>
               <h1 className='title has-text-centered'>Statistics</h1>
               <p className='has-text-justified' id='statisticsPara'>If you decide to try the Meal Planning feature, you will be 
               prompted with the statistics about your Body mass index, Basal metabolic rate, Lean body mass, total daily energy expenditure,
                and the ideal calorie intake for your weight goals.</p>
                  </div>

                  <div className="accountForm" style={{"minWidth": "40%", "margin":"1rem", "padding":"1rem"}}>
                  <div className="statisticsGauge">
            <div><p>Your BMI value is 21.3</p></div>
        <div className='bmiChart'><GaugeChart 
        id="gauge-chart5"
         nrOfLevels={100}
         arcsLength={[0.915, 0.315, 0.25, 0.25, 0.75]}
         colors={[ '#33caff', '#33fe3a', '#fdfb08', '#fb8502', '#fe3135']}
         percent={0.4}
         formatTextValue={ bmiValue => "healthy weight" }
         textColor={"#000000"}
         arcPadding={0.02} />
           </div>
           </div>
           <div className="statisticsGauge">
            <p>Your basal metabolic rate:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>1454kcal</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p>Your lean body mass:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>45.53kg</p></div>
           </div>
           </div>
           <div className="statisticsGauge">
            <p className='has-text-centered'>Your Total daily energy expenditure:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>2757kcal</p></div>
           </div>
           </div>
             </div>
                </div>


               <div className='accountForm homeCards' id='homePageNotUpdatedMealplan'>
               <h1 className='title has-text-centered'>Meal Plan</h1>
               <p className='has-text-justified' >A meal plan is the main feature of Healthy Recipes. One-click will bring you the 
               daily meal plan to support your weight goal. It will also automatically include all your dietary needs. Only looking for 
               breakfast? Lunch? Dinner? Just select what you'd prefer and enjoy your meal.
                 </p>
               </div>
              
              
               </div>   
           )}
             

      </div>  
      )
}

export default Dashboard