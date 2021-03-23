import { TextField, Button, Paper ,Avatar,Box,} from "@material-ui/core";
import React from "react";
import axios from "axios";
import * as Icon from "react-feather";
//import avatar1 from './assets/images/user/avatar-1.jpg';
import { toast } from "react-toastify";
import DropDown from "./util/dropDown";
import http from "./services/httpService";
import { useHistory } from "react-router-dom";


function Profile(props)  {
  const history = useHistory();
  const [credentials, setCredentials] = React.useState({
    username: "",
    email: "",
    password: "",
    role: [],
  });

  const handleLogin = () => {
    history.push("/login");
  };

  const handleClick = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const paperStyle = { padding: "5%", width: 900, margin: "40px auto" };
  // const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
  /*const handleSubmit = () => {
    http
      // .post("http://192.168.1.41:8080/signup", credentials)
      .post("http://localhost:8080/signup", credentials)

      .then((response) => {
        console.log(response);
        toast.success(response.data);
        history.push("/login");
      })
      .catch((error) => {
        toast.error(error);
      });
  };*/
  return (
   
    <Paper elevation={20} style={paperStyle}>
    <React.Fragment >
      <div>
      <h3 className="card-title font-weight-bold font-size-lg" align="center">MY ACCOUNT</h3>
      <Avatar align="center"
            rounded
            source={{
              
            }}
            size="xlarge"
            //onPress={() => this.selectPicture()}
            showEditButton
          />
        
      <div className="form-group">
            <label> Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Full Name*"
              id=""
              name=""
              required
              width="50%"
              margin="normal"
              variant="outlined"
              label="name"
              //value={credentials.username}
              //onChange={handleClick} 
              /><Icon.Edit/>
        </div>
        
        <div className="form-group">
            <label>Your Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Username*"
              id="username"
              name="username"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Username"
              //value={credentials.username}
              //onChange={handleClick} 
              />
        </div>

        <div className="form-group">
            <label>Mobile No.</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder=" Mobile no.*"
              id=""
              name=""
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Mobile No."
              //value={credentials.email}
              //onChange={handleClick} 
              />
        </div>

        <div className="form-group">
            <label>Your Address</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Your Address*"
              id=""
              name=""
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Address"
              //value={credentials.email}
              //onChange={handleClick} 
              />
        </div>

        <div className="form-group">
            <label>Your Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder=" email*"
              id="email"
              name="email"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Email"
              value={credentials.email}
              onChange={handleClick} />
        </div>


        <div className="form-group">
            <label>Password</label>
            <input 
            type="password" 
            className="form-control" 
            placeholder=" password*" 
            id="password"
            name="password"
            required
            fullWidth
            margin="normal"
            variant="outlined"
            type="password"
            label="Password"
            value={credentials.password}
            onChange={handleClick}/>
        </div>
        

        
        

        <button 
          type="submit" 
          className="btn btn-dark btn-lg btn-block"
          color="primary"
          size="large"
          variant="contained"
          style={{
            borderRadius: 35,
            bottom: "50",
            right: "0",
            float: "right",
          }}
          //onClick={handleSubmit}
          >Register</button>
        
      </div>
    </React.Fragment>
    </Paper>
  );
}

export default Profile;
