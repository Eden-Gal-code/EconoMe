import React from "react";
// import LoginIn from "../data/Login_Info.json";
import { withRouter } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";
import axios from "axios";
import Lottie from "react-lottie";

import Loading from "../assets/loading.json";

export function hashCode(s) {
  var h = 0,
    l = s.length,
    i = 0;
  if (l > 0) while (i < l) h = ((h << 5) - h + s.charCodeAt(i++)) | 0;
  return h;
}
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      work: "",
      Email: "",
      Password: "",
      isSubmit: false
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
    this.updateInput("isSubmit", true);
    const LoginInfo = {
      email: this.state.Email.slice(),
      password: hashCode(this.state.Password)
    };
    await axios
      .post("https://econo-me-serv.herokuapp.com/users/login", LoginInfo)
      .then(res => {
        if (res.data !== "0") {
          sessionStorage.setItem("user", JSON.stringify(res.data));
        } else {
          this.updateInput("isSubmit", false);
          alert("Email or Password incorect");
        }
      });
    if (sessionStorage.getItem("user") !== null) {
      this.props.history.push("/Logged/Profile");
    }
  }
  render() {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: Loading,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
    return (
      <Container>
        <Form>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              onChange={e => {
                this.updateInput("Email", e.target.value);
              }}
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
        {this.state.isSubmit && (
          <Lottie options={defaultOptions} height={155} width={300} />
        )}
      </Container>
    );
  }
}

export default withRouter(Login);
