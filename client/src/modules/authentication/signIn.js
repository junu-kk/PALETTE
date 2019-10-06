import axios from 'axios';

function signInAPI(email, password) {
    return axios.post('http://127.0.0.1:5000/login/', {email: email, password: password});
}

const initialState = {
    isFetching: false,
    isSuccess: false
}

const SIGN_IN_REQUEST = 'SIGN_IN_REQUEST';
const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS';
const SIGN_IN_FAILURE = 'SIGN_IN_FAILURE';
const SET_SIGN_IN_STATUS = 'SET_SIGN_IN_STATUS';

export const signInRequest = () => ({
    type: SIGN_IN_REQUEST,
});

export const signInSuccess = () => ({
    type: SIGN_IN_SUCCESS,
});

export const signInFailure = () => ({
    type: SIGN_IN_FAILURE,
});

export const setSignInStatus = (isSuccess) => ({
    type: SET_SIGN_IN_STATUS,
    isSuccess,
});

//FIXME: console.log 나중에 삭제
export const signIn = (email, password) => dispatch => {
    dispatch(signInRequest());
    return signInAPI(email, password).then(response => {
        dispatch(signInSuccess());
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
        alert('sign in failed. please check your email or password.');
        dispatch(signInFailure());
        throw(error);
    })
};

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SIGN_IN_REQUEST:
            return {
                ...state,
                isFetching: true,
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccess: true
            }
        case SIGN_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
            };
        case SET_SIGN_IN_STATUS:
            return {
                ...state,
                isSuccess: action.isSuccess
            };
        default:
            return initialState;
    }
}