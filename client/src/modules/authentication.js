import axios from 'axios'

export const signIn = async (email, password) => {
    try {
        const response =  await axios.post('http://127.0.01:5000/login', {email:email, password:password});
        sessionStorage.setItem(
            'token',
            `Bearer ${response.data.token}`
        );
    } catch(error) {
        return Promise.reject(error)
    }
};

export const signOut = () => {
    sessionStorage.removeItem('token')
};

export const signUp = async (firstName, lastName, email, password) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/signup', {email: email, password: password, firstName: firstName, lastName: lastName})
        sessionStorage.setItem(
            'token',
            `Bearer ${response.data.token}`
        );
    } catch(error) {
        return Promise.reject(error);
    }
};

export const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};