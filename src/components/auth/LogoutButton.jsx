import { Button } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { invalidateAuth } from '../../redux-store/actions/authActions';
import AppComponent from '../AppComponent';
import * as ls from 'local-storage';
import { LOCAL_STORAGE_X_AUTH_KEY } from '../../constant';

class LogoutButton extends AppComponent {
  logout() {
    this.props.invalidateAuth();
    ls.remove(LOCAL_STORAGE_X_AUTH_KEY);
  }

  render() {
    return (
      <div
        style={{ position: 'absolute', right: '20px' }}
        className="logout-button"
      >
        <Button
          style={{ color: 'white' }}
          className="btn-logout"
          onClick={this.logout.bind(this)}
        >
          Logout
        </Button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return { invalidateAuth: () => dispatch(invalidateAuth()) };
}

export default connect(
  null,
  mapDispatchToProps
)(LogoutButton);
