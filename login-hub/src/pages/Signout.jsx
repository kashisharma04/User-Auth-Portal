import React from 'react';
import { getAuth, signOut } from 'firebase/auth';

import { app } from '../firebase';
const auth = getAuth(app);

const SignoutPage = () => {
  const signout = async () => {
    try {
      signOut(auth).then(value => alert('Logout Success')) .catch((error)=>console.log(error))
    //   console.log('User logged out successfully');
    } catch (error) {
      console.error('Error', error);
    }
  };

  return (
    <div className="logout">
      <form>
        <h2>Logout Page</h2>
      <button onClick={signout}>Logout</button>
      </form>
    </div>
  );
};

export default SignoutPage;
