import { signInWithPopup } from 'firebase/auth'//NECESSARY
import React from 'react'
import { auth, provider } from '../config/firebase'

const Login = () => {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)//GET THE TWO FUNCTIONS EXPORTED FROM THE CONFIG FILE
  }
  return (

    <div>
      <p>Sign in with Google</p>
      <button onClick={signInWithGoogle}></button>
    </div>
  )
}

export default Login