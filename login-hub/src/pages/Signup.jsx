import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../firebase'; 

const auth = getAuth(app);

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async () => {
    try{
     createUserWithEmailAndPassword(auth, email, password)
     .then(value=>alert('Success')) .catch((error)=>console.log(error))
    }catch(error){
        console.error("Signup Error",error)
    }
    }


  return (
    <div className="signup-Page">
        <h2>User Sign Up Page</h2>
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
        type="password"
        placeholder="Enter your Password"
        required
      />

      <button onClick={createUser}>Signup</button>
      </form>
    </div>
  );
  };

export default SignupPage;
