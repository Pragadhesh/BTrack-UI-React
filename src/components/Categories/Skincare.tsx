import { Box, Button, CircularProgress, Modal } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./Shared.css";
import { useEffect, useState } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import Routine from "./Shared/Routine";
import AddProduct from "./Shared/AddProducts";
import { BACKEND_URL } from "../../constants/backendurl";
import axios from "axios";
import { Products } from "../../interfaces/Products";

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

const categorystyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 400,
  bgcolor: "background.paper",
  border: "2px solid #0072e5",
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

function Skincare() {
  const [skincareitems, setSkinCareItems] = useState<Products>([]);

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const [addItemOpen, setAddItemOpen] = useState(false);
  const handleaddItemOpen = () => setAddItemOpen(true);
  const handleaddItemClose = () => setAddItemOpen(false);

  const [upisLoading, setUpIsLoading] = useState(false);
  const [upname, setUpname] = useState("");
  const [updescription, setUpdescription] = useState("");
  const [upbgimage, setUpbgimage] = useState("");
  const [uphealth, setuphealth] = useState("");
  const [upcategory, setUpCategory] = useState("");
  const [updays, setUpDays] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}product/skincare`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        });
        setSkinCareItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [skincareitems]);

  const update = () => {
    console.log("Item updated successfully");
  };

  const setUpdatedCategories = (category: any, health: any, days: any) => {
    setUpCategory(category);
    setuphealth(health);
    setUpDays(days);
  };

  function openModalforUpdate(
    name: any,
    description: any,
    bgimage: any,
    health: any,
    upcategory: any,
    updays: any
  ) {
    setUpname(name);
    setUpdescription(description);
    setUpbgimage(bgimage);
    setuphealth(health);
    setUpCategory(upcategory);
    setUpDays(updays);
    handleOpen();
  }

  function openAddItem(category: any) {
    const path = "/btrack/skincare/additem/" + category;
    console.log(path);
    navigate(path, {
      state: {
        module: "skincare",
        category: category,
      },
    });
  }

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
          <Modal open={addItemOpen} onClose={handleaddItemClose}>
            <Box sx={categorystyle}>
              <div className="flex flex-col w-full">
                <div className="grid grid-flow-row gap-3 w-full">
                  <div className="flex font-playfair text-3xl bold ">
                    Category
                  </div>
                  <div className="grid grid-flow-cols gap-3 ">
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("serum")}
                    >
                      Serum
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("eyecare")}
                    >
                      Eye Care
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("moisturizer")}
                    >
                      Moisturizer
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("lipcare")}
                    >
                      Lip Care
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("makeupremover")}
                    >
                      Cleanser & Makeup Remover
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("mask")}
                    >
                      Exfoliant/Mask
                    </button>
                    <button
                      className="flex justify-center pl-5 category"
                      onClick={() => openAddItem("toner")}
                    >
                      Toner & Treatment Lotion
                    </button>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>

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
                      days={updays}
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-flow-col gap-2 justify-end">
                <Button variant="outlined" color="error">
                  Delete Item
                </Button>
                <Button variant="contained" onClick={update}>
                  Save
                </Button>
                {upisLoading && (
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                )}
              </div>
            </Box>
          </Modal>

          <div className="flex justify-end pt-5 ">
            <Button variant="outlined" onClick={handleaddItemOpen}>
              Add Skincare Item
            </Button>
          </div>
          {skincareitems.length == 0 && (
            <div className="flex w-full h-full pt-20 text-4xl text-sky-500 font-dancingscript justify-center">
              No Items found
            </div>
          )}
          {skincareitems.length != 0 &&
            skincareitems.map((category) => {
              return (
                <div className="flex flex-col w-full pt-5">
                  <div className="flex justify-start font-playfair text-3xl font-bold text-sky-700">
                    {category.category.charAt(0).toUpperCase() +
                      category.category.slice(1)}
                  </div>
                  <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
                    {category.products.map((item) => {
                      return (
                        <div className="flex flex-col w-52">
                          <div
                            className="flex justify-end bg-red-500 w-full h-72 rounded product"
                            style={{
                              backgroundImage: `url(${item.image_url})`,
                            }}
                          >
                            <div className="relative top-0 right-0 pt-0 pr-2">
                              <button
                                onClick={() =>
                                  openModalforUpdate(
                                    item.name,
                                    item.description,
                                    item.image_url,
                                    item.health,
                                    item.usage,
                                    item.days
                                  )
                                }
                              >
                                <EditIcon color="primary" />
                              </button>
                            </div>
                          </div>
                          <div
                            className="flex justify-start font-optimaroman font-normal text-lg pt-2 h-10"
                            style={{
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                            title={item.name}
                          >
                            {item.name}
                          </div>
                          <div className="flex justify-start font-optimaroman font-light text-sm h-12 items-center pt-2 text-zinc-400">
                            <div
                              className="text-overflow-ellipsis"
                              title={item.description}
                            >
                              {item.description}
                            </div>
                          </div>
                          <div
                            className="relative w-full h-3 mt-2 rounded health"
                            title={`Health: ${item.health}%`}
                          >
                            <div
                              className={`absolute h-full left-0 top-0 rounded ${getHealthColor(
                                item.health
                              )}`}
                              style={{
                                width: `${item.health}%`,
                                animation: "fill-bar 2s ease-in-out",
                              }}
                            ></div>
                            <div className="absolute h-full right-0 top-0">
                              <span className="text-white text-center absolute w-full h-full top-0 left-0">
                                {100 - item.health}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default Skincare;
