import axios from 'axios';
import React from 'react';
import MyPage from '../../components/MyPage';

const MyPageContainer = () => {
    const [userInfo, setUserInfo] = React.useState();

    const getUserInfo = async () => {
        const token = sessionStorage.getItem('token');
        try {
            const temp = await axios.get('http://127.0.0.1:5000/user/my', {
                headers: {
                    'Authorization': token
                }
            });
            console.log(temp);
            setUserInfo(temp)
        } catch(error) {
            console.log(error)
        }
    };

    return (<MyPage onGetUserInfo={getUserInfo} userInfo={userInfo}/>)
};

export default MyPageContainer;