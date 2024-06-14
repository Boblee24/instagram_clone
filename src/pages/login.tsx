import { signInWithPopup } from 'firebase/auth'//NECESSARY
import React from 'react'
import { auth, provider } from '../config/firebase'
import { useNavigate } from "react-router-dom"

const Login = () => {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider)//GET THE TWO FUNCTIONS EXPORTED FROM THE CONFIG FILE\
    console.log(result)
    navigate("/")
  }
  return (

    <div>
      <p>Sign in with Google to continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </div>
  )
}

export default Login