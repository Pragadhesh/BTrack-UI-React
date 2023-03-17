import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../Shared.css";
import Routine from "./Routine";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../../../constants/backendurl";
import ProductList from "../../../interfaces/AddProducts";

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
  const [products, setProducts] = useState<ProductList>([]);

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const [module, setModule] = useState(location.state.module);
  const [category, setCategory] = useState(location.state.category);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setAddSuccess(false);
    setOpen(false);
  };

  const [addsuccess, setAddSuccess] = useState(false);
  const [upisLoading, setUpIsLoading] = useState(false);
  const [upname, setUpname] = useState("");
  const [updescription, setUpdescription] = useState("");
  const [upbgimage, setUpbgimage] = useState("");
  const [uphealth, setuphealth] = useState();
  const [upcategory, setUpCategory] = useState("");
  const [updays, setUpDays] = useState();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}addproduct/${module}/${category}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("idToken")}`,
            },
          }
        );
        setProducts(response.data);
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

  function openModalforUpdate(name: any, description: any, bgimage: any) {
    setUpname(name);
    setUpdescription(description);
    setUpbgimage(bgimage);
    handleOpen();
  }

  const setUpdatedCategories = (category: any, health: any, days: any) => {
    setUpCategory(category);
    setuphealth(health);
    setUpDays(days);
  };

  const addproduct = async () => {
    setUpIsLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}product`,
        {
          module: module,
          category: category,
          name: upname,
          description: updescription,
          image_url: upbgimage,
          usage: upcategory,
          days: updays,
          health: uphealth,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("idToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setAddSuccess(true);
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
        addproduct();
      }
    }
    setUpIsLoading(false);
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
          <div className="flex w-full pt-5 justify-between">
            <div className="flex font-playfair text-xl font-bold text-sky-700">
              Add Products
            </div>
            <Link to={"/btrack/" + module}>
              <Button variant="outlined">Back</Button>
            </Link>
          </div>
          <Modal open={open} onClose={handleClose}>
            <Box sx={modalstyle}>
              {!addsuccess && (
                <>
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
                          category={"daily"}
                          health={100}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-flow-col gap-2 justify-end">
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button variant="contained" onClick={addproduct}>
                      Save
                    </Button>
                    {upisLoading && (
                      <Box sx={{ display: "flex" }}>
                        <CircularProgress />
                      </Box>
                    )}
                  </div>
                </>
              )}
              {addsuccess && (
                <div className="flex flex-col w-full h-full">
                  <div className="flex w-full h-full items-center text-4xl text-sky-500 font-dancingscript justify-center">
                    Item Added Successfully
                  </div>
                  <div className="grid grid-flow-col gap-2 justify-end">
                    <Button variant="outlined" onClick={handleClose}>
                      Close
                    </Button>
                  </div>
                </div>
              )}
            </Box>
          </Modal>
          <div className="flex flex-col w-full h-full">
            <div className="flex w-full justify-start items-center font-dancingscript text-4xl font-bold text-sky-500">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </div>
            <div className="grid w-full h-full grid-flow-row grid-cols-3 pt-5 gap-3 gap-y-7">
              {products.map((product, index) => (
                <div className="flex flex-col w-52" key={index}>
                  <div
                    className="flex justify-end bg-red-500 w-full h-72 rounded product"
                    style={{
                      backgroundImage: `url("${product.image_url}")`,
                    }}
                  ></div>
                  <div
                    className="flex justify-start font-optimaroman font-normal text-lg pt-2 h-10"
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                    title={product.name}
                  >
                    {product.name}
                  </div>
                  <div className="flex justify-start font-optimaroman font-light text-sm h-12 items-center pt-2 text-zinc-400">
                    <div
                      className="text-overflow-ellipsis"
                      title={product.description}
                    >
                      {product.description}
                    </div>
                  </div>
                  <div className="flex w-full pt-2">
                    <Button
                      variant="outlined"
                      className="w-full"
                      onClick={() =>
                        openModalforUpdate(
                          product.name,
                          product.description,
                          product.image_url
                        )
                      }
                    >
                      Add Item
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProduct;
