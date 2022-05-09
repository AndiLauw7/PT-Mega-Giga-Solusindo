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
} from "react-bootstrap";
import logo from "../asset/header.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { API } from "../../Config/api";
export default function NavUser() {
  const [state, dispatch] = useContext(UserContext);
  const [profile, setProfile] = useState([]);

  const id = state.user.id;

  const getProfile = async () => {
    const response = await API.get(`/user/${id}`);
    setProfile(response.data.data.user);
    console.log(response);
  };

  useEffect(() => {
    getProfile();
  }, []);
  let navigate = useNavigate();
  const handleLogOut = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };
  const handleDashboard = () => {
    navigate("/product");
  };
  return (
    <div>
      <Container fluid className="bg-dark">
        <Navbar bg="dark" expand="lg">
          <Container fluid className="mt-2 mb-2">
            <Navbar.Brand href="#">
              {" "}
              <img
                onClick={handleDashboard}
                style={{ height: "50px", width: "150px" }}
                src={logo}
                alt=""
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              ></Nav>
              <Stack direction="horizontal" gap={3}>
                <Button
                  onClick={handleLogOut}
                  className="btn-red bg-red px-5"
                  variant="outline-danger"
                >
                  Logut
                </Button>
              </Stack>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </div>
  );
}
