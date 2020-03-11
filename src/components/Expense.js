import React from "react";
import axios from "axios";
import EditExoModal from "./EditExpModal";
class Expense extends React.Component {
  state = {
    modalShow: false
  };
  async ClickDelete() {
    await axios
      .delete(
        `http://localhost:5000/users/${this.props.usrId}/${this.props.expId}`
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
    return (
      <React.Fragment>
        <tr>
          <td>{this.props.caption}</td>
          <td>{this.props.amount}</td>
          <td>{this.props.field}</td>
          <td>{this.props.date}</td>
          <td>{this.props.location}</td>
          <td>
            <button onClick={() => this.setModalShow(true)}>Edit</button>|{" "}
            <button
              type="submit"
              onClick={() => {
                this.ClickDelete();
              }}
            >
              Delete
            </button>
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
