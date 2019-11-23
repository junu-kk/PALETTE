import React from 'react'
import Main from '../../components/Main';

import axios from 'axios';

import {signIn} from '../../modules/authentication';

const MainContainer = ({history}) => {
    const handleSignIn = async (email, password) => {
        try {
            await signIn(email, password);
        } catch(error) {
            alert('fuck you!');
            console.log(error.response.status)
        }

        history.push('/mypage')
    };

    const handleSignUp = (firstName, lastName, email, password) => {
        return axios.post('http://127.0.0.1:5000/signup', {email: email, password: password, firstName: firstName, lastName: lastName}).then(response => {
            console.log(response.data);
            axios.post('http://127.0.0.1:5000/login',{email:email, password: password}).then(response => {
                console.log(response.data);
                sessionStorage.setItem(
                    'token',
                    `Bearer ${response.data.token}`
                );
                alert(response.data.token);
                return response;
            }).catch(error => {
                console.log(error);
                alert('Why does it fail even though I succeed sign up?');
                throw error;
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