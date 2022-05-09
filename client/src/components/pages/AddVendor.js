import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Form, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import { API } from "../../Config/api";
import { useNavigate } from "react-router-dom";

function AddVendor() {
  let navigate = useNavigate();
  const [vendor, setVendors] = useState("");

  const handleChange = (e) => {
    setVendors(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const body = JSON.stringify({ name: vendor });

      // Insert category data
      const response = await API.post("/vendor", body, config);

      navigate("/vendor");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <NavUser />
      <Container className="mt-5">
        <h1>Add kategory</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label className="text-white">Name Products</Form.Label>
            <Form.Control
              onChange={handleChange}
              type="text"
              name="vendor"
              value={vendor}
              placeholder="name product"
            />
          </Form.Group>

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

export default AddVendor;
