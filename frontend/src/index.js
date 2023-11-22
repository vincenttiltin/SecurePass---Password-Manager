import { BrowserRouter } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import ErrorBoundary from "components/ErrorBoundary";
import {SystemError} from "./pages/SystemError"
import { CookiesProvider } from "react-cookie";

// Set up App with Error Boundary wrapper with fallback in case of error.
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary fallback={<SystemError errorMessage="Something went wrong." />}>
        <CookiesProvider>
        <App />
        </CookiesProvider>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
