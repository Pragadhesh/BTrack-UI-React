import { Box, Button, Card, CircularProgress, Modal } from "@mui/material";
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

function Manage() {
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isDeleted, setIsDeleted] = useState(true);
  const assistants = [
    {
      name: "pragadhesh",
    },
  ];
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
                  Assistant deleted successfully
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
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-start font-playfair text-xl font-bold text-sky-700 pt-10">
                Assistants
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
                        Delete
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
          <div className="flex flex-col p-5"></div>
        </div>
      )}
    </div>
  );
}

export default Manage;
