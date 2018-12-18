import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteDialog from "../deleteDialog";

class MTable extends Component {
  state = {};

  // handleDelete = async id => {
  //   try {
  //     await deleteEmployee(id);
  //     const { state } = this.props.location;
  //     window.location = state ? state.from.pathname : "/";
  //   } catch (ex) {
  //     if (ex.response && ex.response === 404) {
  //       console.log(ex);
  //     }
  //   }
  // };

  handleEdit = async id => {
    window.location = `/editEmployee/${id}`;
  };

  handleAdd = id => {
    window.location = `/addEmployee/${id}`;
  };

  render() {
    const { data, companyId } = this.props;
    if (data.length === 0) {
      return (
        <div>
          <h2>No Data</h2>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.handleAdd(companyId)}
            >
              Add
            </Button>
          </div>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => this.handleAdd(companyId)}
          >
            Add
          </Button>
        </div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Salary</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Edit Emp</TableCell>
              <TableCell>Delete Emp</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(d => {
              return (
                <TableRow key={d._id}>
                  <TableCell>{d.firstName}</TableCell>
                  <TableCell>{d.lastName}</TableCell>
                  <TableCell>{d.salary}</TableCell>
                  <TableCell>{d.company ? d.company.name : null} </TableCell>
                  <TableCell>
                    <Button
                      color="secondary"
                      onClick={() => {
                        this.handleEdit(d._id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <DeleteDialog
                      id={d._id}
                      firstName={d.firstName}
                      companyId={companyId}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default MTable;
