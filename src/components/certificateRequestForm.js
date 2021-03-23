import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  
} from "@material-ui/core";
import axios from "axios";
import React, { useCallback, useEffect , useState} from "react";
import _ from "lodash";

import { toast } from "react-toastify";
import FormData from "form-data";
import { useHistory, useLocation } from "react-router-dom";
import DocumentDataService from "./services/DocumentDataService";
import AutoDropDown from "./util/autoDropDown";

const paperStyle = { padding: 30, width: 700, margin: "40px auto" };


function CertificateRequestForm() {
  const [customers, setCustomers] = React.useState([]);
  const location = useLocation();
  const history = useHistory();
  const [certificateReqObj, setCertificateReqObj] = React.useState({
    tcNumber: 0,
    customerName: "",
    customerLicense: "",
    lastProcessorName: "",
    lastProcessorAddress: "",
    lastProcessorLicense: "",
    dispatchCountry: "",
    buyerAddress: "",
    buyerLicense: "",
    consigneeName: "",
    consigneeAddress: "",
    // consigneeLicense: "",
    destinationCountry: "",
    productionYear: "",
    units: "",
    materialName: "",
    countryOfOrigin: "",
    containerVehicleNo: "",
    sealNo: "",
    identificationCode: "",
  });

  useEffect(() => {
    console.log(location)
    if (location) {
      let temp = location.state.customerName;
      setCertificateReqObj({
        ...certificateReqObj,
        customerName: temp,
      });
    }
  }, []);



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
    setCertificateReqObj({
      ...certificateReqObj,
      [name]:value,
    });
  };

  

  const checkTcNumber = () => {
    DocumentDataService.checkTcNumber(certificateReqObj.tcNumber)
      .then((response) => {
        if (response === true) {
          toast.error("TC number already exists");
          setCertificateReqObj({
            ...certificateReqObj,
            tcNumber: "",
          });
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(certificateReqObj));
    console.log(JSON.stringify(location.state.details));
    console.log(certificateReqObj.customerName);
    const formData = new FormData();
    formData.append(
      "certificateUserDetailsData",
      JSON.stringify(certificateReqObj)
    );
    formData.append("serialNumberList", JSON.stringify(location.state.details));
    DocumentDataService.sendFinalTcData(certificateReqObj.tcNumber, formData)
      .then(() => {
        toast.success("Certificate generated successfully");
        history.push("/dashboard");
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  return (
    <React.Fragment>
      <Grid>
        <Paper elevation={20} style={paperStyle}>
          <div>
            <header>
              <h1>Transaction Certificate Request Form</h1>
            </header>

            <TextField
              id="tcNumber"
              name="tcNumber"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="TC Number"
              value={certificateReqObj.tcNumber}
              onChange={handleChange}
              onBlur={checkTcNumber}
            />
            <TextField
              id="customerName"
              name="customerName"
              required
              disabled
              fullWidth
              margin="normal"
              variant="outlined"
              label="Customer Name"
              value={certificateReqObj.customerName}
              onChange={handleChange}
            />
            {/* <AutoDropDown
              fieldName={"customerName"}
              name={"Customer Name"}
              newValue={false}
              multipleVal={false}
              dropDownValues={customers.map((customers) => customers.customerName)}
              onInputChange={customerSearch}
              handleChange={handleChange}
              currentVal={certificateReqObj.customerName}
            /> */}
            <TextField
              id="customerLicense"
              name="customerLicense"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Seller License"
              value={certificateReqObj.customerLicense}
              onChange={handleChange}
            />

            <TextField
              id="lastProcessorName"
              name="lastProcessorName"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Last Processor Name"
              value={certificateReqObj.lastProcessorName}
              onChange={handleChange}
            />
            <TextField
              id="lastProcessorAddress"
              name="lastProcessorAddress"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Last Processor Address"
              value={certificateReqObj.lastProcessorAddress}
              onChange={handleChange}
            />

            <TextField
              id="lastProcessorLicense"
              name="lastProcessorLicense"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Last Processor License"
              value={certificateReqObj.lastProcessorLicense}
              onChange={handleChange}
            />

            <TextField
              id="dispatchCountry"
              name="dispatchCountry"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Country of Dispatch"
              value={certificateReqObj.dispatchCountry}
              onChange={handleChange}
            />

            <TextField
              id="buyerAddress"
              name="buyerAddress"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Buyer Address"
              value={certificateReqObj.buyerAddress}
              onChange={handleChange}
            />

            <TextField
              id="buyerLicense"
              name="buyerLicense"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Buyer License"
              value={certificateReqObj.buyerLicense}
              onChange={handleChange}
            />

            <TextField
              id="consigneeName"
              name="consigneeName"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Consignee Name"
              value={certificateReqObj.consigneeName}
              onChange={handleChange}
            />
            <TextField
              id="consigneeAddress"
              name="consigneeAddress"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Consignee Address"
              value={certificateReqObj.consigneeAddress}
              onChange={handleChange}
            />

            {/* <TextField
              id="consigneeLicense"
              name="consigneeLicense"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Consignee License"
              value={certificateReqObj}
              onChange={handleChange}
            /> */}

            <TextField
              id="destinationCountry"
              name="destinationCountry"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Destination Country"
              value={certificateReqObj.destinationCountry}
              onChange={handleChange}
            />

            <TextField
              id="productionYear"
              name="productionYear"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Production Year"
              value={certificateReqObj.productionYear}
              onChange={handleChange}
            />

            <TextField
              id="units"
              name="units"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Units"
              value={certificateReqObj.units}
              onChange={handleChange}
            />

            <TextField
              id="materialName"
              name="materialName"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Material Name"
              value={certificateReqObj.materialName}
              onChange={handleChange}
            />

            <TextField
              id="countryOfOrigin"
              name="countryOfOrigin"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Country of Origin"
              value={certificateReqObj.countryOfOrigin}
              onChange={handleChange}
            />

            <TextField
              id="containerVehicleNo"
              name="containerVehicleNo"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Container Number"
              value={certificateReqObj.containerVehicleNo}
              onChange={handleChange}
            />
            <TextField
              id="sealNo"
              name="sealNo"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Seal Number"
              value={certificateReqObj.sealNo}
              onChange={handleChange}
            />
            <TextField
              id="identificationCode"
              name="identificationCode"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Identification Code"
              value={certificateReqObj.identificationCode}
              onChange={handleChange}
            />
            {/* <FormControl component="fieldset" style={{ marginTop: "20px" }}>
              <FormLabel style={{ marginRight: "72%" }}>
                Certification Program:{" "}
              </FormLabel>
              <RadioGroup
                aria-label="certificationProgram"
                name="certificationProgram"
                row
              >
                <FormControlLabel
                  value="gots"
                  control={<Radio />}
                  label="GOTS"
                />
                <FormControlLabel value="ocs" control={<Radio />} label="OCS" />
                <FormControlLabel value="grs" control={<Radio />} label="GRS" />
                <FormControlLabel value="rcs" control={<Radio />} label="RCS" />
                <FormControlLabel value="ccs" control={<Radio />} label="CCS" />
                <FormControlLabel value="rws" control={<Radio />} label="RWS" />
                <FormControlLabel value="rds" control={<Radio />} label="RDS" />
              </RadioGroup>
            </FormControl> */}

            <Button
              size="large"
              style={{
                backgroundColor: "#62da62",
                color: "white",
                marginTop: "80px",
              }}
              onClick={handleSubmit}
            >
              Generate Certificate
            </Button>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
}

export default CertificateRequestForm;
