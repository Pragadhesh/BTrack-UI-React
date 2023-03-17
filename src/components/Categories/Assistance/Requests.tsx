import { Box, Button, Card, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../../constants/backendurl";
import PeopleList from "../../../interfaces/People";

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

function Requests() {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsAccepted(false);
    setIsDeleted(false);
    setOpen(false);
  };
  const [isDeleted, setIsDeleted] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [peoplelist, setPeopleList] = useState<PeopleList>([]);

  function acceptRequest(people: any, index: any) {
    const accept = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants/accept`,
          {
            id: people.id,
            username: people.user.username,
            email: people.user.email,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        if (response.status === 200) {
          peoplelist.splice(index, 1);
          setIsLoading(false);
          setIsAccepted(true);
          handleOpen();
        }
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
          accept();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    accept();
  }

  function rejectRequest(people: any, index: any) {
    const accept = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants/reject`,
          {
            id: people.id,
            username: people.user.username,
            email: people.user.email,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        if (response.status === 200) {
          peoplelist.splice(index, 1);
          setIsLoading(false);
          setIsDeleted(true);
          handleOpen();
        }
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
          accept();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    accept();
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}assistants/requests`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("idToken")}`,
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
        <div className="flex flex-col w-full h-full pr-10 pl-10">
          {isDeleted && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle}>
                <div className="flex w-full h-full justify-center text-2xl text-red-500 font-dancingscript items-center">
                  Request deleted successfully
                </div>
              </Box>
            </Modal>
          )}
          {isAccepted && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle}>
                <div className="flex w-full h-full justify-center text-2xl text-sky-500 font-dancingscript items-center">
                  Request accepted successfully
                </div>
              </Box>
            </Modal>
          )}
          {peoplelist.length === 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No Requests found
            </div>
          )}
          {peoplelist.length !== 0 && (
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-start font-playfair text-xl font-bold text-sky-700 pt-10">
                Requests
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
                          onClick={() => acceptRequest(people, index)}
                        >
                          Accept
                        </Button>

                        <Button
                          variant="outlined"
                          color="error"
                          className=" h-10"
                          onClick={() => rejectRequest(people, index)}
                        >
                          Delete
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

export default Requests;
