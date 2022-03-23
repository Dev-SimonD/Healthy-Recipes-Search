import { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from './supabaseClient'

const Account = ({ session }) => {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [height, setHeight] = useState(null)
  const [weight, setWeight] = useState(null)
  const [gender, setGender] = useState(true)
  const [sex, setSex] = useState(null)
  const [age, setAge] = useState(null)

  useEffect(() => {
    getProfile()
  }, [session])

  

  const getProfile = async () => {
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

      if (data) {
        console.log(data)
        setUsername(data.username)
        setWeight(data.weight)
        setHeight(data.height)
        setGender(data.gender)
        setAge(data.age)
        setSex(data.sex)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const user = supabase.auth.user()

      const updates = {
        id: user.id,
        username,
        weight,
        height,
        age,
        gender,
        sex,
        updated_at: new Date(),
      }

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
  }

  const handleManButton = (e) =>{  
      setSex(e.target.value)
  }
  const handleWomanButton = (e) =>{
    setSex(e.target.value)

  }

  return (

    
      <section className='container section dashboard'>
    <div aria-live="polite">
     {/*  {loading ? (
       ''
      ) : ( */}
      <div className="signupFormCentered">
        <form onSubmit={updateProfile} className="form-widget">
        <div className="field">
                   <label className="label" htmlFor="username">username</label>
                      <div className="control">
              <input
               className="input"
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
 */}<div className="radioButtons">
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
                   <label className="label" htmlFor="height">height (cm)</label>
                      <div className="control">
            <input
             className="input"
              id="height"
              name='height'
              type="number"
              value={height || ''}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          </div>
          <div className="field">
                   <label className="label" htmlFor="weight">weight (Kg)</label>
                      <div className="control">
            <input
             className="input"
              id="weight"
              type="number"
              name='weight'
              value={weight || ''}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          </div>
          <div className="field">
                   <label className="label" htmlFor="age">age</label>
                      <div className="control">
            <input
             className="input"
              id="age"
              name='age'
              type="number"
              value={age || ''}
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          </div>
          <div>
            <button className="button mt-3 is-primary" disabled={loading}>
              Update profile
            </button>
          </div>
        </form>
        </div>
     {/*  )
     } */}
      <button type="button" className="button mt-3 is-primary" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
    </section>
  )
}

export default Account