import React from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { hashCode } from "./Login";
import Lottie from "react-lottie";
import animationData from "../assets/loading.json";

class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    workplace: "",
    balance: "",
    income: "",
    spendlimit: "",
    valid: true,
    isSubmit: true
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
      balance: this.state.balance,
      income: this.state.income,
      spendlimit: this.state.spendlimit
    };
    console.log(dataS);
    await axios
      .post("https://econo-me-serv.herokuapp.com/users/add", dataS)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
      });
    this.updateInput("isSubmit", false);
    this.props.history.push("/Logged/Profile");
  }
  async passwordAuth(e) {
    await this.updateInput("password", e.target.value);
    if (this.state.password.length > 7) {
      this.updateInput("valid", false);
    } else {
      this.updateInput("valid", true);
    }
  }
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: animationData
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
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("balance", e.target.value);
                }}
                autoComplete="Nope"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Income</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("income", e.target.value);
                }}
                autoComplete="Nope"
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridSprnd">
              <Form.Label>Spend Limit</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("spendlimit", e.target.value);
                }}
                autoComplete="Nope"
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            type="button"
            onClick={() => this.handleSubmit()}
            disabled={this.state.valid}
          >
            Submit
          </Button>
        </Form>
        <Lottie
          options={defaultOptions}
          height={155}
          width={300}
          isPaused={this.state.isSubmit}
        />
      </Container>
    );
  }
}

export default withRouter(Register);
