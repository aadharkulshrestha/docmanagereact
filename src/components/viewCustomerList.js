import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Icon from "react-feather";
import DocumentDataService from "./services/DocumentDataService";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});
const paperStyle = { padding: "2%", width: "100%", margin: "8% auto" };
const headings = ["Customer Name", "Customer Address", "Standard", "Action"];

function ViewCustomerList(props) {
  const classes = useStyles();

  const [customerList, setCustomerList] = React.useState([]);
  const history = useHistory();

  useEffect(() => {
    DocumentDataService.fetchCustomerList()
      .then((response) => {
        setCustomerList(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [props]);

  const handleAddCustomer = () => {
    history.push("/addNewCustomer");
  };

  const handleUpdate = (customer) => {
    DocumentDataService.addNewCustomer(customer)
      .then((response) => {
        console.log(response);
        toast.success(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleDelete = (customer) => {
    DocumentDataService.deleteCustomer(customer.customerName)
      .then((response) => {
        toast.success("Deleted");
        history.push("/addNewCustomer");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleAssignmentCheck = (event, customer) => {
    const index = customerList.findIndex(
      (customerProp) => customerProp.customerName === customer.customerName
    );
    let newData = [...customerList];
    newData[index] = {
      ...newData[index],
      [event.target.name]: event.target.checked,
    };
    setCustomerList(newData);
  };

  return (
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
     
      
      {customerList.length > 0 && (
        <TableContainer component={Paper}>
          <h2 className="card-title font-weight-bold font-size-lg" align="center" marginTop="100px"  ><Icon.List size="30px" color ="red"/>        YOUR CUSTOMERS</h2>
          <Table className={classes.table} aria-label="customized table">
            <TableHead key={0}>
              {headings.map((cols) => {
                return cols === "Action" ? (
                  <StyledTableCell colSpan={2} align="center">
                    {cols}
                  </StyledTableCell>
                ) : cols === "Standard" ? (
                  <StyledTableCell colSpan={6} align="center">
                    {cols}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>{cols}</StyledTableCell>
                );
              })}
            </TableHead>
            <TableBody>
              {customerList.map((customer, i) => {
                return (
                  <TableRow key={i + 1}>
                    <StyledTableCell>{customer.customerName}</StyledTableCell>
                    <StyledTableCell>
                      {customer.customerAddress}
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.gots}
                            onChange={(e) => handleAssignmentCheck(e, customer)}
                            name="gots"
                            color="primary"
                          />
                        }
                        label="GOTS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.grs}
                            onChange={(event) =>
                              handleAssignmentCheck(event, customer)
                            }
                            name="grs"
                            color="primary"
                          />
                        }
                        label="GRS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.ocs}
                            onChange={(event) =>
                              handleAssignmentCheck(event, customer)
                            }
                            name="ocs"
                            color="primary"
                          />
                        }
                        label="OCS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.rcs}
                            onChange={(event) =>
                              handleAssignmentCheck(event, customer)
                            }
                            name="rcs"
                            color="primary"
                          />
                        }
                        label="RCS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.rds}
                            onChange={(event) =>
                              handleAssignmentCheck(event, customer)
                            }
                            name="rds"
                            color="primary"
                          />
                        }
                        label="RDS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={customer.rws}
                            onChange={(event) =>
                              handleAssignmentCheck(event, customer)
                            }
                            name="rws"
                            color="primary"
                          />
                        }
                        label="RWS"
                      />
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => handleUpdate(customer)}>
                        <Icon.Edit/>
                      </Button>
                    </StyledTableCell>
                    <StyledTableCell>
                      <Button onClick={() => handleDelete(customer)}>
                        <Icon.Trash/>
                      </Button>
                    </StyledTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* <Button
        variant="contained"
        style={{
          marginTop: "20px",
          float: "right",
        }}
        color="primary"
        size="large"
        onClick={handleAddCustomer}
      >
        Add Customer
      </Button> */}
    </React.Fragment>
    </Paper>
  );
}

export default ViewCustomerList;
