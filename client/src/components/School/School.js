import React, {useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function School({onGetSchoolInfo}){
  useEffect(()=>{
    onGetSchoolInfo()
  });
  
  return(
    <div>

    </div>
  );
}

export default School;