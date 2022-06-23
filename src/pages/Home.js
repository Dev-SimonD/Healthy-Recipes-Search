import React, { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'
import Auth from "../components/Auth"
import Dashboard from './Dashboard.jsx'
import Recipes from './Recipes.jsx'
import MealPlan from './MealPlan.jsx'
import Recipe from './Recipe.jsx'
import Profile from './Profile.jsx'
import Settings from './Settings.jsx'


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

  console.log(burgerMenuActive)
  return (
     <Router>
      
<nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <NavLink  className="navbar-item navbar-desktop navbar-mobile-logo" to="/"><h1 className="navbar-item logo">Healthy<span className='logo logoSpan'>Recipes</span></h1></NavLink>
    <NavLink  className="navbar-item navbar-mobile nav-link-ltr" to="/"><div className='mobile-menu-item'><i className="fas fa-house-user"></i><p /* style={{"display":"none"}} */>Home</p></div></NavLink>
    <NavLink className="navbar-item navbar-mobile nav-link-ltr" to="/recipes"><div className='mobile-menu-item'><i class="fa-solid fa-magnifying-glass"></i><p /* style={{"display":"none"}} */>Search</p></div></NavLink>
    <NavLink className="navbar-item navbar-mobile nav-link-ltr" to="/mealplan"><div className='mobile-menu-item'><i className="fas fa-calendar"></i><p /* style={{"display":"none"}} */>Meal Plan</p></div></NavLink>
    <NavLink className="navbar-item navbar-mobile nav-link-ltr" to="/profile"><div className='mobile-menu-item'><i className="fas fa-user"></i><p /* style={{"display":"none"}} */>Profile</p></div></NavLink>
    <NavLink className="navbar-item navbar-mobile nav-link-ltr" to="/settings"><div className='mobile-menu-item'><i className="fas fa-gear"></i><p /* style={{"display":"none"}} */>Settings</p></div></NavLink>

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
    <NavLink  className="navbar-item navbar-desktop nav-link-ltr" to="/">Home</NavLink>
    <NavLink className="navbar-item navbar-desktop nav-link-ltr" to="/recipes">Recipes</NavLink>
    <NavLink className="navbar-item navbar-desktop nav-link-ltr" to="/mealplan">Meal Plan</NavLink>
    <NavLink className="navbar-item navbar-desktop nav-link-ltr" to="/profile">Profile</NavLink>
    </div>

      <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons logoutbtn">
         <button type="button" className="button mr-3" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>

        </div>
      </div>
    </div>
  </div>
</nav>
      <Routes>
          <Route path="/profile" element={!session ? <Auth/> : <Profile key={session.user.id} session={session} />}>
          </Route>
          <Route path="/recipes" element={<Recipes key={session.user.id} session={session} />}>
          </Route>
          <Route path="/mealplan" element={<MealPlan key={session.user.id} session={session} />}>
          </Route>
          <Route path="/recipes/:name" element={<Recipe />}>
          </Route>
          <Route path="/settings" element={<Settings />}>
          </Route>
          <Route path="/" element={<Dashboard key={session.user.id} session={session}/>}>
          </Route>
        </Routes>  
          
    </Router>
  )
}


export default Home