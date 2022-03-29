import React from 'react'
import { NavLink } from "react-router-dom"

const Menu = () => {
  return (
    /* <div classNameName='menu'>
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
        </div> */
        <aside className="menu">
  <p className="menu-label">
    General
  </p>
  <ul className="menu-list">
  <li><NavLink activeclassname="active" to="/">Home</NavLink></li>
<li><NavLink activeclassname="active" to="/recipes">Recipes</NavLink></li>
  </ul>
  <p className="menu-label">
    Administration
  </p>
  <ul className="menu-list">
    <li><NavLink activeclassname="active" to="/mealplan">Meal plan</NavLink></li>
    <li>
    <NavLink activeclassname="active" to="/account">Account</NavLink></li>
    <li><NavLink activeclassname="active" to="/search">Search Food Nutrition</NavLink></li>
  </ul>
</aside>
  )
}

export default Menu