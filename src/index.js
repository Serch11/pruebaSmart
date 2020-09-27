import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Home from './Home'
import 'bootstrap/dist/css/bootstrap.css'
import {Auth0Provider} from '@auth0/auth0-react';
import Profile from './components/Profile';
import About from './About';

ReactDOM.render(
  <Auth0Provider
  domain="dev-mol4tkif.us.auth0.com"
  clientId="KHqtvX0XgIGA6JztVCsbqXfrfEUUyDxZ"
  redirectUri={window.location.origin}
  > 
  <About/>
  </Auth0Provider> 
 ,
  document.getElementById('root')
);

