import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import NavHome from "../navbar/NavbarHome";
import { Container, Col, Row } from "react-bootstrap";
import logo from "../asset/group.png";
import { useNavigate } from "react-router-dom";
import NavUser from "../navbar/NavUser";
import { UserContext } from "../../Context/userContext";

export default function Home() {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);

  // const handleProduct = () => {
  //   navigate("/product");
  // };
  return (
    <div>
      {state.isLogin ? <NavUser /> : <NavHome />}
      <Container className="mt-5">
        <Row>
          <Col>
            <div className="text-header-product"></div>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <div className="text-center pt-5">
              <img
                // onClick={handleProduct}
                src={logo}
                className="img-fluid"
                style={{ width: "80%" }}
                alt="empty"
              />
            </div>
          </Col>
          <Col>
            <div className="text-center pt-5">
              <div
                className="mt-3"
                style={{ color: "rgba(205, 205, 205, 0.7)" }}
              >
                <h1 className="">Welcome to</h1> <h1>Lauw Corporation</h1>{" "}
                <h1>Technology and Inovation</h1>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
