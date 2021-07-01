import React, { useState, useEffect }from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { getAuthToken } from '../../redux-store/actions/authActions';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { createUserDocument } from "../config/fire";
import { useHistory } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
  const { signup } = useAuth()
  const history = useHistory()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e) =>{
    e.preventDefault();

    try {
      setError("")
      setLoading(true)
      const { user } = await signup(email,password);
      console.log("user",user);
      await createUserDocument(user, { firstName, lastName });
      history.push("/")
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false)

    // this.setState({ displayName: '', email: '', password: '' });
}

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar className="avatar-logo">
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className="form" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
								name="email"
								type="email"
                autoComplete="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{marginBottom: '10px'}}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
						className="submit-button"
						onClick={handleSignup}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end" style={{marginTop: '10px'}}>
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user || {}
  };
}

const mapDispatchToProps = dispatch => {
  return {

		// submitSignUpForm: form_data => {
    //   return dispatch(
    //     UserActions.submitSignUpForm(form_data)
    //   );
		// },
		
    processLogin: values => {
      let currentLocation = window.location.hash.replace('#', '').split('=');
      let redirectTarget =
        currentLocation[0] === 'redirect' ? currentLocation[1] : null;
      values['redirectTarget'] = redirectTarget;
      dispatch(getAuthToken(values));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);