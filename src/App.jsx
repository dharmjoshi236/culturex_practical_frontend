import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import AuthModule from "./pages/auth";
import checkTokenInLocalStorage from "./helpers/checkForTokenInLocalStorage";
import ProtectedRouteSystem from "./ProtectedRoute";
import HomePage from "./pages/home";
import AddMediaForm from "./pages/addMedia";
import { ToastContainer } from "react-toastify";

function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    let checkLocalStorageForToken = checkTokenInLocalStorage();
    setIsAuth(checkLocalStorageForToken);
  }, []);

  let clientId = import.meta.env.VITE_CLIENT_ID;

  return (
    <BrowserRouter>
     <ToastContainer/>
      <Routes>
        <Route element={<ProtectedRouteSystem />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/addMedia" element={<AddMediaForm />} />
        </Route>

        {isAuth ? (
          <Route exact path="/login" element={<Navigate to={"/home"} />} />
        ) : (
          <Route path="*" element={<Navigate to={"/login"} />} />
        )}

        <Route
          exact
          path="/login"
          element={<AuthModule clientId={clientId} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

//56083778002-jvpeve3hqbisc774mrpllgn64napo8mt.apps.googleusercontent.com
