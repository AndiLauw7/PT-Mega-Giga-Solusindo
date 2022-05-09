import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row, Table, Nav, Button } from "react-bootstrap";
import NavUser from "../navbar/NavUser";
import Tabs from "../navbar/Tab";
import { useNavigate } from "react-router-dom";
import { API } from "../../Config/api";

export default function Kategory() {
  let navigate = useNavigate();

  const [category, setCats] = useState([]);

  const getCategories = async () => {
    try {
      const response = await API.get("/cats");
      setCats(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleAdd = () => {
    navigate("/add-kategory");
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
            <h1 className="text-white">Kategory</h1>
            <Button
              onClick={handleAdd}
              className="btn-red bg-red px-5 mb-2 mt-2 "
              variant="danger"
            >
              Add
            </Button>

            {category.length !== 0 ? (
              <Table striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Product Name</th>
                    <td>Action</td>
                  </tr>
                </thead>

                <tbody>
                  {category.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>
                        <div className="d-grid gap-5 d-md-block ml-3">
                          <Button
                            // onClick={() => {
                            //   handleEdit(item.id);
                            // }}
                            className="btn-succes bg-succes px-2 "
                            variant="outline-success"
                          >
                            Edit
                          </Button>

                          <Button
                            // onClick={() => {
                            //   handleDelete(item.id);
                            // }}
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
