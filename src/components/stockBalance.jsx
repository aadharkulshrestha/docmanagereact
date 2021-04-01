import React, { useCallback, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-toastify";
import DocumentDataService from "./services/DocumentDataService";
import AutoDropDown from "./util/autoDropDown";
import * as Icon from "react-feather";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Tooltip } from '@material-ui/core';


function StockBalance(props) {
  const [customerName, setCustomerName] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [customers, setCustomers] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [tcList, setTcList] = React.useState([]);

  useEffect(() => {
    if (customerName) {
      console.log("useeffect");
      DocumentDataService.getProductList(customerName)
        .then((response) => {
          if (response) {
            console.log(response);
            setProducts(response);
          } else {
            toast.error("Unable to fetch products");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [customerName]);

  const showStockBalance = () => {
    console.log(productName);
    DocumentDataService.fetchTcList(customerName, productName)
      .then((response) => {
        console.log(response);
        setTcList(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleRadioChange = (event) => {
    setProductName(event.target.value);
  };
  const paperStyle = { padding: "2%", width: "100%", margin:  "2% auto" };
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
    console.log("handleChange");
    const name =
      event.target.name == null
        ? ref.current.getAttribute("name")
        : event.target.name;
    const value = event.target.name == null ? val : event.target.value;
    setCustomerName(value);
  };

  return (
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
      <form>
      <h2 className="card-title font-weight-bold font-size-lg" align="center"  ><Icon.Briefcase size="35px" color ="green"/>        STOCK BALANCE</h2>
      <AutoDropDown
        fieldName={"customerName"}
        name={"Customer Name"}
        newValue={false}
        multipleVal={false}
        dropDownValues={customers.map((customers) => customers.customerName)}
        onInputChange={customerSearch}
        handleChange={handleChange}
        currentVal={customerName}
      />
      <br></br>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ display: "block", width: "50%" }}>
          
          <div>
            {products.length > 0 && (
              <FormControl component="fieldset" style={{ fontStyle: "bold" ,margin: "10px" }}>
                <FormLabel component="legend">
                  Choose the Raw material
                </FormLabel>
                <RadioGroup
                  aria-label="period"
                  name="period"
                  value={productName}
                  onChange={handleRadioChange}
                >
                  {products.map((product) => {
                    return (
                      <FormControlLabel
                        key={product.composition}
                        value={product.composition}
                        control={<Radio />}
                        label={product.composition}
                      />
                    );
                  })}
                </RadioGroup>
              </FormControl>
            )}
          </div>
          
          <Button
            color="black"
            size="large"
            variant="contained"
            style={{
              borderRadius: 35,
              bottom: "50",
              right: "0",
              marginTop: "10px",
              float: "left",
            }}
            onClick={showStockBalance}
          >
            <Icon.ArrowRight size="30px"/>
          </Button>
        </div>
        {tcList.length > 0 && (
          <div style={{ width: "60%", borderLeft: "solid" }}>
            <Table>
              <TableHead>
                <TableCell>TC number</TableCell>
                <TableCell>Balance</TableCell>
              </TableHead>
              <TableBody>
                {tcList.map((tc, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell>{tc.tcNumber}</TableCell>
                      <TableCell>{tc.r_tc_bal}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
      </form>
    </React.Fragment>
    </Paper>
  );
}

export default StockBalance;
