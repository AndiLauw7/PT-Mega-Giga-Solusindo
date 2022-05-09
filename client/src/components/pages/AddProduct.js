import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";
import { useNavigate } from "react-router-dom";
function AddProduct() {
  let navigate = useNavigate();
  const [categories, setCategories] = useState([]); //Store all category data
  const [idcat, setCategoryId] = useState([]); //Save the selected category id
  const [vendors, setVendors] = useState([]);
  const [idvendors, setVendorId] = useState([]);
  const [preview, setPreview] = useState(null); //For image preview
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    qty: "",
  });

  const getCategories = async () => {
    try {
      const response = await API.get("/cats");
      setCategories(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeCategoryId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setCategoryId([...idcat, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newCategoryId = idcat.filter((categoryIdItem) => {
        return categoryIdItem != id;
      });
      setCategoryId(newCategoryId);
    }
  };

  const getVendor = async () => {
    try {
      const response = await API.get("/vendors");
      setVendors(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeVendorId = (e) => {
    const id = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Save category id if checked
      setVendorId([...idvendors, parseInt(id)]);
    } else {
      // Delete category id from variable if unchecked
      let newVendorId = idvendors.filter((vendorIdItem) => {
        return vendorIdItem != id;
      });
      setVendorId(newVendorId);
    }
  };

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
      formData.set("name", form.name);
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("price", form.price);
      formData.set("qty", form.qty);
      formData.set("idcat", idcat);
      formData.set("idvendor", idvendors);

      console.log(form);

      // Insert product data
      const response = await API.post("/product", formData, config);
      console.log(response);

      navigate("/product");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
    getVendor();
  }, []);

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
            {categories.map((item, index) => (
              <label key={index} className="checkbox-inline text-white me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="idcat"
                  value={item.id}
                  onClick={handleChangeCategoryId}
                />{" "}
                {item.name}
              </label>
            ))}
          </div>
          <div className="card-form-input mt-4 px-2 py-1 pb-2">
            <div className="text-white mb-1" style={{ fontSize: "15px" }}>
              Vendor
            </div>
            {vendors.map((item, index) => (
              <label key={index} className="checkbox-inline text-white  me-4">
                <input
                  className="text-white"
                  type="checkbox"
                  name="idvendor"
                  value={item.id}
                  onClick={handleChangeVendorId}
                />{" "}
                {item.name}
              </label>
            ))}
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

export default AddProduct;
