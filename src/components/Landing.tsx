import { Modal, Box, Button, Divider } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./Landing.css";

const modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  border: "2px solid #0072e5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function Landing(props: any) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState("");

  useEffect(() => {
    const idToken = localStorage.getItem("idToken");
    if (idToken) {
      const decoded: { [key: string]: any } = jwtDecode(idToken);
      const usernameClaim = decoded["cognito:username"];
      if (usernameClaim) {
        const usernameValue = usernameClaim as string;
        setUsername(usernameValue);
      }
    }
  }, []);

  const navigate = useNavigate();

  const [activeButton, setActiveButton] = useState("skincare");

  const handleButtonClick = (label: any) => {
    if (activeButton !== label) {
      const route = "/btrack/" + label;
      setActiveButton(label);
      navigate(route);
    }
  };

  const logout = () => {
    localStorage.clear();
    props.setLoggedIn(false);
  };

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full h-20 justify-between pl-10 pr-10 bg-gray-50">
        <div className="flex w-full pt-5 justify-start text-4xl font-solitreo text-sky-500 font-bold">
          B Track
        </div>
        <div className="flex w-full pt-5 justify-end text-3xl font-dancingscript text-sky-600 font-bold">
          {username.charAt(0).toUpperCase() + username.slice(1)}
        </div>
      </div>
      <div className="flex w-full h-full">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalstyle}>
            <div className="flex w-full justify-center text-xl font-bold font-sans">
              Log Out?
            </div>
            <div className="flex pt-3 pl-5 justify-center text-xs text-zinc-400 bold font-sans w-72">
              Are you sure want to logout of your account
            </div>
            <div className="grid grid-flow-col gap-2 pt-10 justify-end">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" onClick={logout}>
                Logout
              </Button>
            </div>
          </Box>
        </Modal>
        <div className="flex flex-col justify-between rounded w-48 h-full">
          <div className="grid grid-cols w-full gap-3 pt-5">
            <button
              onClick={() => handleButtonClick("skincare")}
              className={
                activeButton === "skincare"
                  ? "flex h-10 font-playfair text-lg font-medium items-center pl-5 activebutton"
                  : "flex h-10 font-playfair text-lg font-medium items-center pl-5 inactivebutton"
              }
            >
              Skincare
            </button>
            <button
              onClick={() => handleButtonClick("makeup")}
              className={
                activeButton === "makeup"
                  ? "flex h-10 font-playfair text-lg font-medium items-center pl-5 activebutton"
                  : "flex h-10 font-playfair text-lg font-medium items-center pl-5 inactivebutton"
              }
            >
              Makeup
            </button>
            <button
              onClick={() => handleButtonClick("fragrance")}
              className={
                activeButton === "fragrance"
                  ? "flex h-10 font-playfair text-lg font-medium items-center pl-5 activebutton"
                  : "flex h-10 font-playfair text-lg font-medium items-center pl-5 inactivebutton"
              }
            >
              Fragrance
            </button>
            <Divider />
            <button
              onClick={() => handleButtonClick("routine")}
              className={
                activeButton === "routine"
                  ? "flex h-10 font-dancingscript text-xl font-medium items-center pl-5 activebutton"
                  : "flex h-10 font-dancingscript text-xl font-medium items-center pl-5 inactivebutton"
              }
            >
              Routine
            </button>

            <button
              onClick={() => handleButtonClick("notes")}
              className={
                activeButton === "notes"
                  ? "flex h-10 font-dancingscript text-xl font-medium items-center pl-5 activebutton"
                  : "flex h-10 font-dancingscript text-xl font-medium items-center pl-5 inactivebutton"
              }
            >
              Shopping Notes
            </button>
            <Divider />
            <button
              onClick={() => handleButtonClick("assist")}
              className={
                activeButton === "assist"
                  ? "flex h-10 font-comfortaa text-lg font-medium items-center pl-5 text-sky-500 activeassist"
                  : "flex h-10 font-comfortaa text-lg font-medium items-center pl-5 text-sky-500 inactiveassist"
              }
            >
              Assist
            </button>

            <button
              onClick={() => handleButtonClick("alerts")}
              className={
                activeButton === "alerts"
                  ? "flex h-10 font-playfair text-xl font-medium items-center pl-5 activealert"
                  : "flex h-10 font-playfair text-xl font-medium items-center pl-5 inactivealert"
              }
            >
              Alerts
            </button>
            <Divider />
            <button
              className="flex w-full pt-10 pl-5 font-dancingscript text-3xl text-sky-500"
              onClick={handleOpen}
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex w-full h-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Landing;
