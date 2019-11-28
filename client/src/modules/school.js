import axios from "axios";

const GET_SCHOOLS_INFO = 'GET_SCHOOLS_INFO';
const GET_SCHOOL_INFO = 'GET_SCHOOL_INFO';

const initialState={};

export const getSchoolInfoRequest = () => dispatch => {
  return axios.get('http://127.0.0.1:5000/school').then(response=>{
    return response;
  }).catch(error=>{
    alert('failed to load school information.');
    throw error;
  });
}

export const getSchoolInfo = () =>({
  type : GET_SCHOOLS_INFO
});

export default function reducer(state = initialState, action){
  switch(action.type){
    case GET_SCHOOLS_INFO:
  }
}