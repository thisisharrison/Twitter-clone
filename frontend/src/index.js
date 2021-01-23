import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
// We will create this component shortly
import Root from './components/root';
// We will use this to parse the user's session token
import jwt_decode from 'jwt-decode';
// The session utility we just created
import { setAuthToken } from './util/session_api_util';
// We have not created this action yet, but will do so in the next step
import { logout } from './actions/session_actions';
// Just for testing
import axios from 'axios';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  let store;
  // Returning user and has session token stored in local storage
  if (localStorage.jwtToken) {
    // Set auth token as common header for all axios requests
    setAuthToken(localStorage.jwtToken);
    // Get user's info
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // Create preload state object
    const preloadedState = {
      session: {
        isAuthenticated: true,
        user: decodedUser
      }
    }
    store = configureStore(preloadedState);
    // Check if token has expired
    const currentTime = Date.now() / 1000;
    if (decodedUser.exp < currentTime) {
      // Logout user
      store.dispatch(logout());
      window.location.href = '/login';
    }
  } else {
    // First time user
    store = configureStore();
  }
  ReactDOM.render(<Root store={store} />, root);
  window.axios = axios;
});