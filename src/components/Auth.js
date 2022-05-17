import { useState } from 'react'
import { supabase } from './supabaseClient'
import Swal from '../../node_modules/sweetalert2/dist/sweetalert2.js'
import cooking from "../images/cooking.jpg"


export default function Auth() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [style, setStyle] = useState(false)

  const pwregex=  /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;



  const handleSignup = async (e) => {
    e.preventDefault()
    if(password.match(pwregex)){

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
      /* Swal.fire({
        title: 'Success!',
        text:  "Check your email for confirmation link.",
        icon: 'success',
        confirmButtonText: 'OK'
      }) */
    } catch (error) {
     Swal.fire({
        title: 'Error!',
        text:  error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      })
    } finally {
      setLoading(false)
    }
  } 
  }
  else{
    Swal.fire({
      title: 'Error!',
      text:  "Password must include min. 8 characters, one Uppercase letter, number and special character",
      icon: 'error',
      confirmButtonText: 'OK'
    })
    setPassword("")
    setPasswordConfirm("")
  }}

  const handleLogin = async (e) => {
    e.preventDefault()
   
    
    try {
      setLoading(true)
      
        const { error } = await supabase.auth.signIn({ email, password })
    
      if (error) throw error
    } catch (error) {
     Swal.fire({
        title: 'Error!',
        text:  [error.message, " please try again"],
        icon: 'error',
        confirmButtonText: 'OK'
      })
      setEmail("")
      setPassword("")
    } finally {
      setLoading(false)
    }
  }
return (
    <div>
<div className='auth'>
  </div>
   <section className="container" id='loginPage'>
    <div className="loginTextContent">
    <h1 className='loginMainTitle'><span id="healthy">Healthy</span> <span id='recipes'>Recipes</span></h1>
    <p className='loginDescription'>
    <i className="fas fa-angle-right" style={{"color":"yellow"}}></i>
    <i className="fas fa-angle-right" style={{"color":"yellow"}}></i>
    <i className="fas fa-angle-right" style={{"color":"yellow"}}></i>
    {` The Ideal recipes for your Fitness goal`}</p>
    </div>
                <div id='loadingForm'> 
                <div className="signupFormCentered">
                  <h1 className='loginTitle' style={ style ? { display:''} : {display : 'none'} }>Sign up</h1>
                  <h1 className='loginTitle' style={ !style ? { display:''} : {display : 'none'} }>Sign in</h1>
                <form onSubmit={handleSignup}  style={ style ? { display:''} : {display : 'none'} }>
                  <div className="field">
                   <label className="loginLabel" htmlFor="email">email</label>
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
                                <label className="loginLabel" htmlFor="password">password</label>
                                <div className="control has-icons-left">
                                    <input
                                    id='password'
                                    className="input"
                                    type="password"
                                    required
                                    placeholder="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)
                                   }
                                    />
                                    <span className="icon is-small is-left">
                                    <i className="fas fa-key"></i>
                                    </span>
                                </div>
                                </div>

                                <div className="field">
                                <label className="loginLabel" htmlFor="passwordConfirm">confirm password</label>
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
                             
                <div className='signupFormCentered'>
                <form onSubmit={handleLogin} style={ !style ? { display:''} : {display : 'none'} }>
                  <div className="field">
                   <label className="loginLabel" htmlFor="email">email</label>
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
                                <label className="loginLabel" htmlFor="password">password</label>
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
                                 </div>
                               
                        </section>
                        
                        </div>
          )}

 