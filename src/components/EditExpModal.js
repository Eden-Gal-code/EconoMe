import React from "react";
import { Modal, Form, Col, Button, Row, Container } from "react-bootstrap";
import axios from "axios";
import DayPickerInput from "react-day-picker/DayPickerInput";
class EditExpModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: props.caption,
      amount: props.amount,
      field: props.field,
      usr: JSON.parse(sessionStorage.getItem("user")),
      open: false,
      date: props.date,
      location: props.location,
      isSubmit: 0,
      initialAmount: props.amount,
      isStopped: true,
      isAmInValid: false
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
      field: this.state.field,
      initialAmount: this.state.initialAmount
    };
    this.updateInput("isStopped", false);
    console.log(DataForServer);

    axios
      .post(
        `https://econo-me-serv.herokuapp.com/users/editExp/${this.state.usr._id}/${this.props.id}`,
        DataForServer
      )
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      });
  }
  checkAm(amount) {
    for (let index = 0; index < this.state.amount.length; index++) {
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
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Expense
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <fieldset>
                <Form.Group as={Row}>
                  <Form.Label as="legend" column sm={2}>
                    Field
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
                              this.updateInput(
                                "isSubmit",
                                this.state.isSubmit + 1
                              );
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
                  Custom Field
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder="Field"
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
                  Caption
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder={this.props.caption}
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
                  Amount
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    type="text"
                    placeholder={this.props.amount}
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
                    placeholder={this.props.location}
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
                <Col sm={{ span: 10, offset: 2 }}></Col>
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.handleSubmit();
              this.props.onHide();
            }}
          >
            Save
          </Button>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default EditExpModal;
