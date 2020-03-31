import React from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { hashCode } from "./Login";
import Lottie from "react-lottie";
import Loading from "../assets/loading.json";
import InputMask from "react-input-mask";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    workplace: "",
    birthday: "",
    validP: true,
    validE: true,
    isSubmit: false
  };

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  async handleSubmit() {
    const dataS = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: hashCode(this.state.password),
      workplace: this.state.workplace,
      birthday: this.state.birthday
    };
    this.updateInput("isSubmit", true);
    console.log(dataS);
    await axios
      .post("https://econo-me-serv.herokuapp.com/users/add", dataS)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
      });

    this.props.history.push("/Logged/Profile");
  }
  async passwordAuth(e) {
    await this.updateInput("password", e.target.value);
    if (this.state.password.length > 7) {
      this.updateInput("validP", false);
    } else {
      this.updateInput("validP", true);
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
        <br />
        <Form>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={e => {
                  this.updateInput("email", e.target.value);
                  var validator = require("email-validator");

                  this.updateInput(
                    "validE",
                    !validator.validate(e.target.value)
                  );
                }}
                autoComplete="Nope"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.passwordAuth(e);
                }}
              />
              <Form.Text className="text-muted">
                Must Contain 8 Characters
              </Form.Text>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridAddress1">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                placeholder="John"
                onChange={e => {
                  this.updateInput("firstName", e.target.value);
                }}
                autoComplete="Nope"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                placeholder="Doe"
                onChange={e => {
                  this.updateInput("lastName", e.target.value);
                }}
                autoComplete="Nope"
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridCity">
            <Form.Label>Work</Form.Label>
            <Form.Control
              onChange={e => {
                this.updateInput("workplace", e.target.value);
              }}
              autoComplete="Nope"
            />
          </Form.Group>
          <Form.Row>
            <Form.Group>
              <Form.Label>Birthdate</Form.Label>

              <InputMask
                className="form-control"
                mask="99/99/9999"
                placeholder="__/__/____"
                onChange={e => {
                  console.log(this.state.birthday);
                  this.updateInput("birthday", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Button
              variant="primary"
              type="button"
              onClick={() => this.handleSubmit()}
              disabled={this.state.validP || this.state.validE}
            >
              Submit
            </Button>
          </Form.Row>
        </Form>
        {this.state.isSubmit && (
          <Lottie options={defaultOptions} height={155} width={300} />
        )}
      </Container>
    );
  }
}

export default withRouter(Register);
