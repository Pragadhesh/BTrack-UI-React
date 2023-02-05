import { Box, CircularProgress } from "@mui/material";
import { useState } from "react";

function Alerts() {
  const [isLoading, setIsLoading] = useState(false);
  function getHealthColor(health: any) {
    let healthColor = "";
    if (health >= 0 && health < 20) {
      return "bg-red-500";
    } else if (health >= 20 && health < 40) {
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
          <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
            <div className="flex flex-col w-52">
              <div className="flex justify-start font-dancingscript text-3xl font-bold text-red-500 p-2">
                Serum
              </div>
              <div
                className="flex justify-end bg-red-500 w-full h-72 rounded product"
                style={{
                  backgroundImage: `url("https://www.esteelauder.in/media/export/cms/products/308x424/el_sku_PMG501_308x424_0.jpg")`,
                }}
              ></div>
              <div className="flex justify-start font-optimaroman font-normal text-lg pt-2">
                Advanced Night Repair
              </div>
              <div className="flex justify-start font-optimaroman font-light text-sm pt-2 text-zinc-400">
                Synchronized Multi-Recovery Complex will cause this issue
              </div>
              <div
                className="relative w-full h-3 mt-2 rounded health"
                title={`Health: ${30}%`}
              >
                <div
                  className={`absolute h-full left-0 top-0 rounded ${getHealthColor(
                    90
                  )}`}
                  style={{
                    width: `${90}%`,
                    animation: "fill-bar 2s ease-in-out",
                  }}
                ></div>
                <div className="absolute h-full right-0 top-0">
                  <span className="text-white text-center absolute w-full h-full top-0 left-0">
                    {100 - 90}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-52">
              <div className="flex justify-start font-dancingscript text-3xl font-bold text-red-500 p-2">
                Serum
              </div>
              <div
                className="flex justify-end bg-red-500 w-full h-72 rounded product"
                style={{
                  backgroundImage: `url("https://www.esteelauder.in/media/export/cms/products/308x424/el_sku_PMG501_308x424_0.jpg")`,
                }}
              ></div>
              <div className="flex justify-start font-optimaroman font-normal text-lg pt-2">
                Advanced Night Repair
              </div>
              <div className="flex justify-start font-optimaroman font-light text-sm pt-2 text-zinc-400">
                Synchronized Multi-Recovery Complex will cause this issue
              </div>
              <div
                className="relative w-full h-3 mt-2 rounded health"
                title={`Health: ${30}%`}
              >
                <div
                  className={`absolute h-full left-0 top-0 rounded ${getHealthColor(
                    90
                  )}`}
                  style={{
                    width: `${90}%`,
                    animation: "fill-bar 2s ease-in-out",
                  }}
                ></div>
                <div className="absolute h-full right-0 top-0">
                  <span className="text-white text-center absolute w-full h-full top-0 left-0">
                    {100 - 90}%
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-52">
              <div className="flex justify-start font-dancingscript text-3xl font-bold text-red-500 p-2">
                Serum
              </div>
              <div
                className="flex justify-end bg-red-500 w-full h-72 rounded product"
                style={{
                  backgroundImage: `url("https://www.esteelauder.in/media/export/cms/products/308x424/el_sku_PMG501_308x424_0.jpg")`,
                }}
              ></div>
              <div className="flex justify-start font-optimaroman font-normal text-lg pt-2">
                Advanced Night Repair
              </div>
              <div className="flex justify-start font-optimaroman font-light text-sm pt-2 text-zinc-400">
                Synchronized Multi-Recovery Complex will cause this issue
              </div>
              <div
                className="relative w-full h-3 mt-2 rounded health"
                title={`Health: ${30}%`}
              >
                <div
                  className={`absolute h-full left-0 top-0 rounded ${getHealthColor(
                    90
                  )}`}
                  style={{
                    width: `${90}%`,
                    animation: "fill-bar 2s ease-in-out",
                  }}
                ></div>
                <div className="absolute h-full right-0 top-0">
                  <span className="text-white text-center absolute w-full h-full top-0 left-0">
                    {100 - 90}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;
