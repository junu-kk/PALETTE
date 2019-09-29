import axios from 'axios';

// TODO: url 나중에 고치기
function signUpAPI(firstName, lastName, email, password) {
    return axios.post('http://127.0.0.1:5000/signup');
}

const initialState = {
    isFetching: false,
}

const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';


export const signUpRequest = () => ({
    type: SIGN_UP_REQUEST,
})

export const signUpSuccess = (response) => ({
    type: SIGN_UP_SUCCESS,
    response
})

export const signUpFailure = () => ({
    type: SIGN_UP_FAILURE,
})

export const signUp = (firstName, lastName, email, password) => dispatch => {
    dispatch(signUpRequest());
    return signUpAPI(firstName, lastName, email, password).then(response => {
        console.log(response);
        dispatch(signUpSuccess(response));
        return response;
    }).catch(error => {
        alert('sign up failed.');
        dispatch(signUpFailure());
        throw(error);
    })
}

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case SIGN_UP_REQUEST:
            return {
                ...state,
                isFetching: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state,
                isFetching: false,
            }
        case SIGN_UP_FAILURE:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return initialState;
    }
}