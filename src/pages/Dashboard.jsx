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
/*     const [tdeeValue, setTdeeValue] = useState(0)
 */
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
            .select(`username, weight, height, age, gender, sex,updated, bmiValue, exercise, bmrValue, lbmValue`)
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
           // setTdeeValue(data.tdeeValue)
            setLbmValue(data.lbmValue)
            setUpdated(data.updated)
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

     /*  let bmiStatus;
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
      } */
     /*  let LBM;
      let BMR;
      let TDEE;

      if(sex === "man"){
          LBM = (((0.407 * weight) + (0.267 * height)) -19.2).toFixed(2)
      }
      else{
        LBM = (((0.252 * weight) + (0.473 * height)) -48.3).toFixed(2)
      } */
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

       /*  console.log(exerciseCoef)
      BMR = (500 + (22 * LBM)).toFixed(); */
     TDEE = (exerciseCoef * bmrValue).toFixed();
     console.log("bmi value is", bmiValue)
    }
    else{
      TDEE=0;
    }

    


     /* setTdeeValue(TDEE) */
     
      
  return (
<div className='container'>
       {/* <h1>Dashboard</h1>
      <h2>Your BMI:</h2>
      <div className='bmiChart'><GaugeChart 
        id="gauge-chart5"
         nrOfLevels={100}
         arcsLength={[0.915, 0.315, 0.25, 0.25, 0.75]}
         colors={[ '#33caff', '#33fe3a', '#fdfb08', '#fb8502', '#fe3135']}
         percent={bmiValue/50}
         formatTextValue={ bmiValue => bmiStatus }
         textColor={"#000000"}
         arcPadding={0.02} />
           </div>  */}
           {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>):(
             
             <div>
               {!updated ? (""): (
            <div className='accountForm' id='statistics'>
            <h1 className='title' style={{"textAlign": "center"}}>Statistics</h1>
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
                </div>
                    )}
            
          {/*  <h2>Your Body Mass Index is {loading ? ("loading...") : (`${bmiValue}`)}</h2><br/>
           <p>The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy.
               The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
                For example, A BMI of 25 means 25kg/m2.
</p><br/>
           <h2>Your Lean Body Mass is {loading ? ("loading..."): (`${lbmValue}kg`)}</h2><br/>
           <p>Lean body mass (LBM) is a part of body composition
                that is defined as the difference between total body weight and body fat weight.
                 This means that it counts the mass of all organs except body fat,
                including bones, muscles, blood, skin, and everything else.
                 This App uses Boers Formula for calculating the Lean body mass.</p><br/>
           <h2>Your Basal Metabolic Rate is {loading ? ("loading...") : (`${bmrValue}kcal`)}</h2><br/>
           <p>BMR is just the number of calories your body burns at rest and
                does not account for the calories you need to walk, talk, exercise, etc. </p><br/><br/>
           <h2>Your Total Daily Energy Expenditure (TDEE) is {loading ? ("loading..."): (`${TDEE}kcal`) }</h2><br/>
           <p> TDEE is a number of calories which you should cunsume to maintain your body weight
               considering your body measurements and level of daily activities.</p>   */}
               <div className='accountForm homeCards' id='homePageNotUpdatedWelcome'>
               <h1 className='title has-text-centered'>Welcome to healthy recipes</h1>
               <p className='has-text-justified'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illo voluptate ratione quo!
                  Fuga natus asperiores facilis quisquam? 
                 Perferendis, nemo. Quae recusandae pariatur ipsam veniam doloremque magni
                  eaque corrupti repellendus possimus vero at nobis beatae quidem a nemo eveniet, cum consectetur?
                  Autem facere expedita libero aliquid totam quaerat atque quidem!</p>
               </div>


              {/*  <div id='homeRecipes'> */}
               <div className='accountForm homeCards' id='homePageNotUpdatedRecipes'>
                 <div>
               <h1 className='title has-text-centered'>Recipes</h1>
               <p className='has-text-justified'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illo voluptate ratione quo!
                  Fuga natus asperiores facilis quisquam? 
                 Perferendis, nemo. Quae recusandae pariatur ipsam veniam doloremque magni
                  eaque corrupti repellendus possimus vero at nobis beatae quidem a nemo eveniet, cum consectetur?
                  Autem facere expedita libero aliquid totam quaerat atque quidem!</p>  
                  </div>
                  <div style={{"display":"flex","justifyContent":"center","alignItems":"center"}}>
                    <img id="recipesLogo" src={RecipesLogo} alt="RecipesLogo"/>
                </div>
               </div>
               
               {/*  </div> */}


                {/* <div id='homeStatistics'> */}
                 <div className='accountForm homeCards' id='homePageNotUpdatedStatistics'>
                   
                  
             <div>
               <h1 className='title has-text-centered'>Statistics</h1>
               <p className='has-text-justified' id='statisticsPara'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illo voluptate ratione quo!
                  Fuga natus asperiores facilis quisquam? 
                 Perferendis, nemo. Quae recusandae pariatur ipsam veniam doloremque magni
                  eaque corrupti repellendus possimus vero at nobis beatae quidem a nemo eveniet, cum consectetur?
                  Autem facere expedita libero aliquid totam quaerat atque quidem!</p>
                  </div>

                  <div style={{"minWidth": "40%", "margin":"1rem"}}>
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
               {/* </div> */}
                </div>


               <div className='accountForm homeCards' id='homePageNotUpdatedMealplan'>
               <h1 className='title has-text-centered'>Meal Plan</h1>
               <p className='has-text-justified' >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sint illo voluptate ratione quo!
                  Fuga natus asperiores facilis quisquam? 
                 Perferendis, nemo. Quae recusandae pariatur ipsam veniam doloremque magni
                  eaque corrupti repellendus possimus vero at nobis beatae quidem a nemo eveniet, cum consectetur?
                  Autem facere expedita libero aliquid totam quaerat atque quidem!</p>
               </div>
              
              
               </div>   
           )}
             

      </div>  
      )
}

export default Dashboard