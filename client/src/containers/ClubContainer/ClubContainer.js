import React from 'react';
import Club from '../../components/Club';

import axios from 'axios';

const ClubContainer = ({club})=>{
  const getClubInfo=() => {
    return axios.get('http://127.0.0.1:5000/club').then(response=>{
      console.log(response);
      return response;
    }).catch(error=>{
      alert('failed to load club information');
      throw error;
    })
  }

  return (<Club onGetClubInfo={getClubInfo}/>)
};

export default ClubContainer;