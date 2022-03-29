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
        /* <aside className="menu">
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
</aside> */


<nav class="navbar" role="navigation" aria-label="main navigation">
<div class="navbar-brand">
  <a class="navbar-item" href="https://bulma.io">
    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28"/>
  </a>

  <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
    <span aria-hidden="true"></span>
  </a>
</div>

<div id="navbarBasicExample" class="navbar-menu">
  <div class="navbar-start">
    <a class="navbar-item">
      Home
    </a>

    <a class="navbar-item">
      Documentation
    </a>

    <div class="navbar-item has-dropdown is-hoverable">
      <a class="navbar-link">
        More
      </a>

      <div class="navbar-dropdown">
        <a class="navbar-item">
          About
        </a>
        <a class="navbar-item">
          Jobs
        </a>
        <a class="navbar-item">
          Contact
        </a>
        <hr class="navbar-divider"/>
        <a class="navbar-item">
          Report an issue
        </a>
      </div>
    </div>
  </div>

  <div class="navbar-end">
    <div class="navbar-item">
      <div class="buttons">
        <a class="button is-primary">
          <strong>Sign up</strong>
        </a>
        <a class="button is-light">
          Log in
        </a>
      </div>
    </div>
  </div>
</div>
</nav>
  )
}

export default Menu