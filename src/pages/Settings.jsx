import React, { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'


const Settings = () => {

  /* const [darkTheme, setDarkTheme] = useState(false)

  useEffect(() => {
    document.body.className = localStorage.getItem("colorTheme")
    document.querySelector(".navbar-brand").className = localStorage.getItem("colorTheme")
  }, [darkTheme])

  const handleThemeClick = ((e) =>{
    e.preventDefault()
    setDarkTheme(!darkTheme)
    

  })
  if(darkTheme){

    window.localStorage.setItem("colorTheme", "greyTheme");
  }
  else{
    window.localStorage.setItem("colorTheme", "whiteTheme");
  } */

  return (
    <div>
      <div className='accountForm' id='mealPlanAccountForm' >
        <h1 className='title has-text-centered'>Settings</h1>
        <div className='settingsButtons'>
        <div>
        <p>Metric vs Imperial</p>
        <button>Metric</button>
        <p>Toggle dark mode</p>
       
        <button>Theme</button>
        <p>Change password</p>
        <button>Password</button>
        </div>
        <button type="button" className="button settingsButton" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
      </div>
        </div>
    </div>
  )
}

export default Settings