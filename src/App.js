import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./screens/home/Home";
import Game from "./screens/game/Game";
import { useAuth } from "./context/AuthContext";
import Login from "./screens/login/Login";

import axios from "axios";
import PrivateRoute from "./components/private-routes/PrivateRoute";
import Signup from "./screens/login/Signup";
import Loading from "./components/loading/Loading";
import ServerErrorDialogbox from "./components/server-errors-dialogbox/ServerErrorDialogbox";
axios.defaults.withCredentials = true;

function App() {
  const { loading, serverError } = useAuth();

  return (
    <div>
      {serverError && (
        <ServerErrorDialogbox
          message={serverError.message}
          details={serverError.details}
        />
      )}
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route exact path="" element={<Home />} />
          </Route>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route path="/game" element={<PrivateRoute />}>
            <Route exact path="" element={<Game />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
