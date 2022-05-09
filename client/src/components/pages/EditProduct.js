import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";

function EditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([]); //Store all category data
  const [idcat, setCategoryId] = useState([]); //Save the selected category id
  const [vendors, setVendors] = useState([]);
  const [idvendor, setVendorId] = useState([]);
  const [product, setProduct] = useState({});
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
    catname: "",
    venname: "",
  });

  const getProduct = async (id) => {
    try {
      const response = await API.get("/get-product/" + id);
      // Store product data to useState variabel
      setPreview(response.data.data.image);
      setForm({
        ...form,
        name: response.data.data.name,
        price: response.data.data.price,
        qty: response.data.data.qty,
        catname: response.data.data.cat.name,
        venname: response.data.data.vendor.name,
      });
      setProduct(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const getCategories = async () => {
  //   try {
  //     const response = await API.get("/cats");
  //     setCategories(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // const handleChangeCategoryId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked) {
  //     // Save category id if checked
  //     setCategoryId([...idcat, parseInt(id)]);
  //   } else {
  //     // Delete category id from variable if unchecked
  //     let newCategoryId = idcat.filter((categoryIdItem) => {
  //       return categoryIdItem != id;
  //     });
  //     setCategoryId(newCategoryId);
  //   }
  // };
  // const getVendors = async () => {
  //   try {
  //     const response = await API.get("/vendors");
  //     setVendors(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleVendorId = (e) => {
  //   const id = e.target.value;
  //   const checked = e.target.checked;

  //   if (checked) {
  //     // Save category id if checked
  //     setCategoryId([...idvendor, parseInt(id)]);
  //   } else {
  //     // Delete category id from variable if unchecked
  //     let newVendorId = idvendor.filter((categoryIdItem) => {
  //       return categoryIdItem != id;
  //     });
  //     setCategoryId(newVendorId);
  //   }
  // };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    // Create image url for preview
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPreview(url);
    }
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (form.image) {
        formData.set("image", form?.image[0], form?.image[0]?.name);
      }
      formData.set("name", form.name);
      formData.set("desc", form.desc);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      // formData.set("catname", form.catname);
      // formData.set("venname", form.venname);

      // Insert product data
      const response = await API.patch(
        "/edit-product/" + product.id,
        formData,
        config
      );
      // if (response.status === "success") {
      navigate("/product");
      // }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // getCategories();
    // getVendors();
    getProduct(id);
  }, []);

  // useEffect(() => {
  //   const newCategoryId = product?.categories?.map((item) => {
  //     return item.id;
  //   });

  //   setCategoryId(newCategoryId);
  // }, [product]);
  // useEffect(() => {
  //   const newVendorId = product?.vendors?.map((item) => {
  //     return item.id;
  //   });

  //   setCategoryId(newVendorId);
  // }, [product]);
  return (
    <div>
      <NavUser />
      <Container className="mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="name"
              placeholder="name product"
            />
          </Form.Group>
          {preview && (
            <div>
              <img
                src={preview}
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  objectFit: "cover",
                }}
                alt="preview"
              />
            </div>
          )}
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="text-white">Input Image Products</Form.Label>
            <Form.Control onChange={handleChange} type="file" name="image" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Price Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="price"
              placeholder="Price"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Quantity</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="qty"
              placeholder="Qty"
            />
          </Form.Group>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Category
            </div>

            {/* <label className="checkbox-inline text-white me-4">
              <input
                className="text-white"
                type="checkbox"
                name="catname"
                value={form.catname}
                // onClick={handleChangeCategoryId}
                onChange={handleChange}
              />{" "}
              {form.name}
            </label> */}
          </div>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Vendor
            </div>

            {/* <label className="checkbox-inline text-white  me-4">
              <input
                className="text-white"
                type="checkbox"
                name="venname"
                value={form.venname}
                // onClick={handleVendorId}
                onChange={handleChange}
              />{" "}
              {form.name}
            </label> */}
          </div>

          <div className="d-grid gap-2 mt-4">
            <Button type="submit" variant="success" size="md">
              Add
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default EditProduct;
