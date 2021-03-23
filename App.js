import React, { useEffect, useState } from "react";
import NavBar from "./src/components/navBar";
import { ToastContainer } from "react-toastify";
import { Route} from "react-router-dom";
import Dashboard from "./src/components/dashboard";
import ViewCompleteDoc from "./src/components/viewCompleteDoc";
import ViewPendingDoc from "./src/components/viewPendingDoc";
import Profile from "./src/components/profile";
import Login from "./src/components/login";
import AuthenticatedRoute from "./src/components/AuthenticatedRoute";
import AuthenticationService from "./src/components/services/AuthenticationService";
import AddCustomer from "./src/components/AddCustomer";
import "react-toastify/dist/ReactToastify.css";
import MasterForm from "./src/components/functionalMasterForm";
import { makeStyles } from "@material-ui/core";
import UpdateCustomer from "./src/components/UpdateCustomer";
import DeleteCustomer from "./src/components/DeleteCustomer";
import ViewCustomer from "./src/components/viewDocument";
import ExportData from "./src/components/exportData";
import ViewDocumentList from "./src/components/viewDocumentList";
import AddNewCustomer from "./src/components/addNewCustomer";
import AddNewProduct from "./src/components/addNewProduct";
import AddNewRawMaterial from "./src/components/addNewRawMaterial";
import ViewDocument from "./src/components/viewDocument";
import ViewCustomerList from "./src/components/viewCustomerList";
import ViewRmList from "./src/components/viewRMList";
import StockBalance from "./src/components/stockBalance";
import CertificateRequestForm from "./src/components/certificateRequestForm";
import authService from "./src/components/services/authService";
import SignUp from "./src/components/signUp";
import User from "./src/components/user"
import AdminPanel from "./src/components/adminDashboard";

import './App.css';


import {BrowserRouter as Router,Switch, Link } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(12),
    paddingRight: theme.spacing(8),
  },
  appBarSpacer: theme.mixins.toolbar,
}));

function App() {
  const [user, setUser] = useState({});
  const classes = useStyles();

  useEffect(() => {
    const resp = authService.getCurrentUser();
    console.log(resp);
    setUser(resp);
  }, []);

  return (
    <React.Fragment>
      <Router>
      <ToastContainer />
      <NavBar user={user} />
      <div className={classes.appBarSpacer} />
      <div className={classes.root}>
        <Switch>
          <Route path="/login" component={Login} />
          <AuthenticatedRoute path="/test" component={AddCustomer} />
          <AuthenticatedRoute path="/dashboard" component={Dashboard} />
          <AuthenticatedRoute path="/addDocument" component={MasterForm} />
          <AuthenticatedRoute path="/user" component={User} />
          <AuthenticatedRoute
            path="/updateCustomer"
            component={UpdateCustomer}
          />
          <AuthenticatedRoute
            path="/deleteCustomer"
            component={DeleteCustomer}
          />
          <AuthenticatedRoute path="/profile" component={Profile} />
          <AuthenticatedRoute path="/viewDocument" component={ViewDocument} />
          <AuthenticatedRoute path="/viewCompleteDoc" component={ViewCompleteDoc} />
          <AuthenticatedRoute path="/viewPendingDoc" component={ViewPendingDoc} />
          <AuthenticatedRoute path="/exportData" component={ExportData} />
          <AuthenticatedRoute
            path="/viewDocumentList"
            component={ViewDocumentList}
          />
          <AuthenticatedRoute
            path="/addNewCustomer"
            component={AddNewCustomer}
          />
          <AuthenticatedRoute path="/addNewProduct" component={AddNewProduct} />
          <AuthenticatedRoute
            path="/addNewRawMaterial"
            component={AddNewRawMaterial}
          />
          <AuthenticatedRoute
            path="/viewCustomerList"
            component={ViewCustomerList}
          />
          <AuthenticatedRoute
            path="/viewStockBalance"
            component={StockBalance}
          />
          <AuthenticatedRoute
            path="/viewCertificateRequest"
            component={CertificateRequestForm}
          />
          <AuthenticatedRoute path="/admin-panel" component={AdminPanel} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
      </div>
      </Router>
    </React.Fragment>
  );
}

export default App;
