import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InfoIcon from "@mui/icons-material/Info";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import { useState } from "react";
import Userpool from "../Userpool";
import { Tooltip } from "@mui/material";

export default function Signup(props: any) {
  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState("");

  const [usernameerr, setUsernameError] = useState(false);
  const [emailerr, setEmailError] = useState(false);
  const [passworderr, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const switchToSignin = () => {
    props.updateUserInfo(props.email, props.username, props.password, "signin");
  };
  const onSubmit = (event: any) => {
    setLoading(true);
    event.preventDefault();
    let attributelist = [];
    attributelist.push(
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      })
    );
    Userpool.signUp(
      username,
      password,
      attributelist,
      attributelist,
      (err, data) => {
        if (err) {
          console.log(err);
          if (err.message.includes("email address")) {
            setEmailError(true);
            setPasswordError(false);
            setUsernameError(false);
          } else if (err.message.includes("Password")) {
            setEmailError(false);
            setPasswordError(true);
            setUsernameError(false);
          } else {
            setEmailError(false);
            setPasswordError(false);
            setUsernameError(true);
          }
          setLoading(false);
        } else {
          setEmailError(false);
          setPasswordError(false);
          setUsernameError(false);
          props.updateUserInfo(email, username, password, "confirmation");
          setLoading(false);
        }
      }
    );
  };

  return (
    <div className="grid grid-cols w-full pl-16 pr-16 pt-12">
      <form onSubmit={onSubmit}>
        <div className="flex w-full justify-start text-xl font-bold font-sans">
          Signup
        </div>
        <div className="flex pt-1 justify-start text-xs text-zinc-400 bold font-sans w-72">
          Become a member to enjoy the benefits
        </div>
        <div className="grid grid-rows gap-3 pt-5 w-full justify-start">
          <div className="flex flex-col w-full">
            <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
              Username
            </div>
            <div className="flex pt-2 justify-start w-full">
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="flex w-72"
                size="small"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            {usernameerr && (
              <div className="flex pt-2 justify-start text-sm text-red-700">
                Enter a valid username
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
              Email address
            </div>
            <div className="flex pt-2 justify-start w-full">
              <TextField
                id="outlined-basic"
                variant="outlined"
                className="flex w-72"
                size="small"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            {emailerr && (
              <div className="flex pt-2 justify-start text-sm text-red-700">
                Enter a valid email address
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            <div className="flex justify-between w-full ">
              <div className="flex justify-start text-sm text-gray-400 font-comfortaa">
                Password
              </div>
              <Tooltip
                title="The password must meet the following requirements: 
                        1. Contains at least 1 number 
                        2. Contains at least 1 special character 
                        3. Contains at least 1 uppercase letter 
                        4. Contains at least 1 lowercase letter"
              >
                <InfoIcon></InfoIcon>
              </Tooltip>
            </div>
            <div className="flex pt-2 justify-start w-full">
              <TextField
                id="outlined-basic"
                variant="outlined"
                type="password"
                size="small"
                className="flex w-72 text-sm"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {passworderr && (
              <div className="flex pt-2 justify-start text-sm text-red-700">
                Password doesnt meet the requirements
              </div>
            )}
          </div>
          <div className="flex w-full pt-3">
            <Button
              variant="contained"
              className="flex w-72"
              type="submit"
              style={{
                maxWidth: "288px",
                maxHeight: "35px",
                minWidth: "288px",
                minHeight: "35px",
              }}
            >
              Register Account
            </Button>
            {loading && (
              <Box sx={{ display: "flex", paddingLeft: "8px" }}>
                <CircularProgress />
              </Box>
            )}
          </div>
        </div>
      </form>
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
  );
}
