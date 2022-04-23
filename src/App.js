import './index.css'
import "../node_modules/bulma/css/bulma.css"
import { useState, useEffect } from 'react'
import { supabase } from './components/supabaseClient'
import Auth from './components/Auth'
import Footer from './components/Footer'
import Home from './pages/Home'

export default () => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <>
     
      {!session ? <Auth /> : <div className='mainDiv'>
      <Home key={session.user.id} session={session} />
       <Footer />
       </div>}
    </>
  )
}