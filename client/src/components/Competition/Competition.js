import React, {useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function Competition({onGetCompetitionInfo}){
  useEffect(()=>{
    onGetCompetitionInfo()
  });
  
  return(
    <div>

    </div>
  );
}

export default Competition;