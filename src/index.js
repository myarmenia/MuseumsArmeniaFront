import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={store}>
      <GoogleOAuthProvider clientId='398057133080-fa49hes21gkesn181rl90kbjqmvqgh48.apps.googleusercontent.com'>
        <App />
      </GoogleOAuthProvider>
    </Provider>
  </BrowserRouter>,
  // </React.StrictMode>
);
