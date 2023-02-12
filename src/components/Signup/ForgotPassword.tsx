import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Userpool from "../Userpool";
import * as AmazonCognitoIdentity from "amazon-cognito-identity-js";
import { Box, CircularProgress } from "@mui/material";

function ForgotPassword(props: any) {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [active, setActive] = useState("step1");
  const [newpassword, setnewPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const [passworderr, setPasswordError] = useState(false);
  const [credserr, setCredsError] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchToSignin = () => {
    props.updateUserInfo(props.email, props.username, props.password, "signin");
  };
  var userData = {
    Username: email,
    Pool: Userpool,
  };
  var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

  const sendVerificationCode = () => {
    setLoading(true);
    cognitoUser.forgotPassword({
      onSuccess: function (data) {
        setActive("step2");
        setLoading(false);
      },
      onFailure: function (err) {
        console.log(err);
        setLoading(false);
      },
    });
  };

  const confirmPassword = () => {
    setLoading(true);
    if (newpassword !== confirmpassword) {
      setPasswordError(true);
      setCredsError(false);
      setLoading(false);
    } else {
      setPasswordError(false);
      setCredsError(false);
      cognitoUser.confirmPassword(verificationCode, newpassword, {
        onSuccess() {
          setActive("step3");
          setLoading(false);
        },
        onFailure(err) {
          setCredsError(true);
          setLoading(false);
        },
      });
    }
  };

  return (
    <div>
      {active == "step1" && (
        <div className="grid grid-cols w-full pl-16 pr-16 pt-12">
          <div className="flex w-full justify-start text-xl font-bold font-sans">
            Find your Account
          </div>
          <div className="flex pt-1 justify-start text-xs text-zinc-400 bold font-sans w-72">
            Please enter your email address associated with your account
          </div>
          <div className="grid grid-rows gap-3 pt-5 w-full justify-start">
            <div className="flex flex-col w-full">
              <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
                Email
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
                  onClick={sendVerificationCode}
                >
                  Send Code
                </Button>
                {loading && (
                  <Box sx={{ display: "flex", paddingLeft: "8px" }}>
                    <CircularProgress />
                  </Box>
                )}
              </div>
              <div className="flex justify-center pt-8 w-72">
                <div className="flex text-xs text-zinc-400 bold font-sans">
                  Already have an account?
                </div>
                <button
                  className="flex text-xs text-sky-500 bold font-sans pl-1"
                  onClick={switchToSignin}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {active == "step2" && (
        <div className="grid grid-cols w-full pl-16 pr-16 pt-12">
          <div className="flex w-full justify-start text-xl font-bold font-sans">
            Find your Account
          </div>
          <div className="grid grid-rows gap-3 pt-5 w-full justify-start">
            <div className="flex flex-col w-full">
              <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
                Verification Code
              </div>
              <div className="flex pt-2 justify-start w-full">
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  className="flex w-72"
                  size="small"
                  type="password"
                  onChange={(event) => setVerificationCode(event.target.value)}
                />
              </div>
              <div className="flex flex-col w-full pt-3">
                <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
                  New Password
                </div>
                <div className="flex pt-2 justify-start w-full">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="password"
                    size="small"
                    className="flex w-72 text-sm"
                    value={newpassword}
                    onChange={(event) => setnewPassword(event.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col w-full pt-3">
                <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
                  Confirm Password
                </div>
                <div className="flex pt-2 justify-start w-full">
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    type="password"
                    size="small"
                    className="flex w-72 text-sm"
                    value={confirmpassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    onKeyPress={(event) => {
                      if (event.key === "Enter") {
                        confirmPassword();
                      }
                    }}
                  />
                </div>
              </div>
              {passworderr && (
                <div className="flex pt-2 justify-start text-sm text-red-700">
                  Password doesn't match
                </div>
              )}
              {credserr && (
                <div className="flex pt-2 justify-start text-sm text-red-700">
                  Incorrect Code or Weak password
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
                  onClick={confirmPassword}
                >
                  Submit
                </Button>
                {loading && (
                  <Box sx={{ display: "flex", paddingLeft: "8px" }}>
                    <CircularProgress />
                  </Box>
                )}
              </div>
              <div className="flex justify-center pt-8 w-72">
                <div className="flex text-xs text-zinc-400 bold font-sans">
                  Already have an account?
                </div>
                <button
                  className="flex text-xs text-sky-500 bold font-sans pl-1"
                  onClick={switchToSignin}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {active == "step3" && (
        <div className="grid grid-cols w-full pl-16 pr-16 pt-40">
          <div className="flex w-full justify-center text-xl font-bold font-sans">
            Password verified successfully
          </div>
          <div className="flex justify-center pt-8 w-72">
            <button
              className="flex text-xs text-sky-500 bold font-sans pl-1"
              onClick={switchToSignin}
            >
              Please Sign in to Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
