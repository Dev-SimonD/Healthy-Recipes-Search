/* import React from 'react'
import Login from './components/Login'
import "./App.css"

const App = () => {
  return (
    <div className='container'>
      <Login />
    </div>
  )
}

export default App */

import './index.css'
import { useState, useEffect } from 'react'
import { supabase } from './components/supabaseClient'
import Auth from './components/Auth'
import Account from './components/Account'

export default () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? <Auth /> : <Account key={session.user.id} session={session} />}
    </div>
  )
}