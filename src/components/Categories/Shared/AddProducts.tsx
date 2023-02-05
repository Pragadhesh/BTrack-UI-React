import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../Shared.css";
import Routine from "./Routine";
import { useLocation } from "react-router-dom";

const modalstyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 500,
  bgcolor: "background.paper",
  border: "2px solid #0072e5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function AddProduct(props: any) {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [module, setModule] = useState(location.state.module);
  const [category, setCategory] = useState(location.state.category);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [upisLoading, setUpIsLoading] = useState(false);
  const [upname, setUpname] = useState("");
  const [updescription, setUpdescription] = useState("");
  const [upbgimage, setUpbgimage] = useState("");
  const [uphealth, setuphealth] = useState("");
  const [upcategory, setUpCategory] = useState("");
  const [updays, setUpDays] = useState("");

  function openModalforUpdate(
    name: any,
    description: any,
    bgimage: any,
    health: any,
    category: any
  ) {
    setUpname(name);
    setUpdescription(description);
    setUpbgimage(bgimage);
    setuphealth(health);
    setUpCategory(category);
    handleOpen();
  }

  const setUpdatedCategories = (category: any, health: any, days: any) => {
    setUpCategory(category);
    setuphealth(health);
    setUpDays(days);
  };

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
          <div className="flex w-full pt-5 justify-end">
            <Link to={"/btrack/" + module}>
              <Button variant="outlined">Back</Button>
            </Link>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalstyle}>
              <div className="flex flex-col w-full justify-between">
                <div className="grid grid-cols-2 w-full">
                  <div className="flex flex-col w-52">
                    <div
                      className="flex justify-end bg-red-500 w-full h-72 rounded product"
                      style={{
                        backgroundImage: `url(${upbgimage})`,
                      }}
                    >
                      <div className="relative top-0 right-0 pt-0 pr-2"></div>
                    </div>
                    <div className="flex justify-start font-optimaroman font-normal text-lg pt-2">
                      {upname}
                    </div>
                    <div className="flex justify-start font-optimaroman font-light text-sm pt-2 text-zinc-400">
                      {updescription}
                    </div>
                  </div>
                  <div className="flex flex-col w-full ">
                    <Routine
                      setUpdatedCategories={setUpdatedCategories}
                      category={upcategory}
                      health={uphealth}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-col gap-2 justify-end">
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained">Save</Button>
                {upisLoading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}
              </div>
            </Box>
          </Modal>
          <div className="flex flex-col w-full h-full">
            <div className="flex justify-start font-playfair text-3xl font-bold text-sky-700">
              Serum
            </div>
            <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
              <div className="flex flex-col w-52">
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
                <div className="flex w-full pt-2">
                  <Button
                    variant="outlined"
                    className="w-full"
                    onClick={() =>
                      openModalforUpdate(
                        "Advanced Night Repair",
                        "Synchronized Multi-Recovery Complex will cause this issue",
                        "https://www.esteelauder.in/media/export/cms/products/308x424/el_sku_PMG501_308x424_0.jpg",
                        100,
                        "daily"
                      )
                    }
                  >
                    Add Item
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
