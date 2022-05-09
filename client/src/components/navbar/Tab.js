import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Navbar,
  Container,
  Nav,
  Button,
  Stack,
  Col,
  Row,
  Tab,
  Card,
} from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import logo from "../asset/user.png";
import { UserContext } from "../../Context/userContext";
import { API } from "../../Config/api";

export default function Tabs() {
  // let navigate = useNavigate();
  const navigate = useNavigate();

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Row>
                <Col>
                  <div>
                    <Card
                      className="shadow-lg p-3 mb-5 bg-white rounded"
                      border="light"
                      //   bg="secondary"
                      style={{ width: "18rem" }}
                    >
                      <Card.Header>
                        {" "}
                        <h3>
                          Menu Bar{" "}
                          <GiHamburgerMenu
                            className="text-danger"
                            style={{ marginLeft: "50px" }}
                          />
                        </h3>{" "}
                      </Card.Header>
                      <div className="shadow-lg p-3 mb-5 bg-white rounded">
                        <Card.Body>
                          <div className="btn-group-vertical">
                            <Button
                              onClick={() => navigate("/product")}
                              // onClick={handleProduct}
                              className="btn-red bg-red px-5 mb-2 mt-2 "
                              variant="outline-danger"
                            >
                              Product
                            </Button>
                            <Button
                              onClick={() => navigate("/kategory")}
                              className="btn-red bg-red px-5"
                              variant="outline-danger"
                            >
                              Kategory
                            </Button>
                            <Button
                              onClick={() => navigate("/vendor")}
                              className="btn-red bg-red px-5 mb-2 mt-2 "
                              variant="outline-danger"
                            >
                              Vendor
                            </Button>
                            <Button
                              onClick={() => navigate("/invoice")}
                              className="btn-red bg-red px-5 mb-2"
                              variant="outline-danger"
                            >
                              Invoice
                            </Button>
                          </div>
                          {/* <Card.Text>
                            Some quick example text to build on the card title
                            and make up the bulk of the card's content.
                          </Card.Text> */}
                        </Card.Body>
                      </div>
                    </Card>
                  </div>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
