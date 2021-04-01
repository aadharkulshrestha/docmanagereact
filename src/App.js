import React, { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import { ToastContainer } from "react-toastify";
import { Route, Switch } from "react-router-dom";
import Dashboard from "./components/dashboard";
import ViewCompleteDoc from "./components/viewCompleteDoc";
import ViewPendingDoc from "./components/viewPendingDoc";
import Profile from "./components/profile";
import Login from "./components/login";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import AuthenticationService from "./components/services/AuthenticationService";
import AddCustomer from "./components/AddCustomer";
import "react-toastify/dist/ReactToastify.css";
import MasterForm from "./components/functionalMasterForm";
import { makeStyles } from "@material-ui/core";
import UpdateCustomer from "./components/UpdateCustomer";
import DeleteCustomer from "./components/DeleteCustomer";
import ViewCustomer from "./components/viewDocument";
import ExportData from "./components/exportData";
import ViewDocumentList from "./components/viewDocumentList";
import AddNewCustomer from "./components/addNewCustomer";
import AddNewProduct from "./components/addNewProduct";
import AddNewRawMaterial from "./components/addNewRawMaterial";
import ViewDocument from "./components/viewDocument";
import ViewCustomerList from "./components/viewCustomerList";
import ViewRmList from "./components/viewRMList";
import StockBalance from "./components/stockBalance";
import CertificateRequestForm from "./components/certificateRequestForm";
import authService from "./components/services/authService";
import SignUp from "./components/signUp";
import User from "./components/user"
import AdminPanel from "./components/adminDashboard";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Link } from "react-router-dom";


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
    </React.Fragment>
  );
}

export default App;
