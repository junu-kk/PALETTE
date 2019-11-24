import React, {useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function School({onGetSchoolInfo, schoolInfo}){
  useEffect(()=>{
    onGetSchoolInfo()
    console.log('hihihihi\n\n\n\n\n\n\n\n');
    console.log(schoolInfo);
  },[]);
  
  return(
    <div>
      <ul>
      {schoolInfo}
      </ul>
    </div>
  );
}

export default School;