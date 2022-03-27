import React from 'react'
import { Link } from "react-router-dom"

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
  <li><Link to="/">Home</Link></li>
<li><Link to="/recipes">Recipes</Link></li>
  </ul>
  <p className="menu-label">
    Administration
  </p>
  <ul className="menu-list">
    <li><Link to="/mealplan">Meal plan</Link></li>
    <li>
    <Link to="/account">Account</Link></li>
    <li><Link to="/search">Search Food Nutrition</Link></li>
  </ul>
</aside>
  )
}

export default Menu