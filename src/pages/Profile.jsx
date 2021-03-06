import { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from '../components/supabaseClient'
import GaugeChart from 'react-gauge-chart'
import loadingGif from "../images/loadingGif.gif"





const Profile = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [gender, setGender] = useState(true)
  const [exercise, setExercise] = useState(3)
  const [exerciseType, setExerciseType] = useState("set your exercise level")
  const [sex, setSex] = useState(null)
  const [age, setAge] = useState(null)
  const [bmiValue, setBmiValue] = useState(0)
  const [bmrValue, setBmrValue] = useState(0)
  const [lbmValue, setLbmValue] = useState(0)
  const [spoonData, setSpoonData] = useState(null)
  const [spoonUsername, setSpoonUsername] = useState(null)
  const [spoonPassword, setSpoonPassword] = useState(null)
  const [spoonHash, setSpoonHash] = useState(null)
  const [vegetarian, setVegetarian] = useState(false);
  const [paleo, setPaleo] = useState(false);
  const [ketogenic, setKetogenic] = useState(false);
  const [pescaterian, setPescaterian] = useState(false);
  const [tdeeValue, setTdeeValue] = useState(0);
  const [coef, setCoef] = useState(0);
  const [weightArray, setWeightArray] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [favoritesArray, setFavoritesArray] = useState([]);
  const [weightGoal, setWeightGoal] = useState("keep");


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
        .select(`username, weight, height, age, gender, sex, bmiValue, updated,
         exercise, exerciseType, bmrValue, lbmValue, spoonUsername, spoonPassword, spoonHash,
         vegetarian, paleo, ketogenic, pescaterian, coef, tdeeValue, weightHistory, weightGoal, favoritesArray`)
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
        setUpdated(data.updated)
        setExercise(data.exercise)
        setExerciseType(data.exerciseType)
        setBmrValue(data.bmrValue)
        setLbmValue(data.lbmValue)
        setSpoonUsername(data.spoonUsername)
        setSpoonPassword(data.spoonPassword)
        setSpoonHash(data.spoonHash)
        setVegetarian(data.vegetarian)
        setPaleo(data.paleo)
        setKetogenic(data.ketogenic)
        setPescaterian(data.pescaterian)
        setCoef(data.coef)
        setTdeeValue(data.tdeeValue)
        setWeightHistory(data.weightHistory)
        setWeightGoal(data.weightGoal)
        setFavoritesArray(data.favoritesArray)
        
       

      
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  
  const handleManButton = (e) =>{  
    setSex(e.target.value)
}
const handleWomanButton = (e) =>{
  setSex(e.target.value)

}

const handleVegetarian = () => {
  setVegetarian(!vegetarian);
};

const handlePaleo = () => {
  setPaleo(!paleo);
};
const handleKetogenic = () => {
  setKetogenic(!ketogenic);
};

const handlePescaterian = () => {
  setPescaterian(!pescaterian);
};

const Checkbox = ({ label, value, onChange }) => {
  return (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} />
      {label}
    </label>
  );
};
const handleRange = ((e) => {
  if(e.target.value === "1"){
    setExerciseType("Little or no exercise")
    setCoef(1.2)
  }
  if(e.target.value === "2"){
    setExerciseType("1-3 days per week")
    setCoef(1.375)
  }
  if(e.target.value === "3"){
    setExerciseType("3-5 days per week")
    setCoef(1.55)
  }
  if(e.target.value === "4"){
    setExerciseType("6-7 days per week")
    setCoef(1.725)
  }
  if(e.target.value === "5"){
    setExerciseType("Exercise twice a day")
    setCoef(1.9)
  }
})



  const updateProfile = async (e) => {
    e.preventDefault()

    
   
  let LBM;
  let BMR;

  if(sex === "man"){
      LBM = (((0.407 * weight) + (0.267 * height)) -19.2).toFixed(2)
  }
  else{
    LBM = (((0.252 * weight) + (0.473 * height)) -48.3).toFixed(2)
  }
  setLbmValue(LBM)
  BMR = (500 + (22 * LBM)).toFixed();
  setBmrValue(BMR)

 

const requestOptions = {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ "username": username })
};
fetch(`https://api.spoonacular.com/users/connect?apiKey=${process.env.REACT_APP_API_KEY}`, requestOptions)
  .then(response => response.json())
  .then(data => {
    setSpoonHash(data.hash)
    setSpoonUsername(data.username)
    setSpoonPassword(data.spoonacularPassword)
    console.log(spoonHash, spoonPassword, spoonUsername)
    console.log("hash",spoonHash)
  });

  console.log("hash",spoonHash)
 
    
    try {
      setLoading(true)
      const user = supabase.auth.user()
      let value = weight/((height/100) ** 2);
      let fixedValue = value.toFixed(2);
      console.log("fixed value",fixedValue)
      setBmiValue(fixedValue);

      let tdeeTest = (BMR*coef);
      let tdeeFixed = tdeeTest.toFixed();
  

   
      const updates = {
        id: user.id,
        username,
        weight,
        height,
        age,
        gender,
        sex,
        bmiValue: fixedValue,
        updated: true,
        exercise,
        exerciseType,
        bmrValue: BMR,
        lbmValue: LBM,
        spoonUsername,
        spoonPassword,
        spoonHash,
        vegetarian,
        paleo,
        ketogenic,
        pescaterian,
        coef,
        tdeeValue: tdeeFixed,
        weightGoal,
        favoritesArray,
        
       
        updated_at: new Date(),
      }
       // console.log(bmiValue)
      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      })

      if (error) {
        throw error
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }

   
/*   console.log(TDEE)
 */    
    Swal.fire({
        title: 'Success!',
        text: 'Profile succesfully updated',
        icon: 'success',
        confirmButtonText: 'OK'
      })
  }

  return (

    
      <section className='container'>
    
       {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>) : (
      <div /* className="signupFormCentered" */ id='accountDoubleColumn'>
        <form onSubmit={updateProfile} className="accountForm">
        <div className="field">
          <h1 className="title" id='accountTitle'>Profile</h1>
                   <label className="label" htmlFor="username">Username</label>
                      <div className="control">
              <input
               className="input"
               required
              id="username"
              name='username'
              type="text"
              value={username || ''}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          </div>
 <label className="label" htmlFor="gender">Gender</label>
 <div className="radioButtons">
   <label className='radiobtn'>
<input type="radio"
       value="man"
       name="gender"
       required
       onChange={handleManButton}
       checked={sex === "man"}
       /> Man
       </label>
       <label className='radiobtn'>
<input type="radio" 
       value="woman" 
       name="gender" 
       onChange={handleWomanButton} 
       checked={sex === "woman"}
       /> Woman
       </label>
</div>

<div className="field">
                   <label className="label" htmlFor="exercise">Exercise Level</label>
                      <div className="control">
            <input
              id="exercise"
              className='exerciseRange'
              min="1"
              max="5"
              required
              name='exercise'
              type="range"
              value={exercise || ''}
              onChange={(e) => {
                handleRange(e)
                setExercise(e.target.value)
                 
              
                console.log(e.target.value)
              }}
             
            />
          </div>
          </div>

          <p style={{"textAlign": "center"}}>{exerciseType}</p>


            <div className="field">
                   <label className="label">Diets</label>
                      <div className="control"></div>
                      <div className='dietCheckboxes'>
            <Checkbox
        label=" Vegetarian"
        value={vegetarian}
        onChange={handleVegetarian}
      />
      <Checkbox
        label=" Paleo"
        value={paleo}
        onChange={handlePaleo}
      />
      <Checkbox
        label=" Ketogenic"
        value={ketogenic}
        onChange={handleKetogenic}
      />
      <Checkbox
        label=" Pescaterian"
        value={pescaterian}
        onChange={handlePescaterian}
      />
      </div>
      </div>


          <div className="field">
                   <label className="label" htmlFor="height">Height (cm)</label>
                      <div className="control">
            <input
             className="input"
              id="height"
              min="140"
              max="250"
              step="0.1"
              required
              name='height'
              type="number"
              value={height || ''}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          </div>
          <div className="field">
                   <label className="label" htmlFor="weight">Weight (Kg)</label>
                      <div className="control">
            <input
             className="input"
              id="weight"
              required
              min="40"
              max="250"
              step="0.1"
              type="number"
              name='weight'
              value={weight || ''}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          </div>
          <div className="field">
                   <label className="label" htmlFor="age">Age</label>
                      <div className="control">
            <input
             className="input"
              id="age"
              min="1"
              max="120"
              name='age'
              required
              type="number"
              value={age || ''}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          </div>
          <div className='field'>
          <label className="label" htmlFor="weightGoal">Weight Goal</label>
             {weightGoal==="keep" ? (
          <select onChange={(e)=>{setWeightGoal(e.target.value)}} className="weightGoal" name="weightGoal"id="weightGoal" /* onChange={(e) => setExercise(e.target.value)} */>
             <option value="keep">Keep current weight</option>
             <option value="lose">Lose weight</option>
             <option value="gain">Gain weight</option>  
            </select>
             ): ("")}
              {weightGoal==="lose" ? (
          <select onChange={(e)=>{setWeightGoal(e.target.value)}} className="weightGoal" name="weightGoal"id="weightGoal" /* onChange={(e) => setExercise(e.target.value)} */>
             <option value="lose">Lose weight</option>
             <option value="keep">Keep current weight</option>
             <option value="gain">Gain weight</option>  
            </select>
             ): ("")}
              {weightGoal==="gain" ? (
          <select onChange={(e)=>{setWeightGoal(e.target.value)}} className="weightGoal" name="weightGoal"id="weightGoal" /* onChange={(e) => setExercise(e.target.value)} */>
             <option value="gain">Gain weight</option>  
             <option value="keep">Keep current weight</option>
             <option value="lose">Lose weight</option>
            </select>
             ): ("")}                         
              </div>
         
          <div>
            <button className="button mt-3 is-primary signupBtn" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
        
          
            <div className='accountForm' id='statistics'>
            <h1 className='title' style={{"textAlign": "center"}}>Statistics</h1>
            <div className='statisticsInfo'>
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
            <p style={{"textAlign":"center"}}>Your Total daily energy expenditure:</p>
        <div className='bmiChart'>
           <div className="statisticsCircle"><p className='label'>{` ${(bmrValue*coef).toFixed()}kcal`}</p></div>
           </div>
           </div>
           </div>
           <div id='accordeon'>
               <div className='accordeonItemA'>
                <h1>BMI</h1>
                <p>Body Mass Index is a measure that uses your height and weight to work out if your weight is healthy.
                </p>
              </div>
              <div className='accordeonItemB'>
                <h1>BMR</h1>
                <p>Basal Metabolic Rate Is the amount of calories your body burns performing basic life-sustaining funcitons</p>
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
                   
        </div>)}
       
   </section>
  )
}

export default Profile