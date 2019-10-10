import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class School extends React.Component{
  render(){
    return(
      <TableRow>
        <TableCell>{this.props.name}</TableCell>
        <TableCell><img src={this.props.pic} alt ="pic"/> </TableCell>
        <TableCell>{this.props.address}</TableCell>
        <TableCell>{this.props.info}</TableCell>
        <TableCell>{this.props.clubs}</TableCell>
        <TableCell>{this.props.name}</TableCell>
      </TableRow>
    );
  }
}

export default School;