import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store, persistor } from './redux-store/Store';
import Router from './Router';
import { PersistGate } from 'redux-persist/integration/react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './scss/Index.scss';
import reportWebVitals from './reportWebVitals';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#6bafff',
      main: '#1a80ef',
      dark: '#0055bc',
      contrastText: '#ffffff'
    },
    secondary: {
      light: '#ff7870',
      main: '#ec4344',
      dark: '#b3001c',
      contrastText: '#000000'
    }
  }
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <Router />
      {/* </PersistGate> */}
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
