import React from "react";
import { Button, Modal, Form, Col, Row } from "react-bootstrap";
import axios from "axios";
import edit from "../assets/edit.png";
class EditMonthly extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      monthly: [],
      modalShow: false
    };
    if (this.state.usr !== null) {
      this.state.monthly = this.state.usr.monthly;
    } else {
      this.state.monthly = [
        {
          month: "Jan",
          Mbalance: 0
        },
        {
          month: "Feb",
          Mbalance: 0
        },
        {
          month: "Mar",
          Mbalance: 0
        },
        {
          month: "Apr",
          Mbalance: 0
        },
        {
          month: "May",
          Mbalance: 0
        },
        {
          month: "Jun",
          Mbalance: 0
        },
        {
          month: "Jul",
          Mbalance: 0
        },
        {
          month: "Aug",
          Mbalance: 0
        },
        {
          month: "Sep",
          Mbalance: 0
        },
        {
          month: "Oct",
          Mbalance: 0
        },
        {
          month: "Nov",
          Mbalance: 0
        },
        {
          month: "Dec",
          Mbalance: 0
        }
      ];
    }
  }
  setModalShow(flag) {
    this.setState({
      modalShow: flag
    });
  }
  async handleUpdate() {
    const data = {
      monthly: this.state.monthly
    };
    axios
      .post(
        `https://econo-me-serv.herokuapp.com/users/editMonth/${this.props.Uid}`,
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
              {this.state.monthly.map(month => {
                return (
                  <Form.Group as={Row}>
                    <Form.Label column sm={2}>
                      {month.month}
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        type="text"
                        placeholder={month.Mbalance}
                        onChange={e => {
                          month.Mbalance = e.target.value;
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
