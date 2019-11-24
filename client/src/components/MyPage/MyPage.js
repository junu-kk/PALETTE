import React, {useEffect} from 'react';

function MyPage({onGetUserInfo, userInfo}) {
    useEffect(() => {
        onGetUserInfo()
    },[]);
    return (
        <div>

        </div>
    );
}

export default MyPage;