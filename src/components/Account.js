import { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from './supabaseClient'
import GaugeChart from 'react-gauge-chart'
import loadingGif from "../images/loadingGif.gif"
import fitness from "../images/fitness.jpg"




const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [updated, setUpdated] = useState(null)
  const [gender, setGender] = useState(true)
  const [exercise, setExercise] = useState(null)
  const [exerciseType, setExerciseType] = useState("set your exercise level")
  const [sex, setSex] = useState(null)
  const [age, setAge] = useState(null)
  const [bmiValue, setBmiValue] = useState(0)
  const [bmrValue, setBmrValue] = useState(0)
  const [lbmValue, setLbmValue] = useState(0)
  //const [bmiStatus, setBmiStatus] = useState("")

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

 /*  0-18.5 0.27 925
  18.5 - 24.9 7.79 325
  25 - 29.9 10  250
  30 - 34.9 10  250
  35 - 50   3.33  750 */
 /*  useEffect(() => {
    getBmi()
    getProfile()
  }, []) */

  /* const getBmi = async () => {
   
      try {
        setLoading(true)
        const user = supabase.auth.user()
  
        let { data, error, status } = await supabase
          .from('profiles')
          .select(`username, weight, height, age, gender, sex`)
          .eq('id', user.id)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
        bmiFunc(data.weight, data.height)
       
  }catch (error) {
   // alert(error.message)
  } finally {
    setLoading(false)
  }
} */

  

  const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, weight, height, age, gender, sex, bmiValue, updated, exercise, exerciseType, bmrValue, lbmValue`)
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
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  /* function bmiFunc (weight, height)  {
    
      let value = weight/((height/100) ** 2);
      let fixedValue = value.toFixed(2);
      console.log(fixedValue);
      setBmiValue(fixedValue)
      return value
    
  } */
  const handleManButton = (e) =>{  
    setSex(e.target.value)
}
const handleWomanButton = (e) =>{
  setSex(e.target.value)

}
const handleRange = ((e) => {
  if(e.target.value === "1"){
    setExerciseType("Little or no exercise")
  }
  if(e.target.value === "2"){
    setExerciseType("1-3 days per week")
  }
  if(e.target.value === "3"){
    setExerciseType("3-5 days per week")
  }
  if(e.target.value === "4"){
    setExerciseType("6-7 days per week")
  }
  if(e.target.value === "5"){
    setExerciseType("Exercise twice a day")
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
/*   let exerciseCoef;
 */  



/*  console.log(BMR)
 console.log(TDEE) */
    
    try {
      setLoading(true)
      const user = supabase.auth.user()
      let value = weight/((height/100) ** 2);
      let fixedValue = value.toFixed(2);
      console.log("fixed value",fixedValue)
      setBmiValue(fixedValue);
   
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
    
    Swal.fire({
        title: 'Success!',
        text: 'Profile succesfully updated',
        icon: 'success',
        confirmButtonText: 'OK'
      })
     // bmiFunc(weight,height)
     
  }

 
  

  return (

    
      <section className='container'>
    
       {loading ? (<div style={{"display":"flex", "justifyContent":"center", "alignItems":"center"}}><img src={loadingGif} alt="loading"/></div>) : (
      <div className="signupFormCentered">
        <form onSubmit={updateProfile} className="accountForm">
        <div className="field">
          <h1 className="title">Profile</h1>
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
         {/*  <div className="field">
                   <label className="label" htmlFor="gender">gender</label>
                      <div className="control"> */}
            {/* <input
               className="input"
              id="gender"
              name='gender'
              type="text"
              value={gender || ''}
              onChange={(e) => setGender(e.target.value)}
            /> */}
             {/* <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
                        <option value={gender}>{gender}</option>
                        <option value={gender == "man" ? "man" : "woman"}>{gender == "man" ? "woman" : "man"}</option>
                       
                      </select>
          </div>
          </div> */}
          {/*  <div style={{"display": "flex" , "flexDirection": "column"}}> */}
          {/* <select name="gender" id="gender" onChange={(e) => setGender(e.target.value)}>
          <option value={gender} disabled>{gender}</option>
  <option value={true}>man</option>
  <option value={false}>woman</option>
</select> */}

{/* {sex == "man" ? <p>your sex is man </p>:<p> your sex is woman </p>}
 */}
 <label className="label" htmlFor="gender">Gender</label>
 <div className="radioButtons">
   <label className='label radiobtn'>
<input type="radio"
       value="man"
       name="gender"
       onChange={handleManButton}
       checked={sex === "man"}
       /> Man
       </label>
       <label className='label radiobtn'>
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

{/* <label className="label" htmlFor="exercise">Exercise Level</label>
          <select className="exercise" name="exercise"id="exercise" onChange={(e) => setExercise(e.target.value)}>
                        <option disabled>{`${exercise}x day`}</option>
                        <option value="1">1x day</option>
                        <option value="2">2x day</option>
                        <option value="3">3x day</option>
                        <option value="4">4x day</option>
                        <option value="5">5x day</option>                       
                      </select> */}
            
          <div className="field">
                   <label className="label" htmlFor="height">Height (cm)</label>
                      <div className="control">
            <input
             className="input"
              id="height"
              min="140"
              max="250"
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
          <div>
            <button className="button mt-3 is-primary signupBtn" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
        {/* <div><p className='label'>{`Your BMI value is ${bmiValue}`}</p></div>
        <div className='bmiChart'><GaugeChart 
        id="gauge-chart5"
         nrOfLevels={100}
         arcsLength={[0.915, 0.315, 0.25, 0.25, 0.75]}
         colors={[ '#33caff', '#33fe3a', '#fdfb08', '#fb8502', '#fe3135']}
         percent={bmiValue/50}
         formatTextValue={ bmiValue => bmiStatus }
         textColor={"#000000"}
         arcPadding={0.02} />
           </div> */}
        </div>)}
{/*         <img src={fitness} alt="fitness"/>
 */}    </section>
  )
}

export default Account