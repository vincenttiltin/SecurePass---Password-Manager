import './App.css';
import { Home } from "../pages/Home";
import { About } from "../pages/About";
import { Facts } from "../pages/Facts";
import { Contact } from "../pages/Contact";
import { SignUp } from "../pages/SignUp";
import { MainLayout } from '../layouts/MainLayout';
import { Route, Routes, Navigate } from "react-router-dom";
import { UserError } from 'pages/UserError';
import { SystemError } from 'pages/SystemError';
import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Profile } from './Profile';
import { AddProfile } from './AddProfile';

const LoggedInContext = createContext({
  isLoggedIn: false,
  setIsLoggedIn: () => { },
});

/**
 * Get JSX App Routes
 * @returns JSX elements representing possible routes
 */
function App() {
  useEffect(() => {
    async function checkForLoggedIn() {
      try {
        /** Call auth, passing cookies to the back-end */
        const response = await fetch("http://localhost:1339/session/auth", { method: "GET", credentials: "include" });
        if (response.status === 200) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false); // may be unnecessary, but do this just in case to be more secure
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    }
    checkForLoggedIn();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedInValueAndSetter = [isLoggedIn, setIsLoggedIn];

  return (
    <div className="App">
      <LoggedInContext.Provider value={loggedInValueAndSetter}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='/profile/new'element={<AddProfile/>}/>
            <Route path='profile' element= {<Profile/>}/>
            <Route path="about" element={<About />} />
            <Route path="facts" element={<Facts />} />
            <Route path="contact" element={<Contact />} />
            <Route path="signup" element={<SignUp/>} />
            <Route path="usererror" element={<UserError />} />
            <Route path="systemerror" element={<SystemError />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </LoggedInContext.Provider>
    </div >
  );
}

export default App;
export { LoggedInContext };
