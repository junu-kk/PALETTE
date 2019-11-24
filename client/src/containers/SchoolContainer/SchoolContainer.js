import React, {useEffect} from 'react';
import School from '../../components/School';

import axios from 'axios';
import {isAuthenticated} from "../../modules/authentication";

const SchoolContainer = ({history})=>{
  useEffect(() => {
    if(!isAuthenticated()) {
      alert('You\'re not logged in!');
      history.push('/');
    }
  },[]);

  const [schoolInfo, setSchoolInfo] = React.useState([]);

  const getSchoolInfo = async () => {
    const token = sessionStorage.getItem('token');
    try {
      const temp = await axios.get('http://127.0.0.1:5000/school', {
        headers: {
          'Authorization': token
        }
      });
      console.log(temp.data);
      setSchoolInfo(temp.data)
    } catch(err) {
      console.log(err)
    }
  };

  return (<School onGetSchoolInfo={getSchoolInfo} schoolInfo={schoolInfo}/>)
};

export default SchoolContainer;