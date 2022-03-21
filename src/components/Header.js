import React from 'react'

const Header = () => {
  return (
    <section className="hero is-primary is-medium">
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
                  <span>Sign Up</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <div className="hero-body">
      <div className="container has-text-centered">
        <p className="title">Sign Up</p>
        <p className="subtitle"></p>
      </div>
    </div>
  </section>
  )
}

export default Header