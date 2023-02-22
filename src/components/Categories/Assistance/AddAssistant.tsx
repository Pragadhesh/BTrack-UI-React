import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import PeopleList from "../../../interfaces/People";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/backendurl";

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

function AddAssistant() {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setIsAddAssistant(false);
    setIsCancelRequest(false);
    setOpen(false);
  };

  const [isAddAssistant, setIsAddAssistant] = useState(false);
  const [isCancelRequest, setIsCancelRequest] = useState(false);
  const [username, setUsername] = useState("");

  const [peoplelist, setPeopleList] = useState<PeopleList>([]);

  function findAssistants() {
    const accept = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants`,
          {
            username: username,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
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
          accept();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    accept();
  }

  function sendRequest(people: any, index: any) {
    const accept = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants/send`,
          {
            id: people.user.id,
            username: people.user.username,
            email: people.user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        peoplelist[index].status = "pending";
        setIsLoading(false);
        setIsAddAssistant(true);
        handleOpen();
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
          accept();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    accept();
  }

  function cancelRequest(people: any, index: any) {
    const accept = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants/cancel`,
          {
            id: people.user.id,
            username: people.user.username,
            email: people.user.email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        peoplelist[index].status = "cancelled";
        setIsLoading(false);
        setIsCancelRequest(true);
        handleOpen();
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
          accept();
        } else {
          console.log(err);
          setIsLoading(false);
        }
      }
    };
    accept();
  }

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex w-full p-5 justify-between">
        <div className="flex font-playfair text-xl font-bold text-sky-700">
          Add Assistant
        </div>
        <div className="flex  pt-5 justify-end items-center">
          <Link to={"/btrack/assist/"}>
            <Button variant="outlined">Back</Button>
          </Link>
        </div>
      </div>
      <div className="grid grid-cols-4 pl-10 pr-10">
        <div className="grid grid-flow-col gap-1 justify-center  items-center col-span-3">
          <TextField
            id="search"
            label="Username"
            type="search"
            variant="outlined"
            size="small"
            className="flex w-80"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                findAssistants();
              }
            }}
          />
          <Button
            variant="outlined"
            color="primary"
            className="flex pl-5"
            onClick={findAssistants}
          >
            Search
          </Button>
        </div>
      </div>
      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!isLoading && (
        <div className="flex w-full h-full">
          {isCancelRequest && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle}>
                <div className="flex w-full h-full justify-center text-2xl text-red-500 font-dancingscript items-center">
                  Request cancelled successfully
                </div>
              </Box>
            </Modal>
          )}
          {isAddAssistant && (
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={modalstyle}>
                <div className="flex w-full h-full justify-center text-2xl text-sky-500 font-dancingscript items-center">
                  Request sent successfully
                </div>
              </Box>
            </Modal>
          )}
          {peoplelist.length == 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No Assistants found
            </div>
          )}
          {peoplelist.length != 0 && (
            <div className="flex flex-col w-full h-full pl-10 pr-10">
              <div className="grid grid-flow-row pt-10 pl-10 gap-5">
                {peoplelist.map((people, index) => (
                  <Card className="flex w-3/5 h-24 self-center" key={index}>
                    <div className="grid grid-cols-2 w-full h-full">
                      <div className="flex items-center w-full h-full font-dancingscript p-5 text-3xl text-sky-400">
                        {people.user.username}
                      </div>
                      <div className="flex w-full h-full justify-end items-center p-5">
                        {people.status == "pending" && (
                          <Button
                            variant="outlined"
                            color="error"
                            className=" h-10"
                            onClick={() => cancelRequest(people, index)}
                          >
                            Cancel Request
                          </Button>
                        )}
                        {people.status != "pending" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            className=" h-10"
                            onClick={() => sendRequest(people, index)}
                          >
                            Add Assistant
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddAssistant;
