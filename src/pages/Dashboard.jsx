import React, {useEffect, useState} from 'react'
import { supabase } from '../components/supabaseClient'
import GaugeChart from 'react-gauge-chart'



const Dashboard = ({session}) => {

    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [gender, setGender] = useState(true)
    const [sex, setSex] = useState(null)
    const [age, setAge] = useState(null)
    const [bmiValue, setBmiValue] = useState(0)

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
          setLoading(true)
          const user = supabase.auth.user()
    
          let { data, error, status } = await supabase
            .from('profiles')
            .select(`username, weight, height, age, gender, sex, bmiValue`)
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
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
      }

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
      let LBM;
      let BMR;
      let TDEE;

      if(sex === "man"){
          LBM = ((0.407 * weight) + (0.267 * height)) -19.2
      }
      else{
        LBM = ((0.252 * weight) + (0.473 * height)) -48.3
      }

     BMR = 500 + (22 * LBM);
     TDEE = 1.55 * BMR;
      
      console.log(LBM);  

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
           <h2>{`Your Body Mass Index is ${bmiValue}`}</h2><br/>
           <p>The body mass index (BMI) is a measure that uses your height and weight to work out if your weight is healthy.
               The BMI calculation divides an adult's weight in kilograms by their height in metres squared.
                For example, A BMI of 25 means 25kg/m2.
</p><br/>
           <h2>{`Your Lean Body Mass is ${LBM}kg`}</h2><br/>
           <p>Lean body mass (LBM) is a part of body composition
                that is defined as the difference between total body weight and body fat weight.
                 This means that it counts the mass of all organs except body fat,
                including bones, muscles, blood, skin, and everything else.
                 This App uses Boers Formula for calculating the Lean body mass.</p><br/>
           <h2>{`Your Basal Metabolic Rate is ${BMR}kcal`}</h2><br/>
           <p>BMR is just the number of calories your body burns at rest and
                does not account for the calories you need to walk, talk, exercise, etc. </p><br/><br/>
           <h2>{`Your Total Daily Energy Expenditure (TDEE) is ${TDEE}kcal`}</h2><br/>
           <p> TDEE is a number of calories which you should cuncume to maintain your body weight
               considering your body measurements and level of daily activities.</p>     


      </div>  
      )
}

export default Dashboard