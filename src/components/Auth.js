import { useState } from 'react'
import { supabase } from './supabaseClient'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'



export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [style, setStyle] = useState(false)

 

  const handleSignup = async (e) => {
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

  const handleLogin = async (e) => {
    e.preventDefault()
   
    
    try {
      setLoading(true)
      
        const { error } = await supabase.auth.signIn({ email, password })
    
      if (error) throw error
      //alert('Login in...')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      setLoading(false)
    }
  }
  console.log(style)

  return (
<div>
    <section className="section container">
         {loading ? (
          ''
        ) : (
                <div className="signupFormCentered">
                <form onSubmit={handleSignup}  style={ style ? { display:''} : {display : 'none'} }>
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
                                    <button className="button mt-3 is-primary signupBtn" aria-live="polite">
                                        Sign Up
                                        </button>
                                 </form>
                                 </div>
                             )}
                <div className='signupFormCentered'>
                <form onSubmit={handleLogin} style={ !style ? { display:''} : {display : 'none'} }>
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
                                 <button className="button mt-3 is-primary signupBtn" aria-live="polite">
                                        Sign In
                                        </button>
                                       
                                 </form>
                                 <button onClick={() => {
                            setStyle(!style)}} 
                             className="button mt-3 underlineBtn"
                             aria-live='polite'>
                             {!style ? "Don't have an Account? Sign up Here" : "Already have an Account? Sign In here"}
                        </button>
                                 </div>
                                {/*  <button onClick={() => {
                            setStyle(!style)}} 
                             className="button mt-3 signupFormCentered"
                             aria-live='polite'>
                             {!style ? "Don't have an Account? Sign up Here" : "Already have an Account? Sign In here"}
                        </button>  */}
                        </section>
                        
                        </div>
          )}

 