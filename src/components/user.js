import { Button, TextField,IconButton,Box,Checkbox,ListItem,ListItemIcon,makeStyles,Grid,  CardContent,} from "@material-ui/core";
import React from "react";
import * as Icon from "react-feather";
import {Row, Col,Card,Table, Tabs, Tab} from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import DocumentDataService from "./services/DocumentDataService";
import Chart from 'react-apexcharts';

//import avatar1 from './assets/images/user/avatar1.jpg';
//import avatar2 from './assets/images/user/avatar-2.jpg';
//import avatar3 from './assets/images/user/avatar-3.jpg';

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

const useStyles = makeStyles((theme) => ({
    deck: {
      display: "flex",
      justifyContent: "space-around",
      paddingBottom: theme.spacing(5),
    },
  }));


function User(props) {
    const stylesCss = useStyles();
  const history = useHistory();
  const [updatePassword, setUpdatePassword] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setpassword] = React.useState("");

  const handleAddCustomer = () => {
    history.push("/addDocument");
  };

  const handleviewPendingDoc = () => {
    history.push("/viewPendingDoc");
  };

  const handleviewCompleteDoc = () => {
    history.push("/viewCompleteDoc");
  };

  const handleViewCertificate = () => {
    history.push("/viewCertificate");
  };

  const handleUpdateClick = () => {
    setUpdatePassword(true);
  };
  const handleUpdatePassword = () => {
    setUpdatePassword(false);
    //Backend code
  };

  const handleAddNewUser = () => {
    history.push("/signUp");
  };
  return (
    <React.Fragment>
      <Row>
      <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Pending Documents</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><Icon.ArrowUp color="#66FF66" size='35px' /> 43,512</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">40%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progressbarPending" role="progressbar" style={{width: '40%'}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Complete Documents</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><Icon.ArrowUp color="#66FF66" size='35px' /> 51,200</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">60%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progressbarComplete" role="progressbar" style={{width: '60%'}} aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xl={4}>
                        <Card>
                            <Card.Body>
                                <h6 className='mb-4'>Total Deleted Documents</h6>
                                <div className="row d-flex align-items-center">
                                    <div className="col-9">
                                        <h3 className="f-w-300 d-flex align-items-center m-b-0"><Icon.ArrowDown color="#FF3333" size='35px' />  8,500</h3>
                                    </div>

                                    <div className="col-3 text-right">
                                        <p className="m-b-0">30%</p>
                                    </div>
                                </div>
                                <div className="progress m-t-30" style={{height: '7px'}}>
                                    <div className="progressbarDelete" role="progressbar" style={{width: '30%'}} aria-valuenow="70" aria-valuemin="0" aria-valuemax="100"/>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                    </Row>
                    <br></br>
      <div style={{ display: "block" }}>
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
          
          {/* <Button
            style={{
              borderRadius: 35,
              backgroundColor: "#0099ff",
              padding: "18px 36px",
              fontSize: "18px",
            }}
            variant="contained"
            size="large"
            onClick={handleUpdateClick}
          >
            Reset Password
          </Button> */}
        </div>
        <br></br>
        <Col md={6} xl={8}>
                        <Card className='Recent-Users'>
                            <Card.Header>
                                <Card.Title as='h5'>Recent Users</Card.Title>
                            </Card.Header>
                            <Card.Body className='px-0 py-2'>
                                <Table responsive hover>
                                    <tbody>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Isabella Christensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="dotGreen"/>  11 MAY 12:56</h6>
                                        </td>
                                        <td className="text-center">
                                        <Button >
                                            <font className="adminButtonRej" color="white">rejected</font>
                                            </Button>
                                            <Button>
                                            <font className="adminButtonApprove" color="white">Approve</font>
                                           
                                            </Button>
                                         </td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Mathilde Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="dotRed"/>  11 MAY 10:35</h6>
                                        </td>
                                        
                                        <td className="text-center">
                                        <Button >
                                            <font className="adminButtonRej" color="white">rejected</font>
                                            </Button>
                                            <Button>
                                            <font className="adminButtonApprove" color="white">Approve</font>
                                           
                                            </Button>
                                         </td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar3} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Karla Sorensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="dotGreen"/>   9 MAY 17:38</h6>
                                        </td>
                                        <td className="text-center">
                                        <Button >
                                            <font className="adminButtonRej" color="white">rejected</font>
                                            </Button>
                                            <Button>
                                            <font className="adminButtonApprove" color="white">Approve</font>
                                           
                                            </Button>
                                         </td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar1} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Ida Jorgensen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted f-w-300"><i className="dotRed"/>  19 MAY 12:56</h6>
                                        </td>
                                        <td className="text-center">
                                        <Button >
                                            <font className="adminButtonRej" color="white">rejected</font>
                                            </Button>
                                            <Button>
                                            <font className="adminButtonApprove" color="white">Approve</font>
                                           
                                            </Button>
                                         </td>
                                    </tr>
                                    <tr className="unread">
                                        <td><img className="rounded-circle" style={{width: '40px'}} src={avatar2} alt="activity-user"/></td>
                                        <td>
                                            <h6 className="mb-1">Albert Andersen</h6>
                                            <p className="m-0">Lorem Ipsum is simply dummy text of…</p>
                                        </td>
                                        <td>
                                            <h6 className="text-muted"><i className="dotGreen"/>  21 July 12:56</h6>
                                        </td>
                                        <td className="text-center">
                                        <Button >
                                            <font className="adminButtonRej" color="white">rejected</font>
                                            </Button>
                                            <Button>
                                            <font className="adminButtonApprove" color="white">Approve</font>
                                           
                                            </Button>
                                         </td>
                                        
                                    </tr>
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                    <br></br>
                    <Grid  justify="center" >
         <Card className="mb-4">
            <CardContent className="p-3">
            <Chart options={options} series={series} type="area" />
            </CardContent>
          </Card>
        </Grid>

        {updatePassword && (
          <div style={{ display: "flex" }}>
            <TextField
              id="username"
              name="username"
              type="text"
              variant="outlined"
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
            <TextField
              id="password"
              name="password"
              required
              margin="normal"
              variant="outlined"
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setpassword(event.currentTarget.value)}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleUpdatePassword}
            >
              Submit
            </Button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default User;
