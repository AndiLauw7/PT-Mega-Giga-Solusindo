import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table, Nav, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../Config/api";

export default function Invoice() {
  const { id } = useParams([]);
  let navigate = useNavigate();
  const [product, setProduct] = useState();

  const getProduct = async (id) => {
    try {
      const response = await API.get("/get-invoice");
      console.log(response);
      // Store product data to useState variabel
      setProduct(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // getCategories();
    // getVendors();
    getProduct(id);
  }, []);

  const handleAdd = () => {
    navigate("/add-invoice");
  };
  return (
    <div>
      <NavUser />

      <Container fluid className="mt-5">
        <Row>
          <Col lg={4}>
            <div>
              <Tabs />
            </div>
          </Col>
          <Col>
            <h1 className="text-white">Invoice</h1>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-2 mt-2 "
              variant="danger"
            >
              Add
            </Button>
            {product ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Name Product</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {product.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>Otto</td>
                      <td>
                        <div className="d-grid gap-5 d-md-block ml-3">
                          <Button
                            className="btn-succes bg-succes px-2 "
                            variant="outline-success"
                          >
                            Edit
                          </Button>

                          <Button
                            className="btn-red bg-red px-2 "
                            variant="outline-danger"
                          >
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <div className="text-center pt-5">
                <img
                  src="{imgEmpty}"
                  className="img-fluid"
                  style={{ width: "40%" }}
                  alt="empty"
                />
                <div className="mt-3">No data product</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}
