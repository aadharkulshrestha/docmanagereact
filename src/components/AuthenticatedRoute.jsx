import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthenticationService from "./services/AuthenticationService";
import authService from "./services/authService";

class AuthenticatedRoute extends Component {
  render() {
    if (authService.getCurrentUser()) {
      return <Route {...this.props} />;
    } else {
      return <Redirect to="/login" />;
    }
  }
}

export default AuthenticatedRoute;
