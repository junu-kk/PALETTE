import axios from 'axios';
import React from 'react';
import MyPage from '../../components/MyPage';

const MyPageContainer = ({userInfo}) => {
    const getUserInfo = () => {
        return axios.get('http://127.0.0.1:5000/mypage').then(response => {
            console.log(response);
            return response;
        }).catch(error => {
            alert('failed to load user information.');
            throw error;
        })
    };

    return (<MyPage onGetUserInfo={getUserInfo}/>)
};

export default MyPageContainer;