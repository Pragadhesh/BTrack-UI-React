import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/backendurl";
import AlertList from "../../interfaces/Alerts";

function Alerts() {
  const [isLoading, setIsLoading] = useState(false);
  const [alerts, setAlerts] = useState<AlertList>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}alerts`, {
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

  function getHealthColor(health: any) {
    let healthColor = "";
    if (health >= 0 && health <= 20) {
      return "bg-red-500";
    } else if (health > 20 && health < 40) {
      return "bg-orange-500";
    } else if (health >= 40 && health < 60) {
      return "bg-yellow-500";
    } else if (health >= 60 && health < 80) {
      return "bg-green-500";
    } else if (health >= 80 && health <= 100) {
      return "bg-teal-500";
    }
    return healthColor;
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
        <div className="flex flex-col w-full pr-10 pl-10">
          <div className="flex font-playfair text-xl font-bold text-red-700">
            My Alerts
          </div>
          {alerts.length !== 0 && (
            <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
              {alerts.map((alert, index) => (
                <div className="flex flex-col w-52" key={index}>
                  <div className="flex justify-start font-dancingscript text-3xl font-bold text-red-500 p-2">
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
                    className="flex justify-start font-optimaroman font-normal text-lg pt-2 h-10"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={alert.name}
                  >
                    {alert.name}
                  </div>
                  <div className="flex justify-start font-optimaroman font-light text-sm h-12 items-center pt-2 text-zinc-400">
                    <div
                      className="text-overflow-ellipsis"
                      title={alert.description}
                    >
                      {alert.description}
                    </div>
                  </div>
                  <div
                    className="relative w-full h-3 mt-2 rounded health"
                    title={`Health: ${alert.health}%`}
                  >
                    <div
                      className={`absolute h-full left-0 top-0 rounded ${getHealthColor(
                        alert.health
                      )}`}
                      style={{
                        width: `${alert.health}%`,
                        animation: "fill-bar 2s ease-in-out",
                      }}
                    ></div>
                    <div className="absolute h-full right-0 top-0">
                      <span className="text-white text-center absolute w-full h-full top-0 left-0">
                        {100 - alert.health}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {alerts.length === 0 && (
            <div className="flex w-full h-full pt-20 text-4xl text-sky-500 font-dancingscript justify-center">
              No Alerts found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Alerts;
