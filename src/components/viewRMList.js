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
import * as Icon from "react-feather";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import DocumentDataService from "./services/DocumentDataService";

const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
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

const headings = ["Raw Material", "Action"];

function ViewRmList(props) {
  const classes = useStyles();
  const history = useHistory();
  const [rmList, setRmList] = React.useState([]);

  useEffect(() => {
    DocumentDataService.fetchRmList()
      .then((response) => {
        setRmList(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [props]);

  // const handleUpdate = (rm) => {
  //   DocumentDataService.addNewRm(rm)
  //     .then((response) => {
  //       console.log(response);
  //       toast.success(response);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // };

  const handleDelete = (rm) => {
    DocumentDataService.deleteRm(rm.rmName)
      .then((response) => {
        toast.success(response);
        history.push("/addNewRawMaterial");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
      {rmList.length > 0 && (
        <TableContainer component={Paper}>
          <h2 className="card-title font-weight-bold font-size-lg" align="center" marginTop="100px"  ><Icon.List size="30px" color ="red"/>        YOUR RAW MATERIALS</h2>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              {headings.map((cols) => {
                return cols === "Action" ? (
                  <StyledTableCell colSpan={1} align="center">
                    {cols}
                  </StyledTableCell>
                ) : (
                  <StyledTableCell>{cols}</StyledTableCell>
                );
              })}
            </TableHead>
            <TableBody>
              {rmList.map((rm) => {
                return (
                  <TableRow>
                    <StyledTableCell key={rm.rmName}>
                      {rm.rmName}
                    </StyledTableCell>
                    {/* <StyledTableCell>
                      <Button onClick={() => handleUpdate(rm)}>Update</Button>
                    </StyledTableCell> */}
                    <StyledTableCell align="center">
                      <Button onClick={() => handleDelete(rm)}><Icon.Trash/></Button>
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

export default ViewRmList;
