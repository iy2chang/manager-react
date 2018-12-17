import React, { Component } from "react";
import NavBar from "./components/navBar";
import { Route, Redirect, Switch } from "react-router-dom";
import RegisterForm from "./components/registerForm";
import LoginForm from "./components/loginForm";
import Dashboard from "./components/dashboard";
import Logout from "./components/logout";
import Employee from "./components/employee";
import AddEmployee from "./components/addEmployee";
import EditEmployee from "./components/editEmployee";
import NotFound from "./components/notFound";
import AddCompany from "./components/addCompany";
import ProtectedRoute from "./components/common/protectedRoute";
import Profile from "./components/profile";
import { getCurrentUser } from "./services/authService";
import "./App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <React.Fragment>
        <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/dashboard" component={Dashboard} />
            <ProtectedRoute path="/employees/:companyId" component={Employee} />
            <ProtectedRoute
              path="/addEmployee/:companyId"
              component={AddEmployee}
            />
            <ProtectedRoute path="/editEmployee/:id" component={EditEmployee} />
            <ProtectedRoute path="/addCompany" component={AddCompany} />
            <ProtectedRoute path="/profile" component={Profile} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/dashboard" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
