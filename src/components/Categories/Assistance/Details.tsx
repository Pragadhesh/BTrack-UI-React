import { Box, Button, Card, CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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

  const [name, setName] = useState(location.state.username);
  const details = [
    {
      name: "pragadhesh",
    },
  ];
  const alerts = [
    {
      name: "demo",
    },
  ];
  const notes = [
    {
      name: "demo",
    },
  ];
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
          {details.length == 0 && (
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
                    Close
                  </Button>
                </div>
              </div>
            </Box>
          </Modal>
          {details.length != 0 && (
            <div className="flex flex-col w-full h-full">
              <div className="grid grid-cols-2">
                <div className="flex justify-start items-center font-playfair text-3xl font-bold text-sky-700 pt-10">
                  {name}
                </div>
                <div className="flex w-full pt-5 justify-end items-center">
                  <Link to={"/btrack/assist/"}>
                    <Button variant="outlined">Back</Button>
                  </Link>
                </div>
              </div>
              {notes.length != 0 && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex justify-start font-playfair text-xl font-bold text-sky-500 pt-10">
                    Shopping Notes
                  </div>
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
                        Television is one of the many wonders of modern science
                        and
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {alerts.length != 0 && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex justify-start font-playfair text-xl font-bold text-sky-500 pt-10">
                    Alerts
                  </div>
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
                        Synchronized Multi-Recovery Complex will cause this
                        issue
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
                        Synchronized Multi-Recovery Complex will cause this
                        issue
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
                        Synchronized Multi-Recovery Complex will cause this
                        issue
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
          )}
          <div className="flex flex-col p-5"></div>
        </div>
      )}
    </div>
  );
}

export default Details;
