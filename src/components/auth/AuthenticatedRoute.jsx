// import PropTypes from "prop-types";
// import React from "react";
// import { connect } from "react-redux";
// import { Redirect, Route } from "react-router";
// import AppComponent from "../../AppComponent";
// import fire from "../config/fire";
// import LoginPage from '../pages/LoginPage';
// import HomePage from '../pages/HomePage';
// import { useAuth } from "../../contexts/AuthContext"

// class AuthenticatedRoute extends AppComponent {
//   static propTypes = {
//     component: PropTypes.any.isRequired,
//     authenticated: PropTypes.bool,
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       user: {},
//     };
//   }
  
//   componentDidMount() {
//     this.authListener();
//   }
  // authListener() {
  //   fire.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       this.setState({ user });
  //       console.log("this.state.user",user);
  //     } else {
  //       this.setState({ user: null });
  //     }
  //   });
  // }
  
//   render() {
//     const { component: Component, authenticated, ...rest } = this.props;
//     return (
//       <Route
//         {...rest}
//         render={(props) =>
//           this.state.user != null ? (
//             <Component {...props} />
//           ) : (
//             <Redirect
//               to={{ pathname: "/login", state: { from: props.location } }}
//             />
//           )
//         }
//       />
//     );
//   }

//   render(){
//     return (
//       <div className="App">
//         {this.state.user ? (<HomePage/>) : (<LoginPage/>)}
//       </div>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     authenticated: (state.user || {}).isAuthenticated,
//   };
// }

// export default connect(mapStateToProps)(AuthenticatedRoute);


import React from "react"
import { Route, Redirect } from "react-router-dom"
import fire from "../config/fire";
import { useAuth } from "../../contexts/AuthContext"


export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  
  console.log("currentUser",currentUser)

  return (
    <Route
      {...rest}
      render={props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}