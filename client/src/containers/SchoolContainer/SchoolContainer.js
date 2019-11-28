import React, {useEffect} from 'react';
import School from '../../components/School';

import axios from 'axios';
import {isAuthenticated} from "../../modules/authentication";

const SchoolContainer = ({history})=>{
  useEffect(() => {
    console.log('container effect');
    if(!isAuthenticated()) {
      alert('You\'re not logged in!');
      history.push('/');
    } else {
      getSchoolInfo();
    }
  },[]);

  const [schoolInfo, setSchoolInfo] = React.useState([]);

  const getSchoolInfo = async () => {
    console.log('getSchoolInfo');
    const token = sessionStorage.getItem('token');
    try {
      const temp = await axios.get('http://127.0.0.1:5000/school', {
        headers: {
          'Authorization': token
        }
      });
      setSchoolInfo(temp.data);
      console.log('setSchoolInfo');

    } catch(err) {
      console.log(err)
    }
  };

  return (<School onGetSchoolInfo={getSchoolInfo} schoolInfo={schoolInfo}/>)
};

export default SchoolContainer;