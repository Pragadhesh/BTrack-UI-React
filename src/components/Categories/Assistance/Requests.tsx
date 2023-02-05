import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

function Requests() {
  const [isLoading, setIsLoading] = useState(false);
  const requests = [
    {
      name: "pragadhesh",
    },
  ];
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
          {requests.length == 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No Requests found
            </div>
          )}
          {requests.length != 0 && <div> This is requests</div>}
        </div>
      )}
    </div>
  );
}

export default Requests;
