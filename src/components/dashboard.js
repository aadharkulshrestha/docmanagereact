import { Button, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Icon from "react-feather";
import { Grid, Card, CardContent, Divider,ListItem,ListItemIcon } from '@material-ui/core';

import CustomizedTable from "./customizedTable";
import DocumentDataService from "./services/DocumentDataService";
import Chart from 'react-apexcharts';

const useStyles = makeStyles((theme) => ({
  deck: {
    display: "flex",
    justifyContent: "space-around",
    paddingBottom: theme.spacing(5),
  },
}));


const options = {
  xaxis: {
    categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  }
};


const series = [
  {
    name: 'series-1',
    data: [30, 40, 25, 50, 49, 21, 70, 51]
  },
  {
    name: 'series-2',
    data: [23, 12, 54, 61, 32, 56, 81, 19]
  }
];

const RadicalSeries = [44, 55, 67, 83];
  const RadicalOptions = {
    chart: {
      height: 350,
      type: 'radialBar'
    },

    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px'
          },
          value: {
            fontSize: '16px'
          },
          total: {
            show: true,
            label: 'Total',
            formatter: function() {
              return 249;
            }
          }
        }
      }
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries']
  };
function Dashboard(props) {
  const stylesCss = useStyles();

  const [docsData, setDocsData] = useState([]);
  const [completeDocsData, setCompleteDocsData] = useState([]);
  const history = useHistory();
  const [pending, setPending] = useState(false);
  const [complete, setComplete] = useState(false);

  const handleAddCustomer = () => {
    history.push("/addDocument");
  };

  const handleviewPendingDoc = () => {
    history.push("/viewPendingDoc");
  };

  const handleviewCompleteDoc = () => {
    history.push("/viewCompleteDoc");
  };

  useEffect(() => {
    DocumentDataService.fetchPendingDocuments().then((resp) => {
      console.log(resp);
      setDocsData(resp);
    });
  }, []);


  const handleUpdateCustomer = (row) => {
    history.push({
      pathname: "/addDocument/" + row.serialNumber,
      data: row,
    });
  };
  

  const handleViewCertificate = () => {
    history.push("/viewCertificate");
  };
  const handleCertificateClick = (row) => {
    DocumentDataService.regenerateCertificate(row.finalTcNumber)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handleCompleteClick = (row) => {
    DocumentDataService.markAsComplete(row.serialNumber)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const handleTableClick = (row) => {
    history.push({
      pathname: "/viewDocument/" + row.serialNumber,
      data: row,
    });
  };

  return (
    <React.Fragment>
      <div>
      <Grid container spacing={4}>
        <Grid item xs={12} sm={6} md={4}>
          <Card  className="dashboardCard1">
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    TOTAL PENDING DOCUMENTS
                  </small>
                  <span className="text-white px-1">586,356</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-success d-50 rounded-circle d-flex align-items-center justify-content-center">
                <Icon.BarChart size="40px"/>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <Icon.ArrowUp color="#318B40"/>
                <span className="text-success pr-1">15.4%</span>
                <span className="text-white-50">increase this month</span>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card  className="dashboardCard2">
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    TOTAL COMPLETED DOCUMENTS
                  </small>
                  <font  className="text-white px-1">23,274</font>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">

                <Icon.Award size="40px"/>

                  </div>
                </div>
              </div>
              <div className="mt-3">
              <Icon.ArrowUp color="#FFC13D"/>
                <span className="text-warning pr-1">7.4%</span>
                <span className="text-white-50">same as before</span>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card className="dashboardCard3">
            <CardContent className="p-3">
              <div className="d-flex align-items-start">
                <div className="font-weight-bold">
                  <small className="text-white-50 d-block mb-1 text-uppercase">
                    FAILED/DELETE
                  </small>
                  <span className="text-white px-1">345</span>
                </div>
                <div className="ml-auto">
                  <div className="bg-white text-center text-primary d-50 rounded-circle d-flex align-items-center justify-content-center">
                  <Icon.AlertCircle size="40px" color="red"/>
                  </div>
                </div>
              </div>
              <div className="mt-3">
              <Icon.ArrowDown color="white"/>
                <span className="text-white px-1">15.4%</span>
                <span className="text-white-50">less orders</span>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <br></br>
        <div className={stylesCss.deck}>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#0099ff",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
            onClick={handleAddCustomer}
          >
            Add Document
          </Button>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#21b6ae",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
            onClick={handleviewPendingDoc}
          >
            View Pending Documents
          </Button>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "orange",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
            onClick={handleviewCompleteDoc}
          >
            View Completed Documents
          </Button>
          <Button
            style={{
              borderRadius: 35,
              backgroundColor: "red",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
            onClick={handleViewCertificate}
          >
            View Certificate Data
          </Button>
        </div>
        <Grid  justify="center" >
         <Card className="mb-4">
            <CardContent className="p-3">
            <Chart options={options} series={series} type="area" />
            </CardContent>
          </Card>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default Dashboard;
