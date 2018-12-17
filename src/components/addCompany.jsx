import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { addCompany } from "../services/companyService";

class AddCompany extends Form {
  state = {
    data: {
      name: "",
      phone: "",
      address: "",
      info: "",
      notes: ""
    },
    errors: {}
  };

  schema = {
    name: Joi.string()
      .required()
      .label("Company Name"),
    phone: Joi.string()
      .required()
      .label("Phone"),
    address: Joi.string().label("Address"),
    info: Joi.string().label("Info"),
    notes: Joi.string()
      .allow("")
      .label("Notes")
  };

  doSubmit = async () => {
    let response;
    try {
      response = await addCompany(this.state.data);
      console.log(response);
      this.props.history.push("/dashboard");
    } catch (ex) {
      if (ex.response && ex.response === 400) {
        const errors = { ...this.state.errors };
        errors.name = ex.response.data;
        console.log("error", errors.name);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <h1>Add Company</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Company Name")}
          {this.renderInput("phone", "Company Phone")}
          {this.renderInput("address", "Address")}
          {this.renderInput("info", "Info")}
          {this.renderInput("notes", "Notes")}
          {this.renderButton("Add")}
        </form>
      </React.Fragment>
    );
  }
}

export default AddCompany;
