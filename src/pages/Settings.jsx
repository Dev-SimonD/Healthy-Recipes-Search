import React, { useState, useEffect } from 'react'
import { supabase } from '../components/supabaseClient'


const Settings = () => {

  
  return (
    <div>
      <div className='accountForm' id='mealPlanAccountForm' >
        <h1 className='title has-text-centered'>Settings</h1>
        <div className='settingsButtons'>
        <div className='pb-5' id="settingsContentButton">
        <p>Theme</p>
        <button type="button" className="button settingsButton">Light</button>
        <p>Reset password</p>
        <button type="button" className="button settingsButton">Reset</button>
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