import React from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {BrowserRouter as Router, Route, BrowserRouter} from "react-router-dom";
import { IntlProvider, addLocaleData } from "react-intl";
import firebase from "firebase";
import en from "react-intl/locale-data/en";
import es from "react-intl/locale-data/es";
import fr from "react-intl/locale-data/fr";
import de from "react-intl/locale-data/de";
import zh from "react-intl/locale-data/zh";
import registerServiceWorker from "./registerServiceWorker";
import localeData from "./data.json";
import configureStore from "./redux/configure-store";
import "./index.scss";
import "./styles/bootstrap.scss";

import Routes from "./routes";

import App from "./screens/App/dashboard/Overview/Overview";

let store = configureStore();

var config = {
  apiKey: "AIzaSyBRz40l7pGGeMsprwnXqcnPy4cshNQrXcg",
  authDomain: "greatpatriots-d2048.firebaseapp.com",
  databaseURL: "https://greatpatriots-d2048.firebaseio.com",
  projectId: "greatpatriots-d2048",
  storageBucket: "greatpatriots-d2048.appspot.com",
  messagingSenderId: "753608122470"
};
firebase.initializeApp(config);


addLocaleData([...en, ...es, ...fr, ...de, ...zh]);
let language =
  (navigator.languages && navigator.languages[0]) ||
  navigator.language ||
  navigator.userLanguage;
if (language.indexOf("-") !== -1) language = language.split("-")[0];

if (language.indexOf("_") !== -1) language = language.split("_")[0];
const messages = localeData[language] || localeData.en;
ReactDOM.render(
  <Provider store={store}>
    <IntlProvider locale={language} messages={messages}>
      <BrowserRouter>
        <div>
          <Routes />
          <App />
        </div>
      </BrowserRouter>
    </IntlProvider>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
