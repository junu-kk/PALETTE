import React, {useEffect} from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function School({onGetSchoolInfo, schoolInfo}){
  const schools = schoolInfo.map((school) => {
    return <li>{school.introduction}</li>
  });

  return(
    <div>
      {schools}
    </div>
  );
}

export default School;