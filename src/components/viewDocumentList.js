import React, { useCallback, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import DocumentDataService from "./services/DocumentDataService";
import { toast } from "react-toastify";
import AutoDropDown from "./util/autoDropDown";
import DropDown from "./util/dropDown";
import { Button, GridList, GridListTile, TextField, Paper } from "@material-ui/core";
import _ from "lodash";
import { useHistory } from "react-router-dom";

const columns = [
  { field: "id", headerName: "Sl No", width: 90 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "customerName", headerName: "Customer", width: 130 },
  {
    field: "composition",
    headerName: "Raw Material",
    // type: "number",
    width: 200,
  },
  {
    field: "finishedProduct",
    headerName: "Product",
    // type: "number",
    width: 200,
  },
  {
    field: "standard",
    headerName: "Standard",
    width: 150,
  },
  {
    field: "certifiedRawMaterialKg",
    headerName: "RM Inventory",
    type: "number",
    width: 200,
  },
  {
    field: "finishedProductKG",
    headerName: "Product Inventory",
    type: "number",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },

  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue("firstName") || ""} ${
  //         params.getValue("lastName") || ""
  //       }`,
  //   },
];

const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
const completedColumns = [
  { field: "id", headerName: "Sl No", width: 90 },
  { field: "finalTcNumber", headerName: "Final TC No", width: 130 },
  { field: "username", headerName: "Username", width: 130 },
  { field: "customerName", headerName: "Customer", width: 130 },
  {
    field: "composition",
    headerName: "Raw Material",
    // type: "number",
    width: 200,
  },
  {
    field: "finishedProduct",
    headerName: "Product",
    // type: "number",
    width: 200,
  },
  {
    field: "standard",
    headerName: "Standard",
    width: 150,
  },
  {
    field: "certifiedRawMaterialKg",
    headerName: "RM Inventory",
    type: "number",
    width: 200,
  },
  {
    field: "finishedProductKG",
    headerName: "Product Inventory",
    type: "number",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 100,
  },

  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 160,
  //     valueGetter: (params) =>
  //       `${params.getValue("firstName") || ""} ${
  //         params.getValue("lastName") || ""
  //       }`,
  //   },
];

// const rows = [
//   { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
//   { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
//   { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
//   { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
//   { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
//   { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
//   { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
//   { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
//   { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
// ];

function ViewDocumentList(props) {
  const history = useHistory();
  const [rows, setRows] = React.useState([]);
  const [filterMaster, setFilterMaster] = React.useState({
    customerName: "",
    status: "",
    standard: "",
    finalTc: "",
  });
  const [customers, setCustomers] = React.useState([]);
  const [selection, setSelection] = React.useState([]);
  const [pending, setPending] = React.useState(false);

  //   useEffect(() => {
  //     if (customerName) {
  //       console.log("useeffect");
  //       // DocumentDataService.getCustomerData(customerName)
  //       //   .then((response) => {
  //       //     if (response) {
  //       //       setDocumentData(response.data);
  //       //     } else {
  //       //       toast.error("Unable to fetch customer");
  //       //     }
  //       //   })
  //       //   .catch((error) => {
  //       //     console.log(error);
  //       //   });
  //     }
  //   }, [customerName]);

  const fetchResult = async (searchquery) => {
    await DocumentDataService.fetchFilteredCustomerList(searchquery).then(
      (res) => {
        if (res) {
          setCustomers(res);
        } else {
          toast.error("Unable to fetch customer list");
        }
      }
    );
  };

  const debounceFetch = useCallback(
    _.debounce((q) => fetchResult(q), 500),
    []
  );

  const customerSearch = (event, value) => {
    console.log("customersarch");
    debounceFetch(value);
    console.log(value);
  };

  const handleChange = (event, val, ref) => {
    const name =
      event.target.name == null
        ? ref.current.getAttribute("name")
        : event.target.name;
    const value = event.target.name == null ? val : event.target.value;

    name === "status" && setPending(value === "pending");

    setFilterMaster({
      ...filterMaster,
      [name]: value,
    });
  };

  const handleClick = () => {
    setPending(filterMaster.status === "pending");
    if (filterMaster.status === "pending") {
      const { customerName, status, standard } = filterMaster;
      const reqObj = {
        customerName: customerName,
        status: status,
        standard: standard,
      };
      DocumentDataService.fetchFilteredDocumentList(reqObj)
        .then((response) => {
          response.map((res) => {
            res["id"] = res.serialNumber;
          });
          setRows(response);
        })
        .catch((error) => {
          toast.error(error);
        });
    } else if (filterMaster.status === "completed") {
      const { customerName, status, standard } = filterMaster;
      const reqObj = {
        customerName: customerName,
        status: status,
        standard: standard,
      };
      DocumentDataService.fetchCompletedFilteredDocumentList(reqObj)
        .then((response) => {
          response.map((res) => {
            res["id"] = res.serialNumber;
          });
          setRows(response);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const handleCompletion = () => {
    let tempStandard, tempCustomer;
    // console.log("completion");
    rows.map((row) => {
      // console.log(selection);
      if (selection.includes(row.serialNumber)) {
        // tempCustomer = row.customerName;
        // console.log(row.serialNumber);
        if (tempCustomer) {
          // console.log(tempStandard);
          // console.log(row.standard);
          if (tempCustomer !== row.customerName) {
            tempStandard = true;
            return;
          }
        } else {
          tempCustomer = row.customerName;
        }
        return 
      }
    });
    if (tempStandard === true) {
      toast.error("Different Customers entered");
      return;
    }
    console.log(tempCustomer)
    console.log(selection)
    history.push({
      pathname: "/viewCertificateRequest",
      state: { details: selection, customerName: tempCustomer },
    });
  };
  // useEffect(() => {
  //   DocumentDataService.fetchPendingDocuments()
  //     .then((response) => {
  //       console.log(response);
  //       response.map((res) => {
  //         res["id"] = res.serialNumber;
  //       });
  //       setRows(response);
  //     })
  //     .catch((error) => {
  //       toast.error(error);
  //     });
  // }, []);

  return (
    <React.Fragment>
      <Paper elevation={20} style={paperStyle}>
      <div style={{ display: "block", width: "100%" }}>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <DropDown
            fieldName={"status"}
            name={"Status"}
            newValue={false}
            multipleVal={false}
            dropDownValues={["pending", "completed"]}
            handleChange={handleChange}
            currentVal={filterMaster.status}
          />
          {filterMaster.status.length > 0 && (
            <AutoDropDown
              fieldName={"customerName"}
              name={"Customer Name"}
              newValue={false}
              multipleVal={false}
              dropDownValues={customers.map(
                (customers) => customers.customerName
              )}
              onInputChange={customerSearch}
              handleChange={handleChange}
              currentVal={filterMaster.customerName}
            />
          )}
          {filterMaster.status.length > 0 && (
            <TextField
              // error={false}
              // className="form-control"

              id="standard"
              name="standard"
              type="text"
              variant="outlined"
              label="Standard"
              value={filterMaster.standard}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
          )}
          {filterMaster.status === "completed" && (
            <TextField
              // error={false}
              // className="form-control"
              id="finalTc"
              name="finalTc"
              type="text"
              variant="outlined"
              label="Final TC Number"
              value={filterMaster.finalTc}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
          )}
          <Button
            style={{
              borderRadius: 15,
              height: "70%",
              //   padding: "18px 36px",
              fontSize: "18px",
            }}
            color="primary"
            variant="contained"
            onClick={handleClick}
          >
            Refresh List
          </Button>
        </div>

        <div style={{ height: 600, width: "100%" }}>
          {filterMaster.status === "pending" ? (
            <DataGrid
              showToolbar
              rows={rows}
              columns={columns}
              pageSize={10}
              checkboxSelection
              onSelectionChange={(newSelection) => {
                // console.log(newSelection);
                setSelection(
                  newSelection.rowIds.map((rowId) => parseInt(rowId))
                );
              }}
            />
          ) : (
            <DataGrid
              showToolbar
              rows={rows}
              columns={completedColumns}
              pageSize={10}
              checkboxSelection
              onSelectionModelChange={(newSelection) => {
                console.log(newSelection);
                setSelection(
                  newSelection.selectionModel.map((rowId) => parseInt(rowId))
                );
              }}
            />
          )}
        </div>
        {pending && selection.length>0 && (
          <Button
            style={{
              borderRadius: 15,
              margin: "18px ",
              fontSize: "18px",
              right: "0",
            }}
            color="primary"
            variant="contained"
            onClick={handleCompletion}
          >
            Mark as complete
          </Button>
        )}
      </div>
    </Paper>
    </React.Fragment>
  );
}

export default ViewDocumentList;