import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import DeleteDialog from "../deleteDialog";
import MTableHead from "./mTableHead";
import { getCompanyById } from "../../services/companyService";

class MTable extends Component {
  state = {
    company: ""
  };

  columns = [
    {
      path: "firstName",
      label: "First Name"
    },
    { path: "lastName", label: "Last Name" },
    { path: "salary", label: "Salary" },
    {
      path: "company.name",
      label: "Company"
    },
    {
      path: "edit",
      label: "Edit"
    },
    {
      path: "delete",
      label: "Delete"
    }
  ];

  handleEdit = async id => {
    window.location = `/editEmployee/${id}`;
  };

  handleAdd = id => {
    window.location = `/addEmployee/${id}`;
  };

  async componentDidMount() {
    const { companyId } = this.props;
    try {
      const { data: company } = await getCompanyById(companyId);
      this.setState({ company });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        console.log("company not exist");
      }
    }
  }

  render() {
    const { data, companyId, sortColumn } = this.props;
    const { company } = this.state;
    if (data.length === 0) {
      return (
        <div>
          <h2>No Data</h2>
          <div className="addEmployee">
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
        <div className="displayCompany">{`You are viewing employees from ${
          company.name
        }`}</div>
        <div className="addEmployee">
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => this.handleAdd(companyId)}
          >
            Add
          </Button>
        </div>
        <Table>
          <MTableHead columns={this.columns} sortColumn={sortColumn} />
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
                      size="small"
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
