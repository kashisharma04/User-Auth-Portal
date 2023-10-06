import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './Navigation';
import SignupPage from './pages/Signup';
import SigninPage from './pages/Signin';
import SignoutPage from './pages/Signout';
import Notelist from './pages/Notelist'

import './App.css';

function App() {
  return (
    <Router>
     <div>
        <NavigationBar />
        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signout" element={<SignoutPage />} />
          <Route path="/notelist" element={<Notelist />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// import {getDatabase, ref, set} from 'firebase/database';

//const db = getDatabase(app) //db is instance to interact with f-db
