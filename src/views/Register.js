import React from "react";
import { Form, Col, Button, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
class Register extends React.Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    workplace: "",
    balance: "",
    income: "",
    spendlimit: ""
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
      password: this.state.password,
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

    this.props.history.push("/Logged/Profile");
  }
  render() {
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
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={e => {
                  this.updateInput("password", e.target.value);
                }}
              />
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
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridAddress2">
              <Form.Label>Last Name </Form.Label>
              <Form.Control
                placeholder="Doe"
                onChange={e => {
                  this.updateInput("lastName", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group controlId="formGridCity">
            <Form.Label>Work</Form.Label>
            <Form.Control
              onChange={e => {
                this.updateInput("workplace", e.target.value);
              }}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Balance</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("balance", e.target.value);
                }}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Income</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("income", e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridSprnd">
              <Form.Label>Spend Limit</Form.Label>
              <Form.Control
                onChange={e => {
                  this.updateInput("spendlimit", e.target.value);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Button
            variant="primary"
            type="button"
            onClick={() => this.handleSubmit()}
          >
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(Register);
