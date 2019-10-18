import axios from "axios";

const GET_USER_INFO = 'GET_USER_INFO';
const UPDATE_USER_INFO = 'UPDATE_USER_INFO';
const DELETE_UESR = 'DELETE_USER';

const initialState = {};

export const getUserInfoRequest = () => dispatch => {
    return axios.get('http://127.0.0.1:5000/mypage').then(response => {
        console.log(response);
        //response가 뭐가 오나 한번 체크해보고 dispatch를 하든 말든 해.
        return response;
    }).catch(error => {
        alert('failed to load user information.');
        throw error;
    })
};

export const getUserInfo = () => ({
    type: GET_USER_INFO
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_INFO:
    }
}