import React, { useEffect, useState } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";
import {
  FormControl,
  TextField,
  Button,
  Paper,
  makeStyles,
  Typography,
  Container,
  Grid,
  CardMedia,
} from "@material-ui/core";
import AuthenticationService from "./services/AuthenticationService";
import authService from "./services/authService";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  link: {
    marginTop: theme.spacing(2),
    component: "h6",
    align: "left",
    textDecoration: "none",
    "&:hover": { color: "red" },
  },
  media: {
    height: "100%",
  },
  btn: {
    display: "flex",
    padding: theme.spacing(2),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function Login(props) {
  const classes = useStyles();
  const [username, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [hasLoginFailed, setHasLoginFailed] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const history = useHistory();

  const onEnter = (event, callback) => event.key === "Enter" && callback(event);

  const handleRegister = () => {
    history.push("/signUp");
  };
  // const paperStyle = { padding: "2%", width: "100%", margin: "2% auto" };
  const paperStyle = { padding: "4%", width: 700, margin: "40px auto" };
  const doLogin = async (event) => {
    console.log("dologin");
    // console.log(event);
    if (event) {
      event.preventDefault();
    }
    await authService
      .login(username, password)
      .then(() => {
        // console.log("SUccessfully logged in");
        // AuthenticationService.registerSuccessfulLogin(username, password);
        // history.push({ pathname: "/dashboard", state: username });
        window.location = "/dashboard";
      })
      .catch(() => {
        setShowSuccessMessage(false);
        setHasLoginFailed(true);
      });
  };
  if (authService.getCurrentUser()) {
    return <Redirect to="/dashboard" />;
  } else {
    return (
      <Paper elevation={20} style={paperStyle}>
      <React.Fragment>
        {hasLoginFailed && <h2>Invalid user details</h2>}


        <form>

          <h2 className="card-title font-weight-bold font-size-lg" align="center" >Log in</h2>


          <div className="form-group">
          <label>Username</label>
          <input 
          id="uname" 
          type="email" 
          name="uname"
          required
         
          margin="normal"
          variant="outlined"
          className="form-control" 
          placeholder="Enter username*"
          value={username}
          onChange={(event) => setuserName(event.currentTarget.value)}
           />
          </div> 


          <div className="form-group">
          <label>Password</label>
          <input 
          type="password" 
          className="form-control" 
          id="password"
          name="password"
          required
          
          margin="normal"
          variant="outlined"
          value={password}
          onChange={(event) => setpassword(event.currentTarget.value)}
          onKeyPress={(e) => onEnter(e, doLogin)}
          placeholder="Enter Password*" />
          </div>

          <button 
            type="submit" 
            className="btn btn-dark btn-lg btn-block"
            size="large"
            variant="contained"
            style={{ marginLeft: "2%" }}
            onClick={doLogin}
          >Sign in</button>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          <Grid container className={classes.btn}>
            
            <Button
              style={{ backgroundColor: "#343A40" , marginRight: "2%"}}
              size="large"
              variant="contained"
              color="primary"
              onClick={handleRegister}
            >
              Register
            </Button>
            
          </Grid>
        </form>
      </React.Fragment>
      </Paper>
    );
  }
}

export default Login;

// const doLogin = async (event) => {
//   event.preventDefault();
//   const errors = validate();
//   setErrors({ errors: errors || {} });
//   if (errors) {
//     setisError(true);
//     return;
//   }

//   await auth
//     .login(username, password)
//     .then(function (response) {
//       console.log(response);
//       auth.generateOtp();
//       setOtp(true);
//       return auth.generateOtp();
//     })
//     .catch(function (error) {
//       console.log("login error--" + error.response.data);
//       toast.error(error.response.data);
//     });
// };

// const validate = () => {
//   const result = Joi.validate({ username, password }, schema, {
//     abortEarly: false,
//   });

//   if (!result.error) return null;

//   const errors = {};
//   for (let item of result.error.details) errors[item.path[0]] = item.message;

//   return errors;
// };

// const schema = {
//   username: Joi.string().required().label("Username"),
//   password: Joi.string().required().label("Password"),
// };

// const doOtpAuth = async () => {
//   try {
//     await auth.otpAuth(otpValue);
//     const profile = await auth.getUserRole();
//     const { state } = props.location;
//     if (profile === "SUPERUSER") {
//       window.location = "/admin-panel";
//     } else {
//       window.location = state ? state.from.pathname : "/dashboard";
//     }
//   } catch (error) {
//     if (error.response) {
//       //setOtp(false);
//       // setErrors(error.response.data);
//       // setisError(true);
//       toast.error(error.response.data);
//     }
//   }
// };

// if (auth.getCurrentUser()) {
//   return <Redirect to="/dashboard" />;
// } else {
//   return (
//     <>
//       <div className={classes.appBarSpacer} />
//       <main className={classes.content}>
//         <Container maxWidth="lg" className={classes.container}>
//           <Grid spacing={4} container>
//             <Grid item xs={false} sm={4} md={6} lg={8}>
//               <Paper className={classes.paper}>
//                 <CardMedia
//                   image={loginImage}
//                   className={classes.media}
//                 ></CardMedia>
//               </Paper>
//             </Grid>

//             <Grid item xs={6} sm={4} md={6} lg={4}>
//               <Paper className={classes.paper}>
//                 <FormControl>
//                   <Title>Login</Title>
//                   {isError && (
//                     <div className="alert alert-danger">
//                       {errors.errors.username}
//                       <br />
//                       {errors.errors.password}
//                     </div>
//                   )}
//                   {!otp && (
//                     <React.Fragment>
//                       <TextField
//                         id="uname"
//                         name="uname"
//                         required
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         label="Username"
//                         value={username}
//                         onChange={(event) =>
//                           setuserName(event.currentTarget.value)
//                         }
//                       />
//                       <TextField
//                         id="password"
//                         name="password"
//                         required
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         type="password"
//                         label="Password"
//                         value={password}
//                         onChange={(event) =>
//                           setpassword(event.currentTarget.value)
//                         }
//                       />
//                       <Grid container>
//                         <Grid item xs={6} sm={6} lg={6}>
//                           <Link
//                             className={classes.link}
//                             to="/forgot-password"
//                             variant="body2"
//                           >
//                             <Typography component="h6">
//                               Forgot password?
//                             </Typography>
//                           </Link>
//                         </Grid>
//                       </Grid>
//                       <Grid container className={classes.btn}>
//                         <Button
//                           type="submit"
//                           size="large"
//                           variant="contained"
//                           color="primary"
//                           fullWidth
//                           onClick={doLogin}
//                         >
//                           Get OTP
//                         </Button>
//                       </Grid>
//                     </React.Fragment>
//                   )}
//                   {otp && (
//                     <React.Fragment>
//                       <TextField
//                         id="otpval"
//                         name="otp"
//                         required
//                         fullWidth
//                         margin="normal"
//                         variant="outlined"
//                         label="OTP"
//                         value={otpValue}
//                         onChange={(event) =>
//                           setOtpValue(event.currentTarget.value)
//                         }
//                       />
//                       <Grid container className={classes.btn}>
//                         <Button
//                           type="submit"
//                           size="large"
//                           variant="contained"
//                           color="primary"
//                           fullWidth
//                           onClick={doOtpAuth}
//                         >
//                           Sign in
//                         </Button>
//                       </Grid>
//                     </React.Fragment>
//                   )}
//                 </FormControl>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </main>
//     </>
//   );
// }
