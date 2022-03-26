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
    

  return (
<div className='section container dashboard'>
      <h1>Dashboard</h1>
      <h2>Your BMI:</h2>
      <div className='bmiChart'><GaugeChart 
        id="gauge-chart5"
         nrOfLevels={100}
         arcsLength={[0.915, 0.315, 0.25, 0.25, 0.75]}
         colors={[ '#33caff', '#33fe3a', '#fdfb08', '#fb8502', '#fe3135']}
         percent={bmiValue/50}
         /* hideText={true} */
         formatTextValue={ bmiValue => bmiStatus }
         textColor={"#000000"}
         arcPadding={0.02} />
           </div>
      </div>  
      )
}

export default Dashboard