import React from 'react'
import logout from "../images/logout.png"
import { supabase } from './supabaseClient'

const Header = ({session}) => {
  return (
    /* <section className="hero is-primary is-medium">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
            <a className="navbar-item">
              <h1 className="title" id="home">Healthy Recipes</h1>
            </a>
            <span className="navbar-burger" data-target="navbarMenuHeroA">
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
          <div id="navbarMenuHeroA" className="navbar-menu">
            <div className="navbar-end">
              <a className="navbar-item is-active" href="#home"> Home </a>
              <a className="navbar-item" href="#aboutus"> About Us </a>
              <a className="navbar-item" href="#ourteam"> Contact Us </a>
              <span className="navbar-item">
                <a className="button is-primary is-inverted" href="#contact">
                  <span className="icon">
                    <i className="fas fa-envelope"></i>
                  </span>
               </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="subtitle"></p>
      </div>
    </div>
  </section> */
  <section className="hero is-primary is-medium">
    <div className="hero-head">
      <nav className="navbar">
        <div className="container">
          <div className="navbar-brand">
              <h1 className="title" id="home">Healthy Recipes</h1>
              <button type="button" className="button is-danger is-light" onClick={() => supabase.auth.signOut()}>
        Log Out
      </button>
          </div>
        </div>
        z
      </nav>
    </div>
  </section>
  )
}

export default Header