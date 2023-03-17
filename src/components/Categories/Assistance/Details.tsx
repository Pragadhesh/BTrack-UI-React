import { Box, Button, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BACKEND_URL } from "../../../constants/backendurl";
import AlertList from "../../../interfaces/Alerts";
import NotesList from "../../../interfaces/Notes";

const modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #0072e5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function Details() {
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  const [notestitle, setNotesTitle] = useState("");
  const [notesdesscription, setNotesDescription] = useState("");
  const [update, setIsUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = (title: any, description: any, update: any) => {
    setNotesTitle(title);
    setNotesDescription(description);
    setIsUpdate(update);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const [name, setName] = useState(location.state.username);
  const [id, setId] = useState(location.state.id);
  const [email, setEmail] = useState(location.state.email);

  const [alerts, setAlerts] = useState<AlertList>([]);
  const [notes, setNotes] = useState<NotesList>([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${BACKEND_URL}assistants/getdetails`,
          {
            id: id,
            username: name,
            email: email,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );

        const { alerts, notes } = response.data;
        setAlerts(alerts);
        setNotes(notes);
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
        <div className="flex flex-col w-full h-full pr-10 pl-10">
          {notes.length === 0 && alerts.length === 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No Information found
            </div>
          )}
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalstyle}>
              <div className="flex flex-col w-full h-full">
                <div className="flex w-full">
                  <input
                    placeholder="Title"
                    className="flex w-full font-semibold font-sans outline-none overflow-hidden truncate"
                    value={notestitle}
                    readOnly
                  />
                </div>
                <div className="flex w-full h-full items-start pt-5">
                  <textarea
                    aria-label="empty textarea"
                    placeholder="Take a note..."
                    className="flex w-full h-80 font-sans font-sm outline-none "
                    value={notesdesscription}
                    readOnly
                  />
                </div>
                <div className="grid grid-flow-col gap-2 justify-end">
                  <Button variant="outlined" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
          {(notes.length !== 0 || alerts.length !== 0) && (
            <div className="flex flex-col w-full h-full">
              <div className="grid grid-cols-2">
                <div className="flex justify-start items-center font-playfair text-3xl font-bold text-sky-700 pt-10">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </div>
                <div className="flex w-full pt-5 justify-end items-center">
                  <Link to={"/btrack/assist/"}>
                    <Button variant="outlined">Back</Button>
                  </Link>
                </div>
              </div>

              {alerts.length !== 0 && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex justify-start font-playfair text-xl font-bold text-sky-500 pt-5">
                    Alerts
                  </div>
                  <div className="grid w-full h-full grid-flow-row grid-cols-3 gap-3 gap-y-7">
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
                </div>
              )}

              {notes.length !== 0 && (
                <div className="flex flex-col w-full h-full pb-5">
                  <div className="flex justify-start font-playfair text-xl font-bold text-sky-500 pt-10">
                    Shopping Notes
                  </div>
                  <div className="grid w-full grid-flow-row grid-cols-4 pt-5 gap-4 gap-y-7">
                    {notes.map((note, index) => (
                      <div
                        className="flex flex-col w-64 min-h-auto max-h-96 rounded notes"
                        key={index}
                        onClick={() =>
                          handleOpen(note.title, note.description, true)
                        }
                      >
                        <div className="flex w-full p-2">
                          <input
                            readOnly
                            placeholder="Title"
                            className="flex w-full font-semibold font-sans outline-none overflow-hidden truncate"
                            value={note.title}
                          />
                        </div>
                        <div className="flex w-full p-2 font-sans text-sm text-overflow-ellipsis overflow-hidden white-space-nowrap min-h-auto max-h-96">
                          {note.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Details;
