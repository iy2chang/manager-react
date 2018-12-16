import React, { Component } from "react";
import { getEmployees } from "../services/employeeService";
import MTable from "./common/mTable";

class Employees extends Component {
  state = {
    data: [],
    errors: {}
  };

  async componentDidMount() {
    const { data } = await getEmployees();
    this.setState({ data });
  }

  filterEmpByComId(id) {
    const data = [...this.state.data];
    let filteredData = data.filter(d => d.company._id === id);
    return filteredData;
  }

  render() {
    const { companyId } = this.props.match.params;
    const filteredData = this.filterEmpByComId(companyId);

    return <MTable data={filteredData} companyId={companyId} />;
  }
}

export default Employees;
