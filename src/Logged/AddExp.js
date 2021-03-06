import React from "react";
import { Form, Col, Button, Row, Container, Toast } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import Lottie from "react-lottie";
import animationData from "../assets/Submit.json";
import axios from "axios";
class AddExp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      amount: "",
      field: "",
      usr: JSON.parse(sessionStorage.getItem("user")),
      open: false,
      date: new Date(),
      location: "",
      isSubmit: 0,
      isStopped: true,
      isAmInValid: false,
      toast: false
    };
  }

  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleSubmit() {
    const DataForServer = {
      caption: this.state.caption,
      amount: this.state.amount,
      date: this.state.date,
      location: this.state.location,
      field: this.state.field
    };
    this.updateInput("isStopped", false);
    console.log(DataForServer);

    axios
      .post(
        `https://econo-me-serv.herokuapp.com/users/addExp/${this.state.usr._id}`,
        DataForServer
      )
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        this.updateInput("toast", true);
      });
  }
  checkAm(amount) {
    for (let index = 0; index < this.state.amount.slice().length; index++) {
      if (
        this.state.amount.charAt(index) !== "0" &&
        this.state.amount.charAt(index) !== "1" &&
        this.state.amount.charAt(index) !== "2" &&
        this.state.amount.charAt(index) !== "3" &&
        this.state.amount.charAt(index) !== "4" &&
        this.state.amount.charAt(index) !== "5" &&
        this.state.amount.charAt(index) !== "6" &&
        this.state.amount.charAt(index) !== "7" &&
        this.state.amount.charAt(index) !== "8" &&
        this.state.amount.charAt(index) !== "9"
      ) {
        return true;
      }
    }
    return false;
  }
  render() {
    const defaultOptions = {
      loop: false,
      autoplay: false,
      animationData: animationData
    };

    return (
      <Container className="mt-3">
        <Form>
          <fieldset>
            <Form.Group as={Row}>
              <Form.Label as="legend" column sm={2}>
                Categories
              </Form.Label>
              <Col sm={10}>
                {this.state.usr.fields.map(field => {
                  return (
                    <Form.Check
                      type="radio"
                      label={field}
                      key={field}
                      name="formHorizontalRadios"
                      onChange={e => {
                        if (this.state.field === "") {
                          this.updateInput("isSubmit", this.state.isSubmit + 1);
                        }
                        this.updateInput("field", field);
                        this.updateInput("open", false);
                      }}
                    />
                  );
                })}
                <Form.Check
                  type="radio"
                  label="Custom"
                  name="formHorizontalRadios"
                  key="Custom"
                  onChange={e => {
                    this.updateInput("open", !this.state.open);
                  }}
                ></Form.Check>
              </Col>
            </Form.Group>
          </fieldset>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Custom Category
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Category"
                onChange={e => {
                  if (this.state.field === "") {
                    this.updateInput("isSubmit", this.state.isSubmit + 1);
                  }
                  this.updateInput("field", e.target.value);
                  this.updateInput("isAmInValid", this.checkAm());
                }}
                disabled={!this.state.open}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              What did you Buy?
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="What did you Buy?"
                onChange={e => {
                  if (this.state.caption === "") {
                    this.updateInput("isSubmit", this.state.isSubmit + 1);
                  }
                  this.updateInput("caption", e.target.value);
                  this.updateInput("isAmInValid", this.checkAm());
                }}
                required
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              How much did you spend?
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="Amount"
                value={this.state.amount.slice()}
                onChange={e => {
                  if (this.state.amount === "") {
                    this.updateInput("isSubmit", this.state.isSubmit + 1);
                  }

                  this.updateInput("amount", e.target.value);

                  this.updateInput("isAmInValid", this.checkAm());
                }}
                required
                isInvalid={this.state.isAmInValid}
              />
              <Form.Control.Feedback type="invalid">
                {"Must Contain Numbers Only "}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              City
            </Form.Label>
            <Col sm={10}>
              <Form.Control
                type="text"
                placeholder="City"
                onChange={e => {
                  if (this.state.location === "") {
                    this.updateInput("isSubmit", this.state.isSubmit + 1);
                  }
                  this.updateInput("location", e.target.value);
                  this.updateInput("isAmInValid", this.checkAm());
                }}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col sm={10}>
              <DayPickerInput
                onDayChange={day => {
                  this.updateInput("isSubmit", this.state.isSubmit + 1);

                  this.updateInput("date", day);
                  this.updateInput("isAmInValid", this.checkAm());
                }}
                required
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                onClick={() => {
                  this.handleSubmit();
                }}
                disabled={!(this.state.isSubmit > 4)}
              >
                Add
              </Button>
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Lottie
                options={defaultOptions}
                height={155}
                width={300}
                isPaused={this.state.isStopped}
              />
            </Col>
          </Form.Group>
        </Form>
        <Toast
          show={this.state.toast}
          onClose={() => this.updateInput("toast", false)}
          style={{
            position: "absolute",
            top: 65,
            right: 0
          }}
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">EconoMe</strong>
          </Toast.Header>
          <Toast.Body>
            Your Expense was added go to{" "}
            <span
              style={{
                color: "blue"
              }}
              onClick={() => this.props.history.push("/Logged/Expenses")}
            >
              Expenses{" "}
            </span>
            or{"  "}
            <span
              style={{
                color: "blue"
              }}
              onClick={() => window.location.reload()}
            >
              Add another Expenses
            </span>
          </Toast.Body>
        </Toast>
      </Container>
    );
  }
}

export default AddExp;
