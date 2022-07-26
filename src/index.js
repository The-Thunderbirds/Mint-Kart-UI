import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import store from './store'
import { Provider } from 'react-redux'
import { SnackbarProvider } from 'notistack';


ReactDOM.render(
  <BrowserRouter>
  <Provider store={store}>
    <SnackbarProvider
      maxSnack={2}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
    >
      <App />
    </SnackbarProvider>
  </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

