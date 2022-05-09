import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalLogin from "../modal/ModalLogin";
import ModalRegister from "../modal/ModalRegister";
import { Navbar, Container, Nav, Button, Stack } from "react-bootstrap";
import logo from "../asset/header.png";

export default function NavHome() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalRegister, setModalRegister] = useState(false);
  const handleModalLogin = () => setModalLogin(true);
  const handleModalRegister = () => setModalRegister(true);

  const handleSwitchRegister = () => {
    setModalRegister(true);
    return setModalLogin(false);
  };
  const handleSwitchLogin = () => {
    setModalLogin(true);
    return setModalRegister(false);
  };

  return (
    <Container fluid className="bg-dark">
      <Navbar bg="dark" expand="lg">
        <Container fluid className="mt-2 mb-2">
          <Navbar.Brand href="#">
            {" "}
            <img style={{ height: "50px", width: "150px" }} src={logo} alt="" />
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
                onClick={handleModalLogin}
                className="btn-red px-5 outline-red text-secondary"
                variant="outline-light"
              >
                Login
              </Button>

              <Button
                onClick={handleModalRegister}
                className="btn-red bg-red px-5"
                variant="outline-danger"
              >
                Register
              </Button>
            </Stack>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {modalLogin && (
        <ModalLogin
          show={modalLogin}
          onHide={() => setModalLogin(false)}
          handleSwitchRegister={handleSwitchRegister}
        />
      )}
      {modalRegister && (
        <ModalRegister
          show={modalRegister}
          onHide={() => setModalRegister(false)}
          handleSwitchLogin={handleSwitchLogin}
        />
      )}
    </Container>
  );
}
