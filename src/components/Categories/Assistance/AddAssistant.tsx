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
  const handleClose = () => setOpen(false);
  const [isAddAssistant, setIsAddAssistant] = useState(false);
  const [isCancelRequest, setIsCancelRequest] = useState(true);

  const assistants = [
    {
      name: "pragadhesh",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full">
      <div className="grid grid-cols-4 pl-10 pr-10">
        <div className="grid grid-flow-col gap-1 justify-center p-3 items-center col-span-3">
          <TextField
            id="search"
            label="Username"
            type="search"
            variant="outlined"
            size="small"
            className="flex w-80"
          />
          <Button variant="outlined" color="primary" className="flex pl-5">
            Search
          </Button>
        </div>
        <div className="flex  pt-5 justify-end items-center">
          <Link to={"/btrack/assist/"}>
            <Button variant="outlined">Back</Button>
          </Link>
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
          {assistants.length == 0 && (
            <div className="flex w-full h-full text-4xl text-sky-500 font-dancingscript justify-center items-center">
              No Assistants found
            </div>
          )}
          {assistants.length != 0 && (
            <div className="flex flex-col w-full h-full pl-10 pr-10">
              <div className="flex justify-start font-playfair text-xl font-bold text-sky-700 pt-10">
                Users
              </div>
              <div className="grid grid-flow-row pt-10 pl-10 gap-5">
                <Card className="flex w-3/5 h-24 self-center">
                  <div className="grid grid-cols-2 w-full h-full">
                    <div className="flex items-center w-full h-full font-dancingscript p-5 text-3xl text-sky-400">
                      Pragadhesh
                    </div>
                    <div className="flex w-full h-full justify-end items-center p-5">
                      <Button
                        variant="outlined"
                        color="error"
                        className=" h-10"
                      >
                        Cancel Request
                      </Button>
                    </div>
                  </div>
                </Card>
                <Card className="flex w-3/5 h-24 self-center">
                  <div className="grid grid-cols-2 w-full h-full">
                    <div className="flex items-center w-full h-full font-dancingscript p-5 text-3xl text-sky-400">
                      Praga
                    </div>
                    <div className="flex w-full h-full justify-end items-center p-5">
                      <Button
                        variant="outlined"
                        color="primary"
                        className=" h-10"
                      >
                        Add Assistant
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default AddAssistant;
