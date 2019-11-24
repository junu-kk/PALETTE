import axios from 'axios';
import React from 'react';

import MenuBar from '../../components/MenuBar';

const MenuBarContainer = ({history}) => {
    const handleSignOut = () => {
        sessionStorage.removeItem('token');
        history.push('/')
    };

    return (<MenuBar onSignOut={handleSignOut}/>)
};

export default MenuBarContainer;