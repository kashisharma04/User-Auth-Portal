import React, { useState } from "react";
import { getAuth , signInWithEmailAndPassword } from 'firebase/auth'
import {app} from '../firebase';
const auth = getAuth(app);

const SigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      signInWithEmailAndPassword(auth, email, password)
        .then(value => alert('Login-Success')) .catch((error)=>console.log(error))
    } catch (error) {
      console.error("SignIn Error", error)
    }
  }

  return (
    <div className="signin-Page">
      <h2> Login Page</h2>
      <form>
      <label>Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        placeholder="Enter your Email"
        required
      />

      <label>Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Enter your Password"
        required
      />
      <button onClick={loginUser}>Sign-In</button>
      </form>
    </div>
  )
}
export default SigninPage;