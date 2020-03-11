import React from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
class EditMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      yearly: [],
      modalShow: false
    };
    this.state.yearly = this.state.usr.yearly;
  }
  setModalShow(flag) {
    this.setState({
      modalShow: flag
    });
  }
  async handleUpdate() {
    const data = {
      yearly: this.state.yearly
    };
    axios
      .post(`http://localhost:5000/users/editYear/${this.state.usr._id}`, data)
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      });
  }
  render() {
    return (
      <React.Fragment>
        <Button onClick={() => this.setModalShow(true)}>
          Edit Monthly Balances
        </Button>

        <Modal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {this.state.yearly.map(year => {
                return (
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      {year.year}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder={year.Ybalance}
                        onChange={e => {
                          year.Ybalance = e.target.value;
                        }}
                        required
                      />
                    </Col>
                  </Form.Group>
                );
              })}
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                this.handleUpdate();
                this.setModalShow(false);
              }}
            >
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      </React.Fragment>
    );
  }
}

export default EditMonthly;