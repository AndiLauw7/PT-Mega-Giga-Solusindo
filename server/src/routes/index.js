const express = require("express");
const router = express.Router();

const { register, checkAuth, Login } = require("../controllers/auth");
const {
  addCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/category");
const { addInvoice } = require("../controllers/invoice");
const {
  addProduct,
  getProducts,
  deleteProduct,
  editProduct,
  getProduct,
} = require("../controllers/products");
const {
  addUsers,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const {
  addVendor,
  getVendor,
  updateVendor,
  deletevendor,
  getVendors,
} = require("../controllers/vendor");
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadsfile");

router.post("/user", auth, addUsers);
router.get("/users", auth, getUsers);
router.get("/user/:id", auth, getUser);
router.patch("/user/:id", auth, uploadFile("image"), updateUser);
router.delete("/user/:id", auth, deleteUser);

router.post("/cat", addCategory);
router.get("/cats", getCategories);
router.get("/cat/:id", getCategory);
router.patch("/cat/:id", updateCategory);
router.delete("/cat/:id", deleteCategory);

router.post("/vendor", addVendor);
router.get("/vendors", getVendors);
router.get("/vendor/:id", getVendor);
router.patch("/vendor/:id", updateVendor);
router.delete("/vendor/:id", deletevendor);

router.post("/product", auth, uploadFile("image"), addProduct);
router.get("/get-products", auth, getProducts);
router.get("/get-product/:id", auth, getProduct);
router.delete("/delete-product/:id", auth, deleteProduct);
router.patch("/edit-product/:id", auth, uploadFile("image"), editProduct);

router.post("/invoice", auth, addInvoice);
router.post("/register", register);
router.post("/login", Login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;
