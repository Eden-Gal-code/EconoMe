import React from "react";

import axios from "axios";
import { Form, Col, Button, Row, Container } from "react-bootstrap";

import EditMonthly from "../components/EditMonthly";
import EditYearly from "../components/EditYearly";

class VerifyEmail extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    console.log(id);
    this.state = {
      userID: id,

      balance: 0,
      income: 0,
      spendlimit: 0
    };
  }
  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }

  async handleSubmit() {
    const dataS = {
      balance: this.state.balance,
      income: this.state.income,
      spendlimit: this.state.spendlimit,
      verified: true
    };
    await axios
      .post(
        `https://econo-me-serv.herokuapp.com/users/verify/${this.state.userID}`,
        dataS
      )
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
      });
    this.props.history.push("/Logged/Profile");
  }
  render() {
    return (
      <div>
        <Container>
          <h2>Your Account has been verified </h2>
          <h3> Let's set up everything before moving forward</h3>
          <Form>
            <Form.Group as={Row} controlId="formHorizontalEmail">
              <Form.Label column sm={2}>
                Balance
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Balance"
                  onChange={e => this.updateInput("balance", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail2">
              <Form.Label column sm={2}>
                Monthly Income
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Income"
                  onChange={e => this.updateInput("income", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} controlId="formHorizontalEmail3">
              <Form.Label column sm={2}>
                How much do you plan on spending a month?
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="number"
                  placeholder="Spend Limit"
                  onChange={e => this.updateInput("spendlimit", e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm={2}>
                Your Yearly Balances
              </Form.Label>
              <Col sm={10}>
                <EditYearly />
              </Col>
            </Form.Group>
            <Form.Group>
              <Form.Label column sm={2}>
                Your Monthly Balances
              </Form.Label>
              <Col sm={10}>
                <EditMonthly />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 10, offset: 2 }}>
                <Button
                  onClick={() => {
                    this.handleSubmit();
                  }}
                >
                  Add
                </Button>
              </Col>
            </Form.Group>
          </Form>
        </Container>
      </div>
    );
  }
}

export default VerifyEmail;
