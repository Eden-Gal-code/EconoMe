import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
const LNav = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/Logged/Profile">
        <img
          alt=""
          src="/logo.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
        />{" "}
        EconoMe
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
