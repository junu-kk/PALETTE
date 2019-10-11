import React from 'react'
import Main from '../../components/Main';

import axios from 'axios';

const MainContainer = ({history}) => {
    const handleSignIn = (email, password) => {
        return axios.post('http://127.0.0.1:5000/login', {email: email, password: password}).then(response => {
            console.log(response.data);
            history.push('/mypage');
            return response;
        }).catch(error => {
            console.log(error);
            alert('Sign in failed. Please check your email or password.');
            throw error;
        })
    };

    const handleSignUp = (firstName, lastName, email, password) => {
        return axios.post('http://127.0.0.1:5000/signup', {email: email, password: password, fname: firstName, lname: lastName}).then(response => {
            console.log(response.data);
            axios.post('http://127.0.0.1:5000/login',{email:email, password: password}).then(response => {
                console.log(response.data);
                return response;
            }).catch(error => {
                console.log(error);
                alert('Why does it fail even though I succeed sign up?');
            });
            history.push('/firstsignin');
            return response;
        }).catch(error => {
            console.log(error);
            alert('Sign up failed. Please check fields you filled in.');
            throw error;
        })
    };

    return (<Main onSignIn={handleSignIn} onSignUp={handleSignUp}/>)
};

export default MainContainer;