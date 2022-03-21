import { useState } from 'react'
import { supabase } from './supabaseClient'
import Swal from 'sweetalert2/dist/sweetalert2.js'



export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    if(password!==passwordConfirm){
        
        Swal.fire({
            title: 'Error!',
            text: 'Unmatching passwords. Please try again',
            icon: 'error',
            confirmButtonText: 'OK'
          })
        setPassword("")
        setPasswordConfirm("")
    }
    else{
    try {
      setLoading(true)
      
        const { error } = await supabase.auth.signUp({ email, password })
    
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }}

  return (

    <section className="section container">
         {loading ? (
          'Sending magic link...'
        ) : (
     <form onSubmit={handleLogin}>
         {/*  <h1 className="title" id="contact">Sign Up</h1> */}
                  <div className="field">
                   <label className="label" htmlFor="email">email</label>
                      <div className="control has-icons-left">
                                    <input
                                    id='email'
                                    className="input"
                                    type="email"
                                    required
                                    placeholder="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-envelope"></i>
                                    </span>
                                </div>
                                </div>

                                <div className="field">
                                <label className="label" htmlFor="password">password</label>
                                <div className="control has-icons-left">
                                    <input
                                    id='password'
                                    className="input"
                                    type="password"
                                    required
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                </div>

                                <div className="field">
                                <label className="label" htmlFor="passwordConfirm">password</label>
                                <div className="control has-icons-left">
                                    <input
                                    id='passwordConfirm'
                                    className="input"
                                    type="password"
                                    required
                                    placeholder="password"
                                    value={passwordConfirm}
                                    onChange={(e) => setPasswordConfirm(e.target.value)}
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                </div>
                                    <button className="button mt-3 is-primary" aria-live="polite">
                                        Sign Up
                                        </button>
                                 </form>
           )}
       
         </section>
          )
        }

    {/* <section className="section container">
    <div className="row flex flex-center">
      <div className="col-6 form-widget" aria-live="polite">
        <h1 className="title">Healthy Recipes</h1>
        <h3 className="title">Sign Up</h3> */}
       {/*  {loading ? (
          'Sending magic link...'
        ) : ( */}
         /*  <form onSubmit={handleLogin}>
            <label className="label" htmlFor="email">email</label>
            <input
              id="email"
              className="input"
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className='label' htmlFor="password">password</label>
            <input
              id="password"
              className="input"
              type="password"
              placeholder="Your email"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="button mt-3 is-primary" aria-live="polite">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
    </section> */
 