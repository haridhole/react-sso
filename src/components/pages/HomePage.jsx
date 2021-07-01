import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import fire from "../config/fire";
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import userActions from '../../redux-store/actions/userActions';
import HelperSelector from '../HelperSelector';
import ReactJson from 'react-json-view'

function HomePage(props) {

  useEffect(() => {
    props.submitGetUser();
  }, []);

  const logout = () => {
    fire.auth().signOut();
  }

  return (
    <div>
      <h1>You are logged in !!!</h1>

      <div style={{ marginLeft: '20px', marginBottom: '30px'}}>
          <Link href="admin" style={{ marginRight: '20px'}}>
              {"Admin Page"}
          </Link>
          &nbsp;
          <Link href="user" variant="body2">
              {"User Page"}
          </Link>
      </div>
      {props.user&&props.user.data?<ReactJson src={props.user.data} />:''}
      <Button style={{ margin: '50px'}} variant='contained' onClick={logout}>Logout</Button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const helperSelector = HelperSelector(state.user);

  return {
    user: helperSelector.getuserData(),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitGetUser: () => 
      dispatch(userActions.submitGetUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);