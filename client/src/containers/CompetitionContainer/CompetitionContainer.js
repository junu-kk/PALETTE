import React from 'react';
import Competition from '../../components/Competition';

import axios from 'axios';

const CompetitionContainer = ({competition})=>{
  const getCompetitionInfo=() => {
    return axios.get('http://127.0.0.1:5000/competition').then(response=>{
      console.log(response);
      return response;
    }).catch(error=>{
      alert('failed to load competition information');
      throw error;
    })
  }

  return (<Competition onGetCompetitionInfo={getCompetitionInfo}/>)
};

export default CompetitionContainer;