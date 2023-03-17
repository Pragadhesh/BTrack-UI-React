import { Box, Button, ButtonGroup, CircularProgress } from "@mui/material";
import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Assist() {
  const isLoading = false;
  const [activeButton, setActiveButton] = useState("people");
  const navigate = useNavigate();

  const handleClick = (label: any) => {
    if (activeButton !== label) {
      const route = "/btrack/assist/" + label;
      setActiveButton(label);
      navigate(route);
    }
  };

  return (
    <div className="flex w-full h-full">
      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col w-full h-full pr-10 pl-10">
          <div className="grid grid-cols-3 w-full pt-5">
            <ButtonGroup
              variant="outlined"
              className="flex col-span-2 w-full self-center justify-center"
            >
              <Button
                style={{
                  color: activeButton === "people" ? "#0EA5E9" : "#3E5060",
                  backgroundColor:
                    activeButton === "people" ? "#F0F7FF" : "#FFFFFF",
                }}
                onClick={() => handleClick("people")}
              >
                People
              </Button>
              <Button
                style={{
                  color: activeButton === "requests" ? "#0EA5E9" : "#3E5060",
                  backgroundColor:
                    activeButton === "requests" ? "#F0F7FF" : "#FFFFFF",
                }}
                onClick={() => handleClick("requests")}
              >
                Requests
              </Button>
              <Button
                style={{
                  color: activeButton === "manage" ? "#0EA5E9" : "#3E5060",
                  backgroundColor:
                    activeButton === "manage" ? "#F0F7FF" : "#FFFFFF",
                }}
                onClick={() => handleClick("manage")}
              >
                Manage
              </Button>
            </ButtonGroup>
            <div className="flex self-center justify-end w-full">
              <Link to={"/btrack/assist/add"}>
                <Button variant="outlined">Add Assistant</Button>
              </Link>
            </div>
          </div>
          <div className="flex w-full h-full">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}

export default Assist;
