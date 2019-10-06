import axios from 'axios';

function signOutAPI() {
    return axios.post('http://127.0.0.1:5000/logout/');
}

const initialState = {
    isFetching: false,
    isSuccess: false
}

const SIGN_OUT_REQUEST = 'SIGN_IN_REQUEST';
const SIGN_OUT_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_OUT_FAILURE = 'SIGN_IN_FAILURE';

export const signOutRequest = () => ({
    type: SIGN_OUT_REQUEST,
});

export const signOutSuccess = () => ({
    type: SIGN_OUT_SUCCESS,
});

export const signOutFailure = () => ({
    type: SIGN_OUT_SUCCESS,
});

//FIXME: console.log 나중에 삭제
export const signOut = () => dispatch => {
    dispatch(signOutRequest());
    return signOutAPI().then(response => {
        dispatch(signOutSuccess(response));
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
        alert('sign out failed. please check your email or password.');
        dispatch(signOutFailure());
        throw(error);
    })
};

export default function reducer(state=initialState, action) {
    switch (action.type) {
        case SIGN_OUT_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccess: true
            }
        case SIGN_OUT_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state;
    }
}