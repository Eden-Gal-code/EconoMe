import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import logo from "../assets/Logo.png";
const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <img
          alt=""
          src={logo}
          width="130"
          height="35"
          className="d-inline-block align-top"
        />{" "}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/views/About">About</Nav.Link>
          <Nav.Link href="/views/Register">Register</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link href="/views/Login">Login</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default NavBar;
