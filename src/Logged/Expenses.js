import React from "react";
import { Col, Row } from "react-bootstrap";
import ListByField from "../components/ListByField";
import Container from "react-bootstrap/Container";

import { withRouter } from "react-router-dom";
class Expenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usr: JSON.parse(sessionStorage.getItem("user")),
      lists: [],
      isLogged: true
    };
    if (sessionStorage.getItem("user") === null) {
      this.props.history.push("/views/Login");
      this.state.isLogged = false;
    } else {
      this.state.usr.fields.map(field => {
        this.state.lists.push(this.SearchField(field));
      });
    }
  }
  SearchField(field) {
    let obj = { field: field, exps: [] };
    this.state.usr.expenses.map(exp => {
      if (exp.field === field) {
        obj.exps.push(exp);
      }
    });
    return obj;
  }
  render() {
    if (this.state.isLogged) {
      return (
        <Container>
          <h2>
            {this.state.usr.firstName} {this.state.usr.lastName}
          </h2>
          <h4> Your Spend-Limit {this.state.usr.spendlimit}₪</h4>
          <React.Fragment>
            <Row>
              {this.state.lists.map(list => {
                return (
                  <Col>
                    <ListByField
                      field={list.field}
                      list={list.exps}
                    ></ListByField>
                  </Col>
                );
              })}
            </Row>
          </React.Fragment>
        </Container>
      );
    } else {
      return <div></div>;
    }
  }
}

export default withRouter(Expenses);
