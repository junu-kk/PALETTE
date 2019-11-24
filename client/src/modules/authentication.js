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
}

// const handleSignUp = (firstName, lastName, email, password) => {
//     return axios.post('http://127.0.0.1:5000/signup', {email: email, password: password, firstName: firstName, lastName: lastName}).then(response => {
//         console.log(response.data);
//         axios.post('http://127.0.0.1:5000/login',{email:email, password: password}).then(response => {
//             console.log(response.data);
//             sessionStorage.setItem(
//                 'token',
//                 `Bearer ${response.data.token}`
//             );
//             alert(response.data.token);
//             return response;
//         }).catch(error => {
//             console.log(error);
//             alert('Why does it fail even though I succeed sign up?');
//             throw error;
//         });
//         history.push('/firstsignin');
//         return response;
//     }).catch(error => {
//         console.log(error);
//         alert('Sign up failed. Please check fields you filled in.');
//         throw error;
//     })
// };

export const isAuthenticated = () => {
    return sessionStorage.getItem('token') !== null;
};