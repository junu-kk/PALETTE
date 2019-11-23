import axios from 'axios';

import React, {useEffect} from 'react';
import FirstSignIn from '../../components/FirstSignIn';
import {isAuthenticated} from "../../modules/authentication";

const FirstSignInContainer = ({history}) => {
    useEffect(() => {
        if(!isAuthenticated()) {
            alert('You\'re not logged in!');
            history.push('')
        }
    },[]);

    const handleSubmit = (dateOfBirth, address, introduction, grade, _class, workExperience, funFacts) => {
        const token = sessionStorage.getItem('token');
        alert(token)
        return axios.post('http://127.0.0.1:5000/user/update/',{dob:dateOfBirth, address:address, bio:introduction, grade:grade, class: _class, work_exp:workExperience, fun_facts: funFacts},
            {
                headers:{
                    'Authorization': token
                }
            })
            .then(response => {
                console.log(response);
                history.push('/mypage');
                return response
            }).catch(error => {
                console.log(error);
                alert('Submit failed. Please check your field')
            })
    };

    const handleSkip = () => {
        history.push('/mypage');
    }

    return(<FirstSignIn onSubmit={handleSubmit} onSkip={handleSkip}/>)
};

export default FirstSignInContainer;