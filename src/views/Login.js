import React from "react";
// import LoginIn from "../data/Login_Info.json";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      work: "",
      Email: "",
      Password: ""
    };
    if (sessionStorage.getItem("user") !== null) {
      sessionStorage.removeItem("user");
    }
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }
  async checkLogin() {
    const LoginInfo = {
      email: this.state.Email.slice(),
      password: this.state.Password.slice()
    };
    await axios
      .post("https://econo-me-serv.herokuapp.com/users/login", LoginInfo)
      .then(res => {
        if (res.data !== "0") {
          sessionStorage.setItem("user", JSON.stringify(res.data));
        } else {
          alert("Email or Password incorect");
        }
      });
    if (sessionStorage.getItem("user") !== null) {
      this.props.history.push("/Logged/Profile");
    }
  }
  render() {
    return (
      <Container>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={e => this.updateInput("Email", e.target.value)}
              type="email"
              placeholder="Enter Email"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              onChange={e => this.updateInput("Password", e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            type="button"
            variant="primary"
            onClick={() => {
              this.checkLogin();
            }}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Login);
