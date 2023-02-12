import { Box, CircularProgress } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { useState } from "react";
import Userpool from "../Userpool";

export default function Login(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [incorrect, setIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchToSignup = () => {
    props.updateUserInfo(props.email, props.username, props.password, "signup");
  };

  const switchToForgotPassword = () => {
    props.updateUserInfo(
      props.email,
      props.username,
      props.password,
      "forgotpassword"
    );
  };

  const authenticate = () => {
    setLoading(true);
    var authenticationData = {
      Username: email,
      Password: password,
    };
    var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
      authenticationData
    );
    var userData = {
      Username: email,
      Pool: Userpool,
    };
    var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem(
          "accessToken",
          result.getAccessToken().getJwtToken()
        );
        localStorage.setItem("idToken", result.getIdToken().getJwtToken());
        localStorage.setItem(
          "refreshToken",
          result.getRefreshToken().getToken()
        );
        props.checkLoginStatus(true);
        setLoading(false);
      },
      onFailure: function (err) {
        console.log(err);
        if (err.message.includes("username")) {
          setIncorrect(true);
        }
        if (err.message.includes("User is not confirmed")) {
          setIncorrect(false);
          console.log(email);
          console.log(password);
          props.updateUserInfo(email, email, password, "confirmation");
        }
        setLoading(false);
      },
    });
  };

  return (
    <div className="grid grid-cols w-full pl-16 pr-16 pt-12">
      <div className="flex w-full justify-start text-xl font-bold font-sans">
        Account Login
      </div>
      <div className="flex pt-1 justify-start text-xs text-zinc-400 bold font-sans w-72">
        If you are already a member you can login with your email address and
        password
      </div>
      <div className="grid grid-rows gap-3 pt-5 w-full justify-start">
        <div className="flex flex-col w-full">
          <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
            Username or Email
          </div>
          <div className="flex pt-2 justify-start w-full">
            <TextField
              id="outlined-basic"
              variant="outlined"
              className="flex w-72"
              size="small"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
            Password
          </div>
          <div className="flex pt-2 justify-start w-full">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              size="small"
              className="flex w-72 text-sm"
              onChange={(event) => setPassword(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  authenticate();
                }
              }}
            />
          </div>
        </div>
        {incorrect && (
          <div className="flex pt-2 justify-start text-sm text-red-700">
            Invalid Username or Password
          </div>
        )}
        <div className="flex w-full pt-3">
          <Button
            variant="contained"
            className="flex w-72"
            style={{
              maxWidth: "288px",
              maxHeight: "35px",
              minWidth: "288px",
              minHeight: "35px",
            }}
            onClick={authenticate}
          >
            Login
          </Button>
          {loading && (
            <Box sx={{ display: "flex", paddingLeft: "8px" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
      <div className="flex justify-center pt-8 w-72">
        <div className="flex text-xs text-zinc-400 bold font-sans">
          Don't have an account ?
        </div>
        <button
          className="flex text-xs text-sky-500 bold font-sans pl-1"
          onClick={switchToSignup}
        >
          Sign up here
        </button>
      </div>
      <div className="flex justify-center pt-5 w-72">
        <button
          className="flex text-xs text-sky-600 bold font-sans pl-1"
          onClick={switchToForgotPassword}
        >
          Forgot Password ?
        </button>
      </div>
    </div>
  );
}
