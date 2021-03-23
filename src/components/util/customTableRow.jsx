import { TableCell, TableRow, withStyles } from "@material-ui/core";
import React from "react";

const StyledTableCell = withStyles((theme) => ({
  head: {
    border: "1px solid black",
    backgroundColor: "indianred",
    color: "#F0F8FF",
    fontSize: "16px",
  },
  body: {
    border: "1px solid #ddd",
    fontFamily: "Arial, Helvetica",
    borderCollapse: "collapse",
    // color: "black",
    fontSize: "1.2rem",
    textAlign: "center",
    minWidth: "520px",
  },
}))(TableCell);
function CustomTableRow(props) {
  const { head, data } = props;
  return (
    <TableRow>
      <StyledTableCell>
        <strong>{head}</strong>
      </StyledTableCell>
      <StyledTableCell>{data}</StyledTableCell>
    </TableRow>
  );
}

export default CustomTableRow;
