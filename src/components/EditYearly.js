import React from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
class EditMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      yearly: [
        {
          year: 2017,
          Ybalance: 0
        },
        {
          year: 2018,
          Ybalance: 0
        },
        {
          year: 2019,
          Ybalance: 0
        }
      ],
      modalShow: false
    };
    if (this.state.usr !== null) {
      this.state.yearly = this.state.usr.yearly;
    }
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
      .post(
        `https://econo-me-serv.herokuapp.com/users/editYear/${this.this.props.Uid}`,
        data
      )
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        if (this.props.loc === "Profile") {
          window.location.reload();
        }
      });
  }
  render() {
    return (
      <React.Fragment>
        <img
          src={edit}
          alt=""
          height={20}
          width={20}
          onClick={() => this.setModalShow(true)}
        ></img>

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
