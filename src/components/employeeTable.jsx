import React, { Component } from "react";
import Table from "./common/table";
import DeleteDialog from "./deleteDialog";

class EmployeeTable extends Component {
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
      label: "Edit",
      content: employee => (
        <button
          onClick={() => this.props.onEdit(employee)}
          className="btn btn-danger btn-sm"
        >
          Edit
        </button>
      )
    },
    {
      path: "delete",
      label: "Delete",
      content: employee => (
        <React.Fragment>
          <DeleteDialog onClick={() => this.props.onDelete(employee)} />
          {/* <button
            onClick={this.handleClickOpen}
            className="btn btn-danger btn-sm"
          >
            Delete
          </button> */}
        </React.Fragment>
      )
    }
  ];

  render() {
    const { onSort, sortColumn, data } = this.props;
    return (
      <Table
        columns={this.columns}
        data={data}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default EmployeeTable;
