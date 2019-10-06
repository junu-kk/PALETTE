import axios from 'axios';

function firstSignInAPI(dateOfBirth, address, introduction, grade, _class, workExperience, funFacts) {
    return axios.post('http://127.0.0.1:5000/first_login/', {dob:dateOfBirth, address:address, bio:introduction, grade:grade, class: _class, work_exp:workExperience, fun_facts: funFacts})
}

const initialState = {
    isFetching: false,
    inSuccess: false
};

const FIRST_SIGN_IN_REQUEST = 'FIRST_SIGN_IN_REQUEST';
const FIRST_SIGN_IN_SUCCESS = 'FIRST_SIGN_IN_SUCCESS';
const FIRST_SIGN_IN_FAILURE = 'FIRST_SIGN_IN_FAILURE';

export const firstSignInRequest = () => ({
    type: FIRST_SIGN_IN_REQUEST,
});

export const firstSignInSuccess = () => ({
    type: FIRST_SIGN_IN_SUCCESS
});

export const firstSignInFailure = () => ({
    type: FIRST_SIGN_IN_FAILURE
});

export const firstSignIn = (dateOfBirth, address, introduction, grade, _class, workExperience, funFacts) => dispatch => {
    dispatch(firstSignInRequest());
    return firstSignInAPI(dateOfBirth, address, introduction, grade, _class, workExperience, funFacts).then(response => {
        dispatch(firstSignInSuccess());
        console.log(response);
        return response;
    }).catch(error => {
        console.log(error);
        alert('submit failed. please check your form');
        dispatch(firstSignInFailure());
        throw(error)
    })
};

export default function reducer(state=initialState, action) {
    switch(action.type) {
        case FIRST_SIGN_IN_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case FIRST_SIGN_IN_SUCCESS:
            return {
                ...state,
                isFetching: false,
                isSuccess: true
            }
        case FIRST_SIGN_IN_FAILURE:
            return {
                ...state,
                isFetching: false,
                isSuccess: true
            }
        default:
            return state;
    }
}