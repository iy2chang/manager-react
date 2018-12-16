import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getCompanies } from "../services/companyService";
import { createEmployee } from "../services/employeeService";

class AddEmpployee extends Form {
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
    companies: [],
    errors: {}
  };

  async componentDidMount() {
    const companyId = this.props.match.params.companyId;
    const { data } = this.state;
    data["companyId"] = companyId;
    const { data: companies } = await getCompanies();
    this.setState({ data, companies });
  }

  schema = {
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

  doSubmit = async () => {
    const companyId = this.props.match.params.companyId;
    try {
      await createEmployee(this.state.data);
      this.props.history.push(`/employees/${companyId}`);
    } catch (ex) {
      if (ex.response && ex.response === 400) {
        const errors = { ...this.state.errors };
        errors.firstName = ex.response.data;
        console.log("error", errors.firstName);
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div>
        <h1>Add Employee</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("firstName", "First Name")}
          {this.renderInput("lastName", "Last Name")}
          {this.renderInput("phone", "Phone")}
          {this.renderInput("address", "Address")}
          {this.renderInput("salary", "Salary", "number")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Add")}
        </form>
      </div>
    );
  }
}

export default AddEmpployee;
