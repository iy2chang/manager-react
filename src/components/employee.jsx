import React, { Component } from "react";
import EmployeeTable from "./employeeTable";
import { toast } from "react-toastify";
import { getEmployees, deleteEmployee } from "../services/employeeService";
import _ from "lodash";
import SearchBox from "./searchBox";
import { paginate } from "../utils/paginate";
import Pagination from "./common/pagination";

class Employees extends Component {
  state = {
    employees: [],
    currentPage: 1,
    pageSize: 5,
    searchQuery: "",
    sortColumn: { path: "firstName", order: "asc" },
    open: false
  };

  async componentDidMount() {
    const { data: employees } = await getEmployees();
    this.setState({ employees });
  }

  filterEmpByComId(id) {
    const employees = [...this.state.employees];
    let filteredData = employees.filter(
      employee => employee.company._id === id
    );
    return filteredData;
  }

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  handleDelete = async employee => {
    const originalEmployees = this.state.employees;
    const employees = originalEmployees.filter(e => e._id !== employee._id);
    this.setState({ employees });
    try {
      await deleteEmployee(employee._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This employee has already been deleted.");
      this.setState({ employees: originalEmployees });
    }
  };

  handleEdit = async employee => {
    window.location = `/editEmployee/${employee._id}`;
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleAdd = () => {
    const { companyId } = this.props.match.params;
    window.location = `/addEmployee/${companyId}`;
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      employees: allEmployees
    } = this.state;

    const { companyId } = this.props.match.params;
    let filtered = allEmployees.filter(e => e.company._id === companyId);
    if (searchQuery)
      filtered = allEmployees.filter(e =>
        e.firstName.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { companyId } = this.props.match.params;
    const { sortColumn, searchQuery, pageSize, currentPage } = this.state;
    const { totalCount, data } = this.getPagedData();

    return (
      <React.Fragment>
        <div>
          <button className="btn btn-danger btn-sm" onClick={this.handleAdd}>
            Add
          </button>
        </div>
        <div className="row">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <EmployeeTable
            companyId={companyId}
            data={data}
            sortColumn={sortColumn}
            onSort={this.handleSort}
            onDelete={this.handleDelete}
            onEdit={this.handleEdit}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default Employees;
