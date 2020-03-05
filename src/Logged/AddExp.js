import React from "react";
import { Form, Col, Button, Row, Container } from "react-bootstrap";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
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
      location: ""
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
    console.log(DataForServer);
  }
  render() {
    return (
      <Container className="mt-1">
        <br />
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
                  this.updateInput("field", e.target.value);
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
                placeholder="Caption"
                onChange={e => this.updateInput("caption", e.target.value)}
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
                placeholder="Amount"
                onChange={e => this.updateInput("amount", e.target.value)}
              />
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
                  this.updateInput("location", e.target.value);
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Date
            </Form.Label>
            <Col sm={10}>
              <DayPickerInput
                onDayChange={day => this.updateInput("date", day)}
              />
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
    );
  }
}

export default AddExp;
