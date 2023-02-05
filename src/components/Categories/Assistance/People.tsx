import { Box, Button, Card, CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function People() {
  const [isLoading, setIsLoading] = useState(false);

  const assistants = [
    {
      name: "pragadhesh",
    },
  ];
  const navigate = useNavigate();

  function openViewDetails(name: any) {
    const path = "/btrack/assist/people/" + name;
    console.log(path);
    navigate(path, {
      state: {
        username: name,
      },
    });
  }
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
          {assistants.length == 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No People found
            </div>
          )}
          {assistants.length != 0 && (
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-start font-playfair text-xl font-bold text-sky-700 pt-10">
                People
              </div>
              <div className="grid grid-flow-row pt-10 pl-10 gap-5">
                <Card className="flex w-4/6 h-24 self-center">
                  <div className="grid grid-cols-2 w-full h-full">
                    <div className="flex items-center w-full h-full font-dancingscript p-5 text-3xl text-sky-400">
                      Pragadhesh
                    </div>
                    <div className="grid grid-flow-col gap-2 w-full h-full justify-end items-center p-5">
                      <Button
                        variant="outlined"
                        className=" h-10"
                        onClick={() => openViewDetails("Ramesh")}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div className="flex flex-col p-5"></div>
        </div>
      )}
    </div>
  );
}

export default People;
