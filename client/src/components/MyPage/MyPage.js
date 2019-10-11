import React, {useEffect} from 'react';

function MyPage({onGetUserInfo}) {
    useEffect(() => {
        onGetUserInfo()
    });
    return (
        <div>

        </div>
    );
}

export default MyPage;