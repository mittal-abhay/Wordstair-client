import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import GameProvider from "./context/GameContext";
// import reportWebVitals from './reportWebVitals';

import "./fonts/comic/COMIC.TTF";
import "./fonts/comic/comici.ttf";
import "./fonts/comic/ComicSansMS3.ttf";
import "./fonts/comic/comicz.ttf";
import "./fonts/comic/design.graffiti.comicsansms.ttf";
import "./fonts/comic/design.graffiti.comicsansmsgras.ttf";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <App />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
