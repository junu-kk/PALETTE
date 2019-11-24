import axios from 'axios';

import React from 'react';
import FirstSignIn from '../../components/FirstSignIn';

const FirstSignInContainer = ({history}) => {
    const handleSubmit = (dateOfBirth, address, introduction, grade, _class, workExperience, funFacts) => {
        const token = sessionStorage.getItem('token');
        return axios.post('http://127.0.0.1:5000/user/update/',{dob:dateOfBirth, address:address, introduce:introduction, grade:grade, class: _class, work_exp:workExperience, fun_facts: funFacts},
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

    return(<FirstSignIn onSubmit={handleSubmit}/>)
};

export default FirstSignInContainer;