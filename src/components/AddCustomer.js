import {
  Button,
  Checkbox,
  FormControlLabel,
  InputLabel,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthenticationService from "./services/AuthenticationService";
import DocumentDataService from "./services/DocumentDataService";
import FormData from "form-data";

function AddCustomer(params) {
  const [documentObj, setDocumentObj] = useState({
    documentNumber: "",
    user: AuthenticationService.getLoggedInUserName(),
    customerName: "",
    customerAddress: "",
    documentUpload1: [],
    documentUpload2: [],
    documentUpload3: [],
    documentUpload4: [],
    documentUpload5: [],
    timeStampCreated: null,
    timeStampUpdated: null,
    product: "",
    volumeIn: 0,
    volumeOut: 0,
    documentValidate1: false,
    documentValidate2: false,
    documentValidate3: false,
    documentValidate4: false,
    documentValidate5: false,
    status: "",
  });
  const [dataObj, setDataObj] = useState({
    documentNumber: "",
    user: AuthenticationService.getLoggedInUserName(),
    customerName: "",
    customerAddress: "",
    timeStampCreated: null,
    timeStampUpdated: null,
    product: "",
    volumeIn: 0,
    volumeOut: 0,
    documentValidate1: false,
    documentValidate2: false,
    documentValidate3: false,
    documentValidate4: false,
    documentValidate5: false,
    status: "",
  });

  const handleVerify = () => {
    DocumentDataService.verifyVolume(dataObj).then((response) => {
      if (!response) {
        toast.error("ASAMBHAV!!");
      }
    });
  };

  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [byteimage, setByteimage] = useState();

  const handleFileChange = (event) => {
    // console.log("handle file change ============");
    // console.log(event.target);
    // console.log(event.target.name);
    // console.log(event.target.files[0]);
    setDocumentObj({
      ...documentObj,
      [event.target.name]: event.target.files[0],
    });
    // setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "image",
      documentObj.documentUpload1
      // name: documentObj.documentUpload1.name,
      // type: "image/jpg",
    );
    console.log(documentObj.documentUpload1.name);
    formData.append("data", JSON.stringify(dataObj));

    const config = {
      headers: {
        "Content-Type": `multipart/form-data`,
        // enctype: `multipart/form-data`,
      },
    };

    // const url = "http://192.168.1.41:8080/save";
    const url = "http://localhost:8080/save";

    console.log(documentObj);
    for (var value of formData.values()) {
      console.log(value);
    }

    axios
      .post(url, formData)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const val = event.target.value;
    setDataObj({
      ...dataObj,
      [name]: val,
    });
  };

  const handleAssignmentCheck = (event) => {
    // setChecked(event.target.checked);
    setDataObj({
      ...dataObj,
      [event.target.name]: event.target.checked,
    });
  };

  const handleSubmit = () => {
    // DocumentDataService.saveDocData(documentObj).then((response) => {
    //   console.log(response);
    // });
    // axios.get("http://192.168.1.41:8080/findAll").then((res) => {
      axios.get("http://localhost:8080/findAll").then((res) => {

      if (res) {
        // console.log(res.data[0].documentUpload1);
        setByteimage(res.data[0].documentUpload1);
      } else {
        toast.error("Couldn't load image");
      }
    });
  };

  return (
    <React.Fragment>
      <div>
        <TextField
          id="customername"
          name="customerName"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          label="Customer name"
          value={dataObj.customerName}
          onChange={handleChange}
        />
        <TextField
          id="customerAddress"
          name="customerAddress"
          required
          fullWidth
          margin="normal"
          variant="outlined"
          label="Customer Address"
          value={dataObj.customerAddress}
          onChange={handleChange}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TextField
            id="documentNumber"
            name="documentNumber"
            required
            margin="normal"
            variant="outlined"
            label="document Number"
            value={dataObj.documentNumber}
            onChange={handleChange}
          />
          <TextField
            id="product"
            name="product"
            required
            margin="normal"
            variant="outlined"
            label="Product"
            value={dataObj.product}
            onChange={handleChange}
          />
          <div>
            <TextField
              id="volumeIn"
              name="volumeIn"
              required
              margin="normal"
              variant="outlined"
              label="Volume In"
              value={dataObj.volumeIn}
              onChange={handleChange}
            />
            <TextField
              id="volumeOut"
              name="volumeOut"
              required
              margin="normal"
              variant="outlined"
              label="Volume Out"
              value={dataObj.volumeOut}
              onChange={handleChange}
            />
            <Button
              style={{
                backgroundColor: "#0099ff",
                height: "36px",
                width: "48px",
                marginTop: "24px",
                marginLeft: "12px",
              }}
              variant="contained"
              size="small"
              onClick={handleVerify}
            >
              Verify
            </Button>
          </div>
          <TextField
            id="status"
            name="status"
            required
            margin="normal"
            variant="outlined"
            label="Status"
            value={dataObj.status}
            onChange={handleChange}
          />
        </div>
        <InputLabel for="document1">Document 1</InputLabel>
        <input
          type="file"
          id="document1"
          name="documentUpload1"
          value={name}
          onChange={handleFileChange}
        />
        <button onClick={onFileUpload}>Upload!</button>
        <FormControlLabel
          control={
            <Checkbox
              checked={dataObj.documentValidate1}
              onChange={(event) => handleAssignmentCheck(event)}
              name="documentValidate1"
              color="primary"
            />
          }
          label="Verified?"
        />

        <InputLabel for="document2">Document 2</InputLabel>
        <input
          type="file"
          id="document2"
          name="documentUpload2"
          value={documentObj.documentUpload2}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataObj.documentValidate2}
              onChange={(event) => handleAssignmentCheck(event)}
              name="documentValidate2"
              color="primary"
            />
          }
          label="Verified?"
        />

        <InputLabel for="document3">Document 3</InputLabel>
        <input
          type="file"
          id="document3"
          name="documentUpload3"
          value={documentObj.documentUpload3}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataObj.documentValidate3}
              onChange={(event) => handleAssignmentCheck(event)}
              name="documentValidate3"
              color="primary"
            />
          }
          label="Verified?"
        />

        <InputLabel for="document4">Document 4</InputLabel>
        <input
          type="file"
          id="document4"
          name="documentUpload4"
          value={documentObj.documentUpload4}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataObj.documentValidate4}
              onChange={(event) => handleAssignmentCheck(event)}
              name="documentValidate4"
              color="primary"
            />
          }
          label="Verified?"
        />

        <InputLabel for="document5">Document 5</InputLabel>
        <input
          type="file"
          id="document5"
          name="documentUpload5"
          value={documentObj.documentUpload5}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={dataObj.documentValidate5}
              onChange={(event) => handleAssignmentCheck(event)}
              name="documentValidate5"
              color="primary"
            />
          }
          label="Verified?"
        />
        <div
          style={
            {
              // display: "flow",
            }
          }
        >
          <Button
            size="large"
            style={{
              backgroundColor: "green",
              marginRight: "12",
            }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            size="large"
            style={{
              backgroundColor: "red",
            }}
          >
            Reset Data
          </Button>
        </div>
        <img alt="bike.png" src={`data:image/png;base64,${byteimage}`} />
      </div>
    </React.Fragment>
  );
}

export default AddCustomer;
