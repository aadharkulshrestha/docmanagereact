import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  withStyles,
} from "@material-ui/core";
import React from "react";
import * as Icon from "react-feather";
import { toast } from "react-toastify";
import DocumentDataService from "./services/DocumentDataService";
import ViewCustomerList from "./viewCustomerList";
import { Tooltip } from '@material-ui/core';

const StyledTextField = withStyles({
  root: {
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    // paddingBottom: 0,
    marginTop: 10,
    fontWeight: 500,
    color: "red",
  },
})(TextField);

function AddNewCustomer(props) {
  const [customer, setCustomer] = React.useState({
    customerName: "",
    customerAddress: "",
    gots: false,
    grs: false,
    ocs: false,
    rcs: false,
    rds: false,
    rws: false,
  });

  const handleSubmit = (event) => {
    if (customer.customerName === "") {
      toast.error("Error in Customer name!!");
      return;
    }
    DocumentDataService.addNewCustomer(customer)
      .then((response) => {
        console.log(response);
        toast.success("Created New Customer");
        setCustomer({
          customerName: "",
          customerAddress: "",
          gots: false,
          grs: false,
          ocs: false,
          rcs: false,
          rds: false,
          rws: false,
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleChange = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.value,
    });
  };

  const handleAssignmentCheck = (event) => {
    setCustomer({
      ...customer,
      [event.target.name]: event.target.checked,
    });
  };
  return (
    <React.Fragment>
      <form>
      <h2 className="card-title font-weight-bold font-size-lg" align="center"  ><Icon.UserPlus size="30px" color ="red"/>        NEW CUSTOMER</h2>
      
      <div className="form-group">
          <label>Customer Name</label>
          <input 
          id="customerName" 
          type="text" 
          name="customerName"
          required
         
          margin="normal"
          variant="outlined"
          className="form-control" 
          placeholder="Enter Customer Name*"
          value={customer.customerName}
          onChange={handleChange}
           />
          </div>
          <div className="form-group">
          <label>Customer Address</label>
          <input 
          id="customerAddress" 
          type="text" 
          name="customerAddress"
          required
         
          margin="normal"
          variant="outlined"
          className="form-control" 
          placeholder="Enter Customer Address*"
          value={customer.customerAddress}
          onChange={handleChange}
           />
          </div>  
        <div>
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.gots}
                onChange={(event) => handleAssignmentCheck(event)}
                name="gots"
                color="primary"
              />
            }
            label="GOTS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.grs}
                onChange={(event) => handleAssignmentCheck(event)}
                name="grs"
                color="primary"
              />
            }
            label="GRS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.ocs}
                onChange={(event) => handleAssignmentCheck(event)}
                name="ocs"
                color="primary"
              />
            }
            label="OCS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.rcs}
                onChange={(event) => handleAssignmentCheck(event)}
                name="rcs"
                color="primary"
              />
            }
            label="RCS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.rds}
                onChange={(event) => handleAssignmentCheck(event)}
                name="rds"
                color="primary"
              />
            }
            label="RDS"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={customer.rws}
                onChange={(event) => handleAssignmentCheck(event)}
                name="rws"
                color="primary"
              />
            }
            label="RWS"
          />
        </div>
        
        <Button
          variant="contained"
          Color= "black"
          size="large"
          style={{
            
            margin: "20px",
            color: "white",
            float: "left",
          }}
          onClick={handleSubmit}
        >
          <Icon.Check color= "black"/> 
        </Button>
        <ViewCustomerList customer={customer} /> 
      </form>
    </React.Fragment>
  );
}

export default AddNewCustomer;
