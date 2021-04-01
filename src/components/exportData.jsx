import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Paper,
} from "@material-ui/core";
import React from "react";
import * as Icon from "react-feather";
import { toast } from "react-toastify";
import DocumentDataService from "./services/DocumentDataService";
import { Tooltip } from '@material-ui/core';

function ExportData(props) {
  const [value, setValue] = React.useState("");
  const [schedule, setSchedule] = React.useState({
    StartDate: "",
    EndDate: "",
  });
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleDownload = () => {
    console.log(schedule);
    if (value === "periodic") {
      DocumentDataService.downloadPeriodic(schedule).then((response) => {});
      // .catch((error) => {
      //   toast.error(error);
      // });
    } else {
      DocumentDataService.downloadAll()
        .then((response) => {
          // window.open(response);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  const paperStyle = { padding: "5%", width: "50%", margin: "2% auto" };
  const handleDateChange = (event) => {
    setSchedule({ ...schedule, [event.target.name]: event.target.value });
  };

  function ValidateDate(sdate, edate) {
    if (
      new Date(sdate) > new Date(edate) ||
      new Date(edate) < new Date(sdate)
    ) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment>
    <h2 className="card-title font-weight-bold font-size-lg" align="center" marginTop="100px"  >        EXPORT MATERIAL</h2>
      <br></br>
      <br></br>
      <form>
      <div classname="form-group" style={{ display: "block" }}>
        <div>
          <FormControl component="fieldset">
            <FormLabel component="legend">Choose the data period</FormLabel>
            <RadioGroup
              aria-label="period"
              name="period"
              value={value}
              onChange={handleChange}
            >
              <FormControlLabel
                value="periodic"
                control={<Radio />}
                label="Periodical Data"
              />
              <FormControlLabel
                value="all"
                control={<Radio />}
                label="All Data"
              />
            </RadioGroup>
          </FormControl>
          {value === "periodic" && (
            <div>
              <TextField
                id="StartDate"
                label="From:"
                variant="outlined"
                name="StartDate"
                type="date"
                margin="normal"
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="EndDate"
                label="To:"
                variant="outlined"
                name="EndDate"
                type="date"
                margin="normal"
                onChange={handleDateChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          )}
        </div>
        <br></br>
        <Tooltip title="Download">
        <Button
          variant="contained"
          color = "#66FF66"
          style={{
            width:"100%",
            margin: "20px",
            
            //float: "left",
          }}
          onClick={handleDownload}
        >
          <Icon.DownloadCloud size="25px"/>
        </Button>
        </Tooltip>
        {/* <a href={"http://localhost:8080/PendingExcel"}>Export</a>
        <a href="#" onClick={handleDownload}>
          Download
        </a> */}
      </div>
      </form>
    </React.Fragment>
    </Paper>
  );
}

export default ExportData;
