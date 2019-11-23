import axios from 'axios';
import React, {useEffect} from 'react';
import MyPage from '../../components/MyPage';
import {isAuthenticated} from "../../modules/authentication";

const MyPageContainer = ({history}) => {
    useEffect(()=>{
        if(!isAuthenticated()) {
            alert('You\'re not logged in!');
            history.push('/')
        }
    },[]);

    const [userInfo, setUserInfo] = React.useState();

    const getUserInfo = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const temp = await axios.get('http://127.0.0.1:5000/user/my', {
                headers: {
                    'Authorization': token
                }
            });
            setUserInfo(temp.data)
        } catch(error) {
            console.log(error)
        }
    };

    return (<MyPage onGetUserInfo={getUserInfo} userInfo={userInfo}/>)
};

export default MyPageContainer;