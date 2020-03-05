import React from "react";
import LoginIn from "../data/Login_Info.json";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

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
    LoginIn.map(UserInfo => {
      if (
        this.state.Email.slice() === UserInfo.email &&
        this.state.Password.slice() === UserInfo.password
      ) {
        this.state.isLogged = true;
        this.props.history.push("/Logged/Profile");
        sessionStorage.setItem("user", JSON.stringify(UserInfo));
      }
      return null;
    });
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
            type="submit"
            variant="primary"
            onClick={() => {
              this.checkLogin();
              if (this.state.isLogged) {
              }
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