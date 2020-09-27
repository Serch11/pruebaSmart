import React from 'react'
import Login from './components/LoginButton';
import Logout from './components/LogoutButton'
import Profile from './components/Profile'

function About() {
    return (
      <div>
         <Login />
         <Logout/>
         <Profile/>
      </div>
    );
  }

  export default About;