import React from "react";
import axios from "axios";
import EditExoModal from "./EditExpModal";
import rubbish from "../assets/rubbish.png";
import edit from "../assets/edit.png";
class Expense extends React.Component {
  state = {
    modalShow: false
  };
  async ClickDelete() {
    await axios
      .delete(
        `https://econo-me-serv.herokuapp.com/users/${this.props.usrId}/${this.props.expId}`
      )
      .then(res => {
        console.log(res.data);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        window.location.reload();
      });
  }
  setModalShow(flag) {
    this.setState({
      modalShow: flag
    });
  }
  render() {
    var moment = require("moment");

    return (
      <React.Fragment>
        <tr>
          <td>{this.props.caption}</td>
          <td>{this.props.amount}₪</td>
          <td>{this.props.field}</td>
          <td>
            {moment(this.state.date)
              .toDate()
              .getUTCDate() +
              "/" +
              moment(this.state.date)
                .toDate()
                .getUTCMonth() +
              "/" +
              moment(this.state.date)
                .toDate()
                .getUTCFullYear()}
          </td>
          <td>{this.props.location}</td>
          <td>
            <img
              src={edit}
              onClick={() => this.setModalShow(true)}
              alt="e"
              height={20}
              width={20}
            />
            |
            <img
              src={rubbish}
              onClick={() => {
                this.ClickDelete();
              }}
              alt="s"
              height={20}
              width={20}
            />
          </td>
        </tr>
        <EditExoModal
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          id={this.props.expId}
          caption={this.props.caption}
          amount={this.props.amount}
          date={this.props.date}
          location={this.props.location}
          field={this.props.field}
        />
      </React.Fragment>
    );
  }
}

export default Expense;
