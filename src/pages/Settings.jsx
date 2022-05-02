import React from 'react'
import { supabase } from '../components/supabaseClient'


const Settings = () => {
  return (
    <div>
      <div className='accountForm' id='settingsMain'>
        <h1 className='title has-text-centered'>Settings</h1>
        <div className='settingsButtons'>
        <p>Metric vs Imperial</p>
        <button>Metric</button>
        <p>Toggle dark mode</p>
        <button>Theme</button>
        <p>Change password</p>
        <button>Password</button>
        <button type="button" className="button settingsButton" onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
      </div>
        </div>
    </div>
  )
}

export default Settings