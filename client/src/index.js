import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { store } from "./redux/store/index";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";



// const domain =  process.env.DOMAIN;
// const clientId = process.env.CLIENTID;
// console.log(domain);
// console.log(clientId);
let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID, REACT_APP_REDIRECT_URL } = process.env

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Auth0Provider
        domain={REACT_APP_DOMAIN}
        clientId={REACT_APP_CLIENT_ID}
        redirectUri={REACT_APP_REDIRECT_URL} // donde estaba
      >
        <App />
      </Auth0Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();