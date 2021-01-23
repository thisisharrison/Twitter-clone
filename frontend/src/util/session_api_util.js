import axios from 'axios';

// Create a setAuthToken method to either set or delete the common header dependent on whether the token is passed into our method
// Only have to do this once upon login (or when the user refreshes the page when we check to make sure the token has not expired)
// Pass falsey when user logs out or token has expired

export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export const signup = user => {
    return axios.post('/api/users/register', user)
}

export const login = user => {
    return axios.post('/api/users/login', user)
}