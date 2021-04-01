import { TextField, Button, Paper } from "@material-ui/core";
import React from "react";
import axios from "axios";

import { toast } from "react-toastify";
import DropDown from "./util/dropDown";
import http from "./services/httpService";
import { useHistory } from "react-router-dom";

import logo from "../assets/images/app logo.png"

function SignUp(props)  {
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
  const paperStyle = { padding: "4%", width: 500, marginLeft: "800px" , marginTop: "-650px" };
  // const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
  const handleSubmit = () => {
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
  };
  return (
    <React.Fragment >
       <img className="imgLogin" src={logo} alt="Logo" />
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        
        <p className="pLogin" >Doc Management System</p>
    <Paper elevation={20} style={paperStyle}>
    
      <div>
      <h3 className="card-title font-weight-bold font-size-lg" align="center">Register</h3>
      
      <div className="form-group">
            <label>Your Full Name</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Full Name*"
              id=""
              name=""
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
            <label>Username</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Username*"
              id="username"
              name="username"
              required
              fullWidth
              margin="normal"
              variant="outlined"
              label="Username"
              value={credentials.username}
              onChange={handleClick} />
        </div>

        <div className="form-group">
            <label>Mobile No.</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="Enter Mobile no.*"
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
            <label>Address</label>
            <input 
              type="text" 
              className="form-control" 
              placeholder="Enter Your Address*"
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
            <label>Email</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="Enter email*"
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
            placeholder="Enter password*" 
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
        

        
        <div className="form-group">
        <DropDown
          fieldName={"role"}
          name={"role"}
          newValue={false}
          multipleVal={true}
          dropDownValues={["user", "admin"]}
          handleChange={handleClick}
          currentVal={credentials.role}
        />
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
          onClick={handleSubmit}>Register</button>
        <p className="forgot-password text-right">
            Already registered <a href="" onClick={handleLogin} color="inherit">log in?</a>
        </p>
        
      </div>
    
    </Paper>
    </React.Fragment>
  );
}

export default SignUp;
