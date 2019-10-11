import React from 'react';
import School from '../../components/School';

import axios from 'axios';

const SchoolContainer = ({school})=>{
  const getSchoolInfo=()=>{
    return axios.get('http://127.0.0.1:5000/school').then(response=>{
      console.log(response);
      return response;
    }).catch(error=>{
      alert('failed to load school information');
      throw error;
    })
  }

  return (<School onGetSchoolInfo={getSchoolInfo}/>)
};

export default SchoolContainer;