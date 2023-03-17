import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/backendurl";
import AlertList from "../../interfaces/Alerts";

function Dailyroutine() {
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertList>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}recommendation`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        });
        setAlerts(response.data);
        setIsLoading(false);
      } catch (err: any) {
        if (err.response.status === 401) {
          console.log("entered this method for refresh");
          const refreshResponse = await axios.post(
            `${BACKEND_URL}user/refresh`,
            null,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );
          localStorage.setItem("idToken", refreshResponse.data.idToken);
          localStorage.setItem(
            "refreshToken",
            refreshResponse.data.refreshToken
          );
          localStorage.setItem("accessToken", refreshResponse.data.accessToken);
          fetchData();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    fetchData();
  }, []);

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
        <div className="flex flex-col w-full pr-10 pl-10">
          <div className="flex pt-5 w-full  items-center justify-center flex-col font-playfair text-xl italic text-sky-700">
            Unlock your beauty potential with B Track's personalized routine,
            designed just for you !!
          </div>
          {alerts.length !== 0 && (
            <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
              {alerts.map((alert, index) => (
                <div className="flex flex-col w-52" key={index}>
                  <div className="flex justify-center font-dancingscript text-3xl font-bold text-sky-500 p-2">
                    {alert.category.charAt(0).toUpperCase() +
                      alert.category.slice(1)}
                  </div>
                  <div
                    className="flex justify-end bg-red-500 w-full h-72 rounded product"
                    style={{
                      backgroundImage: `url("${alert.image_url}")`,
                    }}
                  ></div>
                  <div
                    className="flex justify-center font-optimaroman font-normal text-lg pt-2 h-10"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={alert.name}
                  >
                    {alert.name}
                  </div>
                </div>
              ))}
            </div>
          )}
          {alerts.length === 0 && (
            <div className="flex w-full h-full pt-20 text-4xl text-sky-500 font-dancingscript justify-center">
              No Items found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Dailyroutine;
