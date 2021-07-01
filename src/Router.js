import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthenticatedRoute from './components/auth/AuthenticatedRoute';
import LoginPage from './components/pages/LoginPage';
import SignUpPage from './components/pages/SignUpPage';
import HomePage from './components/pages/HomePage';
import { connect } from 'react-redux';
import routeConfig from './routeConfig';
import { AuthProvider } from "./contexts/AuthContext";

class Router extends React.Component {
  render() {
    const routes = routeConfig();
    return (
      <BrowserRouter>
        <div>
          {/* {this.props.authenticated ? (
            <div id="header">
              <Header />
            </div>
          ) : null} */}
          <AuthProvider id="content">
            <Switch>
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/signup" component={SignUpPage} />
              {Object.keys(routes).map((x, index) => (
                <AuthenticatedRoute
                  exact
                  key={index}
                  path={routes[x].path}
                  component={routes[x].component}
                />
              ))}
            </Switch>
          </AuthProvider>
        </div>
          {/* <AuthProvider>
            <Switch>
              <AuthenticatedRoute exact path="/" component={HomePage} />
              <Route path="/signup" component={SignUpPage} />
              <Route path="/login" component={LoginPage} />
            </Switch>
          </AuthProvider> */}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: (state.user || {}).isAuthenticated
  };
};

export default connect(mapStateToProps)(Router);
