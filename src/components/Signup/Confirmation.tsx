import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Userpool from "../Userpool";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { Box, CircularProgress } from "@mui/material";
import { BACKEND_URL } from "../../constants/backendurl";
import axios from "axios";

export default function Confirmation(props: any) {
  const [verificationcode, setVerificationCode] = useState("");
  const [invalidverificationcode, setInvalidVerificationCode] = useState(false);
  const [resendVerificationEmail, setResendVerificationEmail] = useState(false);

  const [loading, setLoading] = useState(false);
  var userData = {
    Username: props.username,
    Pool: Userpool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  var authenticationData = {
    Username: props.username,
    Password: props.password,
  };
  var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(
    authenticationData
  );

  const confirmAuthentication = () => {
    setLoading(true);
    cognitoUser.confirmRegistration(
      verificationcode,
      true,
      function (err, result) {
        if (err) {
          console.log(err);
          if (err.message.includes("Invalid verification code")) {
            setInvalidVerificationCode(true);
            setResendVerificationEmail(false);
          }
          setLoading(false);
        } else {
          setInvalidVerificationCode(false);
          setResendVerificationEmail(false);
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: function (result) {
              axios
                .post(`${BACKEND_URL}user/add`, null, {
                  headers: {
                    Authorization: `Bearer ${result
                      .getIdToken()
                      .getJwtToken()}`,
                  },
                })
                .then((response) => {
                  localStorage.setItem("loggedIn", "true");
                  localStorage.setItem(
                    "accessToken",
                    result.getAccessToken().getJwtToken()
                  );
                  localStorage.setItem(
                    "idToken",
                    result.getIdToken().getJwtToken()
                  );
                  localStorage.setItem(
                    "refreshToken",
                    result.getRefreshToken().getToken()
                  );
                  props.checkLoginStatus(true);
                  setLoading(false);
                })
                .catch((error) => {
                  console.error(error);
                  setLoading(false);
                });
            },
            onFailure: function (err) {
              console.log(err);
            },
          });
          setLoading(false);
        }
      }
    );
  };

  const resendAuthentication = () => {
    setLoading(true);
    cognitoUser.resendConfirmationCode(function (err, result) {
      if (err) {
        console.log(err);
        setLoading(false);
      } else {
        setInvalidVerificationCode(false);
        setResendVerificationEmail(true);
        setLoading(false);
      }
    });
  };

  return (
    <div className="grid grid-cols w-full pl-16 pr-16 pt-12">
      <div className="flex w-full justify-start text-xl font-bold font-sans">
        Account Confirmation
      </div>
      <div className="grid grid-rows gap-3 pt-5 w-full justify-start">
        <div className="flex flex-col w-full">
          <div className="flex text-sm text-comfortaa font-normal text-gray-400 w-76 pb-5 justify-start">
            We have sent a Confirmation code to your email. Enter it below to
            confirm your account
          </div>
          <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
            Verification Code
          </div>
          <div className="flex pt-2 justify-start w-full">
            <TextField
              id="outlined-basic"
              variant="outlined"
              type="password"
              size="small"
              className="flex w-72 text-sm"
              onChange={(event) => setVerificationCode(event.target.value)}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  confirmAuthentication();
                }
              }}
            />
          </div>
          {invalidverificationcode && (
            <div className="flex pt-2 justify-start text-sm text-red-700">
              Invalid Verification code
            </div>
          )}
        </div>
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
            onClick={confirmAuthentication}
          >
            Confirm Account
          </Button>
          {loading && (
            <Box sx={{ display: "flex", paddingLeft: "8px" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
      {resendVerificationEmail && (
        <div className="flex pt-3 justify-start text-sm text-red-700">
          Verification Email sent successfully
        </div>
      )}
      <div className="flex justify-center pt-8 w-72">
        <div className="flex text-xs text-zinc-400 bold font-sans">
          Didn't receive the code ?
        </div>
        <button
          className="flex text-xs text-sky-500 bold font-sans pl-1"
          onClick={resendAuthentication}
        >
          Send a new code
        </button>
      </div>
    </div>
  );
}
