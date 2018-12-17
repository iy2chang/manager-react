import React, { Component } from "react";
import { getCompanies } from "../services/companyService";
import Tooltip from "@material-ui/core/Tooltip";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
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

  handleAddCompany = () => {
    window.location = "/addCompany";
  };

  render() {
    const { companies } = this.state;

    return (
      <div>
        <div className="dashboard-fab">
          <Tooltip title="add a company">
            <Fab color="primary" aria-label="Add" size="small">
              <AddIcon onClick={this.handleAddCompany} />
            </Fab>
          </Tooltip>
        </div>
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
      </div>
    );
  }
}

export default Dashboard;
