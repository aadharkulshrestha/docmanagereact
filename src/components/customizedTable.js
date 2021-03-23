import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, TextField } from "@material-ui/core";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

const CustomizedTable = (props) => {
  const classes = useStyles();
  // const headings = props.head ? props.head : [];
  // const rows = props.data;
  const {
    headings,
    rows,
    handleTableClick,
    handleCertificateClick,
    handleUpdateCustomer,
    isCompleted,
  } = props;
  // rows.map((row) => console.log("**********", +row.id));
  // console.log(rows);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow key="head">
            {headings.map((cols) => {
              // <StyledTableCell key={cols}>{cols}</StyledTableCell>
              return cols === "Action" ? (
                <StyledTableCell align="center" colSpan={2}>
                  {cols}
                </StyledTableCell>
              ) : (
                <StyledTableCell>{cols}</StyledTableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.serialNumber}>
              <StyledTableCell component="th" scope="row">
                {row.serialNumber}
              </StyledTableCell>
              {isCompleted && (
                <StyledTableCell component="th" scope="row">
                  {row.finalTcNumber}
                </StyledTableCell>
              )}
              <StyledTableCell component="th" scope="row">
                {row.username}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.customerName}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.composition}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.finishedProduct}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.certifiedRawMaterialKg}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.finishedProductKG}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                {row.status}
              </StyledTableCell>
              <StyledTableCell component="th" scope="row">
                <Button size="medium" onClick={() => handleTableClick(row)}>
                  View
                </Button>
              </StyledTableCell>
              {/* <StyledTableCell component="th" scope="row">
                <Button size="medium" onClick={() => handleUpdateCustomer(row)}>
                  Update
                </Button>
              </StyledTableCell> */}
              <StyledTableCell component="th" scope="row">
                {row.status === "pending" ? (
                  <Button
                    size="medium"
                    onClick={() => handleUpdateCustomer(row)}
                  >
                    Complete
                  </Button>
                ) : (
                  <Button
                    size="medium"
                    onClick={() => handleCertificateClick(row)}
                  >
                    Regenarate Certificate
                  </Button>
                )}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTable;
