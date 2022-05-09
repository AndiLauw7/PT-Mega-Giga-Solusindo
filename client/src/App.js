import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { UserContext } from "./Context/userContext";
import Home from "./components/pages/Home";
import Invoice from "./components/pages/Invoice";
import Kategory from "./components/pages/Kategory";
import Product from "./components/pages/Product";
import Vendor from "./components/pages/Vendor";
import { API, setAuthToken } from "./Config/api";
import Tabs from "./components/navbar/Tab";
import AddProduct from "./components/pages/AddProduct";
import AddInvoice from "./components/pages/AddInvoice";
import AddKategory from "./components/pages/AddKategory";
import AddVendor from "./components/pages/AddVendor";
import EditProduct from "./components/pages/EditProduct";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
function App() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      return navigate("/");
    } else {
      return navigate("/product");
    }
  }, [state]);

  //always check auth
  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      console.log(response);
      if (response?.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
      // console.log(response);
      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/product" element={<Product />} />
      <Route exact path="/edit-product/:id" element={<EditProduct />} />
      <Route exact path="/add-product" element={<AddProduct />} />

      <Route exact path="/kategory" element={<Kategory />} />
      <Route exact path="/add-kategory" element={<AddKategory />} />

      <Route exact path="/vendor" element={<Vendor />} />
      <Route exact path="/add-vendor" element={<AddVendor />} />

      <Route exact path="/invoice" element={<Invoice />} />
      <Route exact path="/add-invoice" element={<AddInvoice />} />
    </Routes>
  );
}

export default App;
