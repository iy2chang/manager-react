import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {}
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let items of error.details) errors[items.path[0]] = items.message;
    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    console.log(errors);
    if (errors) return;

    this.doSubmit();
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    // validate each input
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  renderInput(name, label, type = "text") {
    const { errors, data } = this.state;

    return (
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
          className="form-control"
          type={type}
          value={data[name]}
          name={name}
          placeholder={label}
          onChange={this.handleChange}
        />
        {errors[name] && (
          <div className="alert alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  }

  renderButton(label) {
    return <button className="btn btn-primary">{label}</button>;
  }

  renderSelect(name, label, options) {
    const { errors } = this.state;
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select
          className="form-control"
          name={name}
          onChange={this.handleChange}
        >
          <option />
          {options.map(o => (
            <option key={o._id} value={o._id}>
              {o.name}
            </option>
          ))}
        </select>
        {errors[name] && (
          <div className="danger alert-danger">{errors[name]}</div>
        )}
      </div>
    );
  }
}

export default Form;
