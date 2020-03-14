import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import logo from "../assets/Logo.png";
const LNav = () => {
  const Hour = new Date().getHours();
  let text = "initial";
  function TXT() {
    if (parseInt(Hour) < 12 && parseInt(Hour) > 6) {
      text = "Good Morning ";
    } else if (parseInt(Hour) > 12 && parseInt(Hour) < 17) {
      text = "Good Afternoon ";
    } else {
      text = "Good Evening ";
    }
  }
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
          <Navbar.Text>
            {TXT()}
            {"" + text}
          </Navbar.Text>
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
