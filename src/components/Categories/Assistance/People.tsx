import { Box, Button, Card, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../../constants/backendurl";
import PeopleList from "../../../interfaces/People";

function People() {
  const [isLoading, setIsLoading] = useState(false);

  const [peoplelist, setPeopleList] = useState<PeopleList>([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}assistants/people`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        });
        setPeopleList(response.data);
        setIsLoading(false);
      } catch (err: any) {
        if (err.response.status === 401) {
          console.log("entered this method for refresh");
          const refreshResponse = await axios.post(
            `${BACKEND_URL}user/refresh`,
            null,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
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

  function openViewDetails(id: any, name: any, email: any) {
    const path = "/btrack/assist/people/" + name;
    navigate(path, {
      state: {
        id: id,
        username: name,
        email: email,
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
          {peoplelist.length == 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No People found
            </div>
          )}
          {peoplelist.length != 0 && (
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-start font-playfair text-xl font-bold text-sky-700 pt-10">
                People
              </div>
              <div className="grid grid-flow-row pt-10 pl-10 gap-5">
                {peoplelist.map((people, index) => (
                  <Card className="flex w-4/6 h-24 self-center" key={index}>
                    <div className="grid grid-cols-2 w-full h-full">
                      <div className="flex items-center w-full h-full font-dancingscript p-5 text-3xl text-sky-400">
                        {people.user.username}
                      </div>
                      <div className="grid grid-flow-col gap-2 w-full h-full justify-end items-center p-5">
                        <Button
                          variant="outlined"
                          className=" h-10"
                          onClick={() =>
                            openViewDetails(
                              people.user.id,
                              people.user.username,
                              people.user.email
                            )
                          }
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
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
