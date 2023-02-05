import "./Home.css";
import React, { useState } from "react";
import Confirmation from "./Signup/Confirmation";
import Login from "./Signup/Login";
import Signup from "./Signup/Signup";
import ForgotPassword from "./Signup/ForgotPassword";
import { Routes, Route } from "react-router-dom";
function Home(props: any) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [active, setActive] = useState("signin");

  const updateUserInfo = (
    email: any,
    username: any,
    password: any,
    active: any
  ) => {
    console.log(active);
    setEmail(email);
    setUsername(username);
    setPassword(password);
    setActive(active);
  };

  const checkLogin = (status: any) => {
    props.setLoggedIn(status);
  };

  return (
    <div>
      <div className="grid grid-cols-2 w-full h-full">
        <div className="flex h-screen w-full homescreen"></div>
        <div className="flex flex-col items-start w-full h-full">
          <div className="flex w-full pt-10 justify-center text-5xl font-solitreo text-sky-500 font-bold">
            B Track
          </div>
          {active == "signup" && (
            <Signup
              email={email}
              username={username}
              password={password}
              updateUserInfo={updateUserInfo}
            />
          )}
          {active == "signin" && (
            <Login
              email={email}
              username={username}
              password={password}
              updateUserInfo={updateUserInfo}
              checkLoginStatus={checkLogin}
            />
          )}
          {active == "confirmation" && (
            <Confirmation
              email={email}
              username={username}
              password={password}
              updateUserInfo={updateUserInfo}
              checkLoginStatus={checkLogin}
            />
          )}
          {active == "forgotpassword" && (
            <ForgotPassword
              email={email}
              username={username}
              password={password}
              updateUserInfo={updateUserInfo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
