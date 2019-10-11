import axios from 'axios';
import React from 'react';

import MenuBar from '../../components/MenuBar';

const MenuBarContainer = ({history}) => {
    const handleSignOut = () => {
        axios.post('http://127.0.0.1:5000/logout').then(response => {
            console.log(response);
            history.push('/');
            return response;
        }).catch(error => {
            console.log(error);
            alert("Sign out failed. I'm a bad developer...");
            throw error;
        })
    };

    return (<MenuBar onSignOut={handleSignOut}/>)
};

export default MenuBarContainer;