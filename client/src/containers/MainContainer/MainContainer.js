import React from 'react'
import Main from '../../components/Main';

import axios from 'axios';

import {signIn, signUp} from '../../modules/authentication';

const MainContainer = ({history}) => {
    const handleSignIn = async (email, password) => {
        try {
            await signIn(email, password);
            history.push('/mypage')
        } catch(error) {
            alert('Sign In failed. Please check your email or password.');
        }
        // TODO: 여기 try쪽으로 올리기
    };

    const handleSignUp = async (firstName, lastName, email, password) => {
        try {
            await signUp(firstName, lastName, email, password);
            history.push('/firstsignin')
        } catch(error) {
            alert(error.response.message)
        }
    };

    return (<Main onSignIn={handleSignIn} onSignUp={handleSignUp}/>)
};

export default MainContainer;