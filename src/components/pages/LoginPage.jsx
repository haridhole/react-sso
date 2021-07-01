import { Paper } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { Field, reduxForm } from "redux-form";
import { getAuthToken } from "../../redux-store/actions/authActions";
import AppComponent from "../../AppComponent";
import "./LoginPage.scss";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import fire from "../config/fire";
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [OTP, setOTP] = useState("");
  const history = useHistory();
  const { login, signup } = useAuth();
  const [error, setError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    // await fire.auth().signInWithEmailAndPassword(email,password).then((user)=>{
    // 	history.replace("/")
    // }).catch((err)=>{
    // 	console.log(err);
    // })

    try {
      setError("");
      setLoginLoading(true);
      await login(email, password);
      history.push("/");
    } catch {
      setError("Failed to log in");
    }
    setLoginLoading(false);
  };
  
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          handleMobileSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };
  
  
  const handleOTPSubmit = (e) => {
    e.preventDefault();
    let otpInput = OTP;
    let optConfirm = window.confirmationResult;
    // console.log(codee);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        // User signed in successfully.
        // console.log("Result" + result.verificationID);
        let user = result.user;
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
      });
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();
	const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
		"recaptcha-container",
		{
		  size: "invisible",
		  callback: function (response) {
			console.log("Captcha Resolved");
			handleMobileSubmit();
		  },
		  defaultCountry: "IN",
		}
	  );
    let phoneNumber = "+91" + mobileNumber;
    console.log("phoneNumber",phoneNumber);
    let appVerifier = recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
      })
      .catch(function (error) {
        console.log(error);
      });
  };


  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    history.push("/");
  };

  const facebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    history.push("/");
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        {/* {error && <Alert variant="danger">{error}</Alert>} */}
        <form className="form" noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {/* <FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loginLoading}
            className="submit"
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container justify="flex-end" style={{marginTop: '20px'}}>
            <Grid item>
              <Link href="/signup" variant="body2">
              Don't have an account? Sign up here!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <div className="or-seperator">
        <i>or</i>
      </div>
      <p align="center">Login with your social media account</p>
      <Grid container spacing={2}>
			<Grid item xs={12} sm={6}>
			<FacebookLoginButton
				text="Facebook"
				style={{ maxWidth: "170px", height: "40px" }}
				onClick={facebookLogin}
			/>
			</Grid>
			<Grid item xs={12} sm={6}>
			<GoogleLoginButton
				text="Google"
				style={{ maxWidth: "170px", height: "40px" }}
				onClick={googleLogin}
			/>
			</Grid>
      </Grid>
	  		<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				name="number"
				label="Mobile Number"
				type="number"
				id="number"
				value={mobileNumber}
				onChange={(e) => setMobileNumber(e.target.value)}
				/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className="phone-number"
				onClick={handleMobileSubmit}
			>
				Submit Mobile Number
			</Button>

			<TextField
				variant="outlined"
				margin="normal"
				fullWidth
				name="otp"
				label="OTP"
				type="number"
				id="otp"
				value={OTP}
				onChange={(e) => setOTP(e.target.value)}
				/>
			<Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className="phone-number"
				onClick={handleOTPSubmit}
			>
				Submit OTP
			</Button>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

LoginPage = reduxForm({
  form: "login",
})(LoginPage);

const mapStateToProps = (state) => {
  return {
    user: state.user || {},
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogin: (values) => {
      let currentLocation = window.location.hash.replace("#", "").split("=");
      let redirectTarget =
        currentLocation[0] === "redirect" ? currentLocation[1] : null;
      values["redirectTarget"] = redirectTarget;
      dispatch(getAuthToken(values));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
