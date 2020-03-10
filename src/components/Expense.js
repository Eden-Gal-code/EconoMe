import React from "react";

class Expense extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <tr>
        <td>{this.props.caption}</td>
        <td>{this.props.amount}</td>
        <td>{this.props.field}</td>
        <td>{this.props.date}</td>
        <td>{this.props.location}</td>
      </tr>
    );
  }
}

export default Expense;
