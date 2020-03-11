import React from "react";
import { Table } from "react-bootstrap";

import Container from "react-bootstrap/Container";
import { withRouter } from "react-router-dom";
import Expense from "../components/Expense";

class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),

      isLogged: true
    };
    if (sessionStorage.getItem("user") === null) {
      this.props.history.push("/views/Login");
      this.state.isLogged = false;
    }
  }
  SearchField(field) {
    let obj = { field: field, exps: [] };
    this.state.usr.expenses.map(exp => {
      if (exp.field === field) {
        obj.exps.push(exp);
      }
      return null;
    });
    return obj;
  }
  render() {
    if (this.state.isLogged) {
      return (
        <Container>
          <br />
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Caption</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {this.state.usr.expenses.map(exp => {
                return (
                  <Expense
                    expId={exp._id}
                    usrId={this.state.usr._id}
                    caption={exp.caption}
                    amount={exp.amount}
                    date={exp.date}
                    field={exp.field}
                    location={exp.location}
                  />
                );
              })}
            </tbody>
          </Table>
        </Container>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(Expenses);
