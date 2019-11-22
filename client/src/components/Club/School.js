import React, {useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function Club({onGetClubInfo}){
  useEffect(()=>{
    onGetClubInfo()
  });
  
  return(
    <div>

    </div>
  );
}

export default Club;