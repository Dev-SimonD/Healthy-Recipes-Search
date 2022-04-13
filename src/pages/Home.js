import React, { useState, useEffect } from 'react'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import { supabase } from '../components/supabaseClient'
import Account from '../components/Account'
import Auth from "../components/Auth"
import SearchFood from './SearchFood.jsx'
import Dashboard from './Dashboard.jsx'
import Recipes from './Recipes.jsx'
import MealPlan from './MealPlan.jsx'
import Recipe from './Recipe.jsx'
import Settings from './Settings.jsx'
import Menu from "../components/Menu.js"


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  NavLink
} from "react-router-dom";


const Home = ({ session }) => {

  const[ burgerMenuActive, setBurgerMenuActive] = useState(false)
  const[ profileMenuActive, setProfileMenuActive] = useState(false)
  const[ darkMode, setDarkMode] = useState(false)



  const handleDarkMode = ((e) => {
    e.preventDefault()
    setDarkMode(!darkMode)
    console.log(darkMode)
  })

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
  console.log(burgerMenuActive)
  return (
     <Router>
      {/* <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipes">Recipes</Link>
            </li>
            <li>
              <Link to="/mealplan">Meal plan</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/search">Search Food Nutrition</Link>
            </li>
          </ul>
        </nav>
        
        </div> */}

<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    {/* <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
    </a> */}
    <NavLink  className="navbar-item" to="/"><h1 className="navbar-item logo">Healthy<span className='logo logoSpan'>Recipes</span></h1></NavLink>
    

    <a id="burgerIcon" role="button" onClick={(e) => {
      e.preventDefault()
      setBurgerMenuActive(!burgerMenuActive)
    }} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className={burgerMenuActive ? "navbar-menu is-active" : "navbar-menu"}>
    <div className="navbar-start" onClick={(e) => {
      e.preventDefault()
      setBurgerMenuActive(false)
  
    }}>
    <NavLink  className="navbar-item nav-link-ltr" to="/">Home</NavLink>
    <NavLink className="navbar-item nav-link-ltr" to="/recipes">Recipes</NavLink>
    <NavLink className="navbar-item nav-link-ltr" to="/account">Account</NavLink>
    <NavLink className="navbar-item nav-link-ltr" to="/mealplan">Meal Plan</NavLink>
    <NavLink className="navbar-item nav-link-ltr" to="/search">Food Search</NavLink>
    <NavLink className="navbar-item nav-link-ltr" to="/settings">Settings</NavLink>
    {/* <button className='button is-primary' onClick={handleDarkMode}>switch</button> */}
    </div>

   {/*  <div class={profileMenuActive ? ("dropdown is-active"): ("dropdown")}>
  <div class="dropdown-trigger">
    <button class="button" onClick={handleProfileClick} aria-haspopup="true" aria-controls="dropdown-menu">
      <span>Profile</span>
    </button>
  </div>
  <div class="dropdown-menu" id="dropdown-menu" role="menu">
    <div class="dropdown-content">
      <a href="#" class="dropdown-item">
        Your Profile
      </a>
      <a class="dropdown-item">
        Settings
      </a>
      <a href="#" class="dropdown-item">
        Some menu stuff
      </a>
      <hr class="dropdown-divider"/>
      <a href="#" class="dropdown-item">
        Sign out
      </a>
    </div>
  </div>
</div> */}

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons logoutbtn">
          {/* <a className="button is-primary">
            <strong>Sign up</strong>
          </a> */}
          <button type="button" className="button" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>{/* <button className='button is-light'>
      Logout<i className="fas fa-sign-out-alt" style={{"cursor":"pointer", "padding": "1rem"}} onClick={() => supabase.auth.signOut()}></i>
      </button> */}

{/*       
 */}        </div>
      </div>
    </div>
  </div>
</nav>

        {/* <div className='cont'> */}
       {/*  <Menu/> */}
      <Routes>
          <Route path="/account" element={!session ? <Auth/> : <Account key={session.user.id} session={session} />}>
          </Route>
          <Route path="/recipes" element={<Recipes key={session.user.id} session={session} />}>
          </Route>
          <Route path="/mealplan" element={<MealPlan key={session.user.id} session={session} />}>
          </Route>
          <Route path="/search" element={<SearchFood key={session.user.id} session={session} />}>
          </Route>
          <Route path="/recipes/:name" element={<Recipe />}>
          </Route>
          <Route path="/settings" element={<Settings />}>
          </Route>
          <Route path="/" element={<Dashboard key={session.user.id} session={session}/>}>
          </Route>
        </Routes>  
        {/* </div> */}    
    </Router>
  )
}


export default Home