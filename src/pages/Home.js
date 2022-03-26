import React, { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from '../components/supabaseClient'
import Account from '../components/Account'
import Auth from "../components/Auth"
import SearchFood from './SearchFood.jsx'
import Dashboard from './Dashboard.jsx'
import Recipes from './Recipes.jsx'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


const Home = ({ session }) => {

  //const [account, setAccount] = useState(false);
/*   const [tutorial, setTutorial] = useState(false)
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    getTutorialInfo()
  }, [])

  const getTutorialInfo = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`tutorial`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTutorial(data.tutorial)
        console.log("data.tutorial", data.tutorial)
      }
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  console.log("first tutorial boolean", tutorial)

    const handleSkip = async (e) => {
      e.preventDefault()
      setTutorial(true)

      try {
       // setLoading(true)
        const user = supabase.auth.user()
        
        const updates = {
          id: user.id,
          tutorial,
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
        //setTutorial(true)
      }
      Swal.fire({
          title: 'Success!',
          text: 'Enjoy the app',
          icon: 'success',
          confirmButtonText: 'OK'
        })
    } */
    

  /* useEffect(() => {
    getProfile()
  }, [session])
 */
  /* const getProfile = async () => {
    try {
      setLoading(true)
      const user = supabase.auth.user()

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, weight, height, age`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setWeight(data.weight)
        setHeight(data.height)
        setAge(data.age)
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
        website,
        avatar_url,
        weight,
        height,
        age,
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
  } */

  return (
     <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/search">Search Food Nutrition</Link>
            </li>
          </ul>
        </nav>
        </div>
      <Routes>
          <Route path="/account" element={!session ? <Auth/> : <Account key={session.user.id} session={session} />}>
          </Route>
          <Route path="/recipes" element={<Recipes key={session.user.id} session={session} />}>
          </Route>
          <Route path="/search" element={<SearchFood key={session.user.id} session={session} />}>
          </Route>
          <Route path="/" element={<Dashboard key={session.user.id} session={session}/>}>
          </Route>
        </Routes>      
    </Router>
  )
}


export default Home