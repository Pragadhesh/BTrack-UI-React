import { Box, Button, CircularProgress, Modal } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../constants/backendurl";
import NotesList from "../../interfaces/Notes";
import "./Shared.css";

const modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  height: 520,
  bgcolor: "background.paper",
  border: "2px solid #0072e5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function Notes() {
  const [notes, setNotes] = useState<NotesList>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [notestitle, setNotesTitle] = useState("");
  const [notesdesscription, setNotesDescription] = useState("");
  const [notesIsLoading, setNotesIsLoading] = useState(false);
  const [upid, setupId] = useState();
  const [update, setIsUpdate] = useState(false);
  const [upstatus, setUpstatus] = useState("");

  const [titlewarning, setTitlewarning] = useState(false);
  const [descriptionwarning, setDescriptionwarning] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = (title: any, description: any, update: any, id: any) => {
    setNotesTitle(title);
    setNotesDescription(description);
    setIsUpdate(update);
    setupId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setUpstatus("");
    setOpen(false);
    setTitlewarning(false);
    setDescriptionwarning(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BACKEND_URL}notes`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        });
        setNotes(response.data);
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

  const addNote = async () => {
    setNotesIsLoading(true);
    if (notestitle !== "" && notesdesscription !== "") {
      setTitlewarning(false);
      setDescriptionwarning(false);
      try {
        const response = await axios.post(
          `${BACKEND_URL}notes`,
          {
            title: notestitle,
            description: notesdesscription,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        if (response.status === 200) {
          setNotes(response.data);
          setNotesIsLoading(false);
          setUpstatus("Added Succesfully");
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          // Call the method to get the refreshed token
          console.log("entered this method for refresh");
          const response = await axios.post(
            `${BACKEND_URL}user/refresh`,
            null,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );
          localStorage.setItem("idToken", response.data.idToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          addNote();
        }
        setNotesIsLoading(false);
      }
    } else {
      setTitlewarning(notestitle === "");
      setDescriptionwarning(notesdesscription === "");
      setNotesIsLoading(false);
    }
  };

  const updateNote = async () => {
    setNotesIsLoading(true);
    if (notestitle !== "" && notesdesscription !== "") {
      setTitlewarning(false);
      setDescriptionwarning(false);
      try {
        const response = await axios.put(
          `${BACKEND_URL}notes`,
          {
            title: notestitle,
            description: notesdesscription,
            id: upid,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        if (response.status === 200) {
          setNotes(response.data);
          setNotesIsLoading(false);
          setUpstatus("Updated Succesfully");
        }
      } catch (error: any) {
        if (error.response.status === 401) {
          // Call the method to get the refreshed token
          console.log("entered this method for refresh");
          const response = await axios.post(
            `${BACKEND_URL}user/refresh`,
            null,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
              },
            }
          );
          localStorage.setItem("idToken", response.data.idToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          localStorage.setItem("accessToken", response.data.accessToken);
          addNote();
        }
        setNotesIsLoading(false);
      }
    } else {
      setTitlewarning(notestitle === "");
      setDescriptionwarning(notesdesscription === "");
      setNotesIsLoading(false);
    }
  };

  const deleteNote = async () => {
    setNotesIsLoading(true);
    try {
      const response = await axios.delete(`${BACKEND_URL}notes`, {
        data: {
          title: notestitle,
          description: notesdesscription,
          id: upid,
        },
        headers: {
          authorization: `Bearer ${localStorage.getItem("idToken")}`,
        },
      });
      if (response.status === 200) {
        setNotes(response.data);
        setNotesIsLoading(false);
        setUpstatus("Deleted Succesfully");
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        // Call the method to get the refreshed token
        console.log("entered this method for refresh");
        const response = await axios.post(`${BACKEND_URL}user/refresh`, null, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
          },
        });
        localStorage.setItem("idToken", response.data.idToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("accessToken", response.data.accessToken);
        addNote();
      }
      setNotesIsLoading(false);
    }
  };
  return (
    <div className="flex w-full h-full">
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalstyle}>
          {upstatus === "" && (
            <div className="flex flex-col w-full h-full">
              <div className="flex w-full">
                <input
                  placeholder="Title"
                  className="flex w-full font-semibold font-sans outline-none overflow-hidden truncate"
                  value={notestitle}
                  onChange={(event) => setNotesTitle(event.target.value)}
                />
              </div>
              {titlewarning && (
                <div className="flex w-full font-semibold text-xs pt-2 font-red-500 text-red-500">
                  Please enter title
                </div>
              )}
              <div className="flex w-full h-full items-start pt-5">
                <textarea
                  aria-label="empty textarea"
                  placeholder="Take a note..."
                  className="flex w-full h-80 font-sans font-sm outline-none "
                  value={notesdesscription}
                  onChange={(event) => setNotesDescription(event.target.value)}
                />
              </div>
              {descriptionwarning && (
                <div className="flex w-full font-semibold text-xs pt-2 font-red-500 text-red-500">
                  Please enter description
                </div>
              )}

              {!update && (
                <div className="grid grid-flow-col gap-2 justify-end">
                  <Button variant="outlined" onClick={addNote}>
                    Add
                  </Button>
                  {notesIsLoading && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </div>
              )}
              {update && (
                <div className="grid grid-flow-col gap-2 justify-end">
                  <Button variant="outlined" color="error" onClick={deleteNote}>
                    Delete Note
                  </Button>
                  <Button variant="outlined" onClick={updateNote}>
                    Update
                  </Button>
                  {notesIsLoading && (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </div>
              )}
            </div>
          )}
          {upstatus !== "" && (
            <div className="flex w-full h-full text-3xl text-sky-500 font-dancingscript justify-center items-center">
              {upstatus}
            </div>
          )}
        </Box>
      </Modal>
      {isLoading && (
        <div className="flex w-full h-full items-center justify-center">
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        </div>
      )}
      {!isLoading && (
        <div className="flex flex-col w-full h-full pr-10 pl-10">
          <div className="flex justify-between pt-5 ">
            <div className="flex font-playfair text-xl font-bold text-sky-700">
              My Shopping Notes
            </div>
            <Button
              variant="outlined"
              onClick={() => handleOpen("", "", false, 0)}
            >
              Add Note
            </Button>
          </div>
          {notes.length === 0 && (
            <div className="flex w-full h-full pt-20 text-4xl text-sky-500 font-dancingscript justify-center">
              No Notes found
            </div>
          )}
          {notes.length !== 0 && (
            <div className="grid w-full grid-flow-row grid-cols-4 pt-5 gap-4 gap-y-7">
              {notes.map((note, index) => (
                <div
                  className="flex flex-col w-64 min-h-auto max-h-96 rounded notes"
                  key={index}
                  onClick={() =>
                    handleOpen(note.title, note.description, true, note.id)
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
          )}
        </div>
      )}
    </div>
  );
}

export default Notes;
