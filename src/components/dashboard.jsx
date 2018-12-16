import React, { Component } from "react";
import { getCompanies } from "../services/companyService";
import MCard from "./common/mCard";

class Dashboard extends Component {
  state = {
    companies: [],
    errors: {}
  };

  async componentDidMount() {
    const { data: companies } = await getCompanies();
    this.setState({ companies });
  }

  render() {
    const { companies } = this.state;

    return (
      <div className="row">
        {companies.map(c => (
          <MCard
            key={c._id}
            name={c.name}
            phone={c.phone}
            isVip={c.isVip}
            notes={c.notes}
            id={c._id}
            avatar={c.name[0]}
          />
        ))}
      </div>
    );
  }
}

export default Dashboard;
