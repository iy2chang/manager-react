import React, { Component } from "react";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";

class MTableHead extends Component {
  state = {};
  render() {
    return (
      <TableHead>
        <TableRow>
          {this.props.columns.map(column => {
            return <TableCell key={column.path}>{column.label}</TableCell>;
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default MTableHead;
