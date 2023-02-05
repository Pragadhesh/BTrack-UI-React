import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Landing from "./components/Landing";
import Skincare from "./components/Categories/Skincare";
import Makeup from "./components/Categories/Makeup";
import Fragrance from "./components/Categories/Fragrance";
import AddProduct from "./components/Categories/Shared/AddProducts";
import Notes from "./components/Categories/Notes";
import Alerts from "./components/Categories/Alerts";
import Assist from "./components/Categories/Assist";
import People from "./components/Categories/Assistance/People";
import Requests from "./components/Categories/Assistance/Requests";
import Manage from "./components/Categories/Assistance/Manage";
import Details from "./components/Categories/Assistance/Details";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    let status = localStorage.getItem("loggedIn");
    if (status === "true") {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);

  const setLoggedIn = (status: any) => {
    setIsLoggedIn(status);
  };
  return (
    <Routes>
      {!isLoggedIn && (
        <>
          <Route path="/*" element={<Navigate to="/home" />}></Route>
          <Route
            path="/home"
            element={<Home setLoggedIn={setLoggedIn} />}
          ></Route>
        </>
      )}
      {isLoggedIn && (
        <>
          <Route path="/home" element={<Navigate to="/btrack" />}></Route>
          <Route path="/btrack" element={<Landing setLoggedIn={setLoggedIn} />}>
            <Route path="" element={<Navigate to="skincare" />}></Route>
            <Route path="skincare" element={<Skincare />} />
            <Route
              path="skincare/additem/:category"
              element={<AddProduct />}
            ></Route>
            <Route path="makeup" element={<Makeup />} />
            <Route path="fragrance" element={<Fragrance />} />
            <Route path="notes" element={<Notes />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="assist" element={<Assist />}>
              <Route path="" element={<Navigate to="people" />}></Route>
              <Route path="people" element={<People />} />
              <Route path="requests" element={<Requests />} />
              <Route path="manage" element={<Manage />} />
            </Route>
            <Route path="assist/people/:name" element={<Details />}></Route>
          </Route>
        </>
      )}
    </Routes>
  );
}

export default App;
