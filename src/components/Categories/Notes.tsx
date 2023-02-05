import {
  Box,
  Button,
  CircularProgress,
  Input,
  InputBase,
  Modal,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import { useState } from "react";
import "./Shared.css";

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

function Notes() {
  const notes = [
    {
      name: "pragadhesh",
    },
  ];
  const [isLoading, setIsLoading] = useState(false);

  const [notestitle, setNotesTitle] = useState("");
  const [notesdesscription, setNotesDescription] = useState("");
  const [notesIsLoading, setNotesIsLoading] = useState(false);
  const [update, setIsUpdate] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = (title: any, description: any, update: any) => {
    setNotesTitle(title);
    setNotesDescription(description);
    setIsUpdate(update);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
    <div className="flex w-full h-full">
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalstyle}>
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full">
              <input
                placeholder="Title"
                className="flex w-full font-semibold font-sans outline-none overflow-hidden truncate"
                value={notestitle}
              />
            </div>
            <div className="flex w-full h-full items-start pt-5">
              <textarea
                aria-label="empty textarea"
                placeholder="Take a note..."
                className="flex w-full h-80 font-sans font-sm outline-none "
                value={notesdesscription}
              />
            </div>
            <div className="grid grid-flow-col gap-2 justify-end">
              <Button variant="outlined" onClick={handleClose}>
                Cancel
              </Button>
              {!update && <Button variant="contained">Add</Button>}
              {update && <Button variant="contained">Update</Button>}
              {notesIsLoading && (
                <Box sx={{ display: "flex" }}>
                  <CircularProgress />
                </Box>
              )}
            </div>
          </div>
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
          <div className="flex justify-end pt-5 ">
            <Button
              variant="outlined"
              onClick={() => handleOpen("", "", false)}
            >
              Add Note
            </Button>
          </div>
          {notes.length == 0 && (
            <div className="flex w-full h-full pt-20 text-4xl text-sky-500 font-dancingscript justify-center">
              No Notes found
            </div>
          )}
          {notes.length != 0 && (
            <div className="grid w-full grid-flow-row grid-cols-4 pt-5 gap-4 gap-y-7">
              <div
                className="flex flex-col w-64 min-h-auto max-h-96 rounded notes"
                onClick={() =>
                  handleOpen(
                    "This is the title introduced by semoin prandndm didkdkd jejekeieios",
                    "Television is one of the many wonders of modern science and \
                                technology.It was invented in England by the Scottish \
                                scientist J.N. Baird in 1928 and the British Broadcasting \
                                Corporation was the first to broadcast television images in \
                                1929. Previously the radio helped us hear things from far and \
                                near. spread information and knowledge from one corner of the \
                                globe to another. But all this was done through sound only. \
                                But television combined visual images with sound. Today we can \
                                watch games, shows, and song and dance programs from all \
                                corners of the world while sitting in our own homes. TV can be \
                                used for educating the masses, for bringing to us the latest \
                                pieces of information audio-visually and can provide us with \
                                all kinds of entertainment even in colour. But as in all \
                                things, too much televiewing may prove harmful. In many cases, \
                                the habit of watching TV has an adverse effect on the study \
                                habits of the young. When we read books, we have to use our \
                                intelligence and imagination. But in most cases, TV watching \
                                is a passive thing. It may dull our imagination and \
                                intelligence",
                    true
                  )
                }
              >
                <div className="flex w-full p-2">
                  <input
                    readOnly
                    placeholder="Title"
                    className="flex w-full font-semibold font-sans outline-none overflow-hidden truncate"
                    value="This is the title introduced by udhayanidhi stalind This is the title introduced by udhayanidhi stalind"
                  />
                </div>
                <div className="flex w-full p-2 font-sans text-sm text-overflow-ellipsis overflow-hidden white-space-nowrap min-h-auto max-h-96">
                  Television is one of the many wonders of modern science and
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Notes;
