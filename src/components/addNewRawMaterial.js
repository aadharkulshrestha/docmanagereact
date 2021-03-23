import { Button, TextField, withStyles, Paper } from "@material-ui/core";
import React from "react";
import { toast } from "react-toastify";
import * as Icon from "react-feather";
import DocumentDataService from "./services/DocumentDataService";
import ViewRmList from "./viewRMList";

const paperStyle = { padding: "5%", width: 600, margin: "40px auto" };

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

function AddNewRawMaterial(props) {
  const [rawMaterial, setRawMaterial] = React.useState({
    serialNumber: "",
    rmName: "",
  });

  const handleSubmit = (event) => {
    if (rawMaterial.rmName === "") {
      toast.error("Error in RM name!!");
      return;
    }
    DocumentDataService.addNewRm(rawMaterial)
      .then((response) => {
        console.log(response);
        toast.success("Created");
        setRawMaterial({
          serialNumber: "",
          rmName: "",
        });
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleChange = (event) => {
    setRawMaterial({
      rmName: event.target.value.toLowerCase(),
    });
  };
  return (
    
    <React.Fragment>
      <Paper elevation={20} style={paperStyle}>
      <h2 className="card-title font-weight-bold font-size-lg" align="center" marginTop="100px"  ><Icon.PlusCircle size="30px" color ="red"/>        RAW MATERIAL</h2>
      <div style={{ display: "block", width: "100%" }}>
      <div className="form-group">
          <label>New Raw MATERIAL</label>
          <input 
          id="rmName" 
          type="text" 
          name="rmName"
          required
          margin="normal"
          variant="outlined"
          className="form-control" 
          placeholder="Enter Raw Material Name*"
          value={rawMaterial.rmName}
          onChange={handleChange}
           />
          </div>
        <Button
          variant="contained"
          size="large"
          color= "black"
          style={{
            
            margin: "20px",
            color: "white",
            float: "right",
          }}
          onClick={handleSubmit}
        >
          <Icon.Check color= "black"/> 
        </Button>

       </div>
       </Paper>
      <ViewRmList rawMaterial={rawMaterial} />
    </React.Fragment>
    
  );
}

export default AddNewRawMaterial;
