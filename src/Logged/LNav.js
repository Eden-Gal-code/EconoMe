import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import logo from "../assets/Logo.png";
const LNav = () => {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="/Logged/Profile">
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
          <Nav.Link href="/Logged/Profile">Profile</Nav.Link>
          <Nav.Link href="/Logged/Expenses">Expenses</Nav.Link>
          <Nav.Link href="/Logged/AddEx">Add Expense</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          <Nav.Link
            href="/"
            onClick={() => {
              sessionStorage.removeItem("user");
            }}
          >
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default withRouter(LNav);
