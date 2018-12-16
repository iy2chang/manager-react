import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getEmployee, updateEmployee } from "../services/employeeService";

class EditEmployee extends Form {
  state = {
    data: {
      firstName: "",
      lastName: "",
      companyId: "",
      phone: "",
      address: "",
      salary: "",
      notes: ""
    },
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    companyId: Joi.string()
      .required()
      .label("Company"),
    phone: Joi.string()
      .allow("")
      .label("Phone"),
    address: Joi.string()
      .required()
      .label("Address"),
    salary: Joi.number()
      .min(0)
      .label("Salary"),
    notes: Joi.string()
      .allow("")
      .label("Notes")
  };

  async componentDidMount() {
    await this.populateEmp();
  }

  async populateEmp() {
    try {
      const empId = this.props.match.params.id;
      const { data: emp } = await getEmployee(empId);
      this.setState({ data: this.mapToViewModel(emp) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  mapToViewModel(emp) {
    return {
      _id: emp._id,
      firstName: emp.firstName,
      lastName: emp.lastName,
      companyId: emp.company._id,
      phone: emp.phone,
      address: emp.address,
      salary: emp.salary,
      notes: emp.notes
    };
  }

  doSubmit = async () => {
    const companyId = this.state.data.companyId;
    try {
      await updateEmployee(this.state.data);
      this.props.history.push(`/employees/${companyId}`);
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.firstName = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Edit Employee</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("address", "Address")}
          {this.renderInput("salary", "Salary", "number")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Update")}
        </form>
      </div>
    );
  }
}

export default EditEmployee;
